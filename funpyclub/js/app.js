let pyodide = null;
let pyodideReady = false;
let currentLessonId = null;
let completedLessons = new Set();
let totalXP = 0;

const outputArea = document.getElementById('outputArea');
const codeEditor = document.getElementById('codeEditor');
const lessonNav = document.getElementById('lessonNav');
const contentPanel = document.getElementById('contentPanel');
const xpDisplay = document.getElementById('xpDisplay');
const progressFill = document.getElementById('progressFill');
const loadingOverlay = document.getElementById('pyodideLoading');
const floatingEditor = document.getElementById('floatingEditor');
const editorHeader = document.getElementById('editorHeader');
const minimizeBtn = document.getElementById('minimizeBtn');
const floatingToggleBtn = document.getElementById('floatingToggleBtn');

function loadProgress() {
  try {
    const saved = localStorage.getItem('FunPyClub_progress');
    if (saved) {
      const data = JSON.parse(saved);
      completedLessons = new Set(data.completed || []);
      totalXP = data.totalXP || 0;
    } else {
      completedLessons = new Set();
      totalXP = 0;
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
}

function saveProgress() {
  try {
    const data = {
      completed: Array.from(completedLessons),
      totalXP
    };
    localStorage.setItem('FunPyClub_progress', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

function updateStats() {
  xpDisplay.textContent = totalXP;
  const totalPossibleXP = CURRICULUM.reduce((sum, lesson) => sum + (lesson.xp || 0), 0);
  const progress = totalPossibleXP > 0 ? (totalXP / totalPossibleXP) * 100 : 0;
  progressFill.style.width = progress + '%';
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let emoji = 'ℹ️';
  if (type === 'success') emoji = '🎉';
  if (type === 'error') emoji = '❌';
  if (type === 'info') emoji = '⚡';
  
  toast.innerHTML = `<span>${emoji}</span><span>${message}</span>`;
  container.appendChild(toast);
  
  // Auto-remove after animation completes (3.5 seconds)
  setTimeout(() => {
    toast.remove();
  }, 3500);
}

async function initPyodide() {
  if (pyodideReady) return;
  try {
    pyodide = await loadPyodide();
    await pyodide.loadPackage('micropip');
    pyodideReady = true;
    loadingOverlay.classList.add('hidden');
    showToast('🪄 Mediul Python este pregătit!', 'success');
  } catch (e) {
    outputArea.textContent = 'Eroare la încărcarea Python: ' + e.message;
    outputArea.classList.add('error');
    showToast('Eroare la încărcarea Python!', 'error');
  }
}

function highlightPython(code) {
  if (!code) return '';
  if (code.includes('<span class=')) return code;
  
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
    
  const tokens = [];
  let tokenIndex = 0;
  
  function addToken(text, className) {
    const placeholder = `___TOKEN_${tokenIndex}___`;
    tokens.push({ placeholder, html: `<span class="${className}">${text}</span>` });
    tokenIndex++;
    return placeholder;
  }
  
  // Comments
  html = html.replace(/(#[^\n]*)/g, (match) => addToken(match, 'comment'));
  
  // Triple-quoted strings
  html = html.replace(/(""\"[\s\S]*?""\"|''\'[\s\S]*?''\')/g, (match) => addToken(match, 'string'));
  
  // Single & double line strings
  html = html.replace(/([frb]?(['"])(?:\\.|[^\\])*?\2)/g, (match) => addToken(match, 'string'));
  
  // Keywords
  const keywords = /\b(def|class|if|elif|else|while|for|in|return|try|except|finally|import|from|global|lambda|yield|pass|break|continue|and|or|not|is|as|del|None|True|False)\b/g;
  html = html.replace(keywords, (match) => addToken(match, 'keyword'));
  
  // Functions
  const functions = /\b(print|input|int|str|float|len|range|list|set|dict|sorted|max|min|sum|enumerate|zip|abs|type|round|math|random|time|datetime)\b(?=\s*\()/g;
  html = html.replace(functions, (match) => addToken(match, 'function'));
  
  // Numbers
  html = html.replace(/\b(\d+(?:\.\d+)?)\b/g, (match) => addToken(match, 'number'));
  
  for (let i = tokens.length - 1; i >= 0; i--) {
    html = html.replace(tokens[i].placeholder, tokens[i].html);
  }
  
  return html;
}

function renderSidebar() {
  lessonNav.innerHTML = '';
  CURRICULUM.forEach((lesson, index) => {
    const item = document.createElement('div');
    item.className = 'nav-item';
    if (lesson.id === currentLessonId) item.classList.add('active');
    if (completedLessons.has(lesson.id)) item.classList.add('completed');

    item.innerHTML = `
      <span class="nav-icon">${lesson.icon}</span>
      <span>${index + 1}. ${lesson.title}</span>
    `;

    item.addEventListener('click', () => {
      loadLesson(lesson.id);
    });
    lessonNav.appendChild(item);
  });
}

function transferCodeToEditor(code, starterCode) {
  if (!code) return;

  const currentVal = codeEditor.value;
  if (currentVal && currentVal.trim() !== '' && currentVal !== starterCode && currentVal !== code) {
    const confirmTransfer = confirm("Ești sigur că vrei să încarci acest cod în editor? Codul tău curent va fi înlocuit.");
    if (!confirmTransfer) return;
  }

  codeEditor.value = code;

  // Open editor if minimized
  floatingEditor.classList.remove('minimized');
  floatingToggleBtn.classList.add('hidden');
  codeEditor.focus();

  if (window.innerWidth > 900) {
    const editorRect = floatingEditor.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    if (editorRect.bottom > viewportHeight) {
      floatingEditor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  showToast('Codul a fost încărcat în editor! 💻🚀', 'success');
}

function renderLesson(lesson) {
  contentPanel.innerHTML = `
    <div class="lesson-card">
      <div class="lesson-header">
        <span class="lesson-emoji">${lesson.icon}</span>
        <div>
          <h2 class="lesson-title">${lesson.title}</h2>
        </div>
        <span class="lesson-badge">+${lesson.xp} XP</span>
      </div>
      <div class="concept-section">
        ${lesson.concept}
      </div>
      ${lesson.example ? `
      <div class="concept-section">
        <h3>💡 Exemplu</h3>
        <div class="code-wrapper-relative">
          <pre class="example-block"><code>${highlightPython(lesson.example)}</code></pre>
          <button class="btn-transfer" id="loadExampleBtn" title="Încarcă în editor">📋 Încarcă în editor</button>
        </div>
      </div>
      ` : ''}
      ${lesson.gameExample ? `
      <div class="concept-section">
        <h3>🎮 Exemplu de joc</h3>
        <div class="code-wrapper-relative">
          <pre class="game-example"><code>${highlightPython(lesson.gameExample)}</code></pre>
          <button class="btn-transfer" id="loadGameExampleBtn" title="Încarcă în editor">📋 Încarcă în editor</button>
        </div>
      </div>
      ` : ''}
      <div class="task-section">
        <h3>🎯 Sarcina ta</h3>
        <p class="task-text">${lesson.task}</p>
        <button class="btn btn-submit" id="taskEditBtn">💻 Editează soluția</button>
      </div>
    </div>
  `;
  codeEditor.value = lesson.starterCode;
  
  // Set up listeners for the transfer buttons
  document.getElementById('loadExampleBtn')?.addEventListener('click', () => {
    transferCodeToEditor(lesson.example, lesson.starterCode);
  });

  document.getElementById('loadGameExampleBtn')?.addEventListener('click', () => {
    transferCodeToEditor(lesson.gameExample, lesson.starterCode);
  });

  // When 'Editează soluția' is clicked, restore editor and focus it
  document.getElementById('taskEditBtn')?.addEventListener('click', () => {
    floatingEditor.classList.remove('minimized');
    floatingToggleBtn.classList.add('hidden');
    codeEditor.focus();
    
    if (window.innerWidth > 900) {
      const editorRect = floatingEditor.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (editorRect.bottom > viewportHeight) {
        floatingEditor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    
    showToast('Editorul a fost deschis! Spor la scris cod! 🚀', 'info');
   });
}

function loadLesson(id) {
  currentLessonId = id;
  const lesson = CURRICULUM.find(l => l.id === id);
  if (!lesson) return;
  renderLesson(lesson);
  renderSidebar();

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    if (completedLessons.has(id)) {
      submitBtn.disabled = true;
      submitBtn.title = "Ai completat deja această lecție!";
      submitBtn.textContent = '✅ Trimis';
    } else {
      submitBtn.disabled = false;
      submitBtn.title = "Trimite soluția spre verificare";
      submitBtn.textContent = '✅ Trimite';
    }
  }
}

async function runPythonCode(code, simulateInput) {
  if (!pyodideReady) {
    await initPyodide();
  }
  if (!pyodideReady) {
    throw new Error('Pyodide not loaded');
  }

  let stdinSetup = '';
  if (simulateInput) {
    stdinSetup = `
import sys
import builtins
from io import StringIO

if not hasattr(builtins, '_original_input'):
    builtins._original_input = builtins.input
builtins.input = builtins._original_input

class SafeStringIO(StringIO):
    def readline(self):
        line = super().readline()
        return line if line else '\\n'
sys.stdin = SafeStringIO("${simulateInput}\\n")
`;
  } else {
    stdinSetup = `
import sys
import builtins
from js import prompt

if not hasattr(builtins, '_original_input'):
    builtins._original_input = builtins.input

def custom_input(prompt_text=""):
    prompt_str = str(prompt_text)
    print(prompt_str, end="")
    val = prompt(prompt_str)
    if val is None:
        val = ""
    else:
        print(val)
    return val

builtins.input = custom_input
sys.stdin = sys.__stdin__
`;
  }

  const wrappedCode = `
${stdinSetup}
import sys
from io import StringIO
_stdout = sys.stdout
sys.stdout = StringIO()
try:
    ${code.replace(/\\/g, '\\\\').replace(/`/g, '\\`').split('\n').join('\n    ')}
except Exception as e:
    print("Error: " + str(e))
_output = sys.stdout.getvalue()
sys.stdout = _stdout
_output
`;

  try {
    const result = pyodide.runPython(wrappedCode);
    return typeof result === 'string' ? result : String(result);
  } catch (e) {
    throw new Error(e.message);
  }
}

function appendOutput(text, className) {
  const line = document.createElement('div');
  line.className = className || '';
  line.textContent = text;
  outputArea.appendChild(line);
  outputArea.scrollTop = outputArea.scrollHeight;
}

function clearOutput() {
  outputArea.innerHTML = '';
  outputArea.className = 'output-area';
}

async function submitCode() {
  if (!currentLessonId) return;
  const lesson = CURRICULUM.find(l => l.id === currentLessonId);
  if (!lesson) return;

  if (completedLessons.has(lesson.id)) {
    showToast('⚠️ Ai completat deja această lecție!', 'info');
    return;
  }

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Se verifică...';
  }

  clearOutput();
  showToast('⏳ Se verifică soluția ta...', 'info');

  try {
    let output = '';
    let passed = false;
    let message = '';

    if (lesson.validator) {
      try {
        output = await runPythonCode(codeEditor.value, '');
      } catch (e) {
        output = e.message;
      }
      const result = lesson.validator(output, pyodide);
      passed = result.pass;
      message = result.message;
    } else {
      output = await runPythonCode(codeEditor.value);
      passed = output.includes('25');
      message = passed ? 'Succes!' : 'Verifică ieșirea.';
    }

    if (passed) {
      showToast('🎉 Corect! Ai completat lecția!', 'success');
      const isFirstTime = !completedLessons.has(lesson.id);
      if (isFirstTime) {
        completedLessons.add(lesson.id);
        totalXP += lesson.xp;
        saveProgress();
        updateStats();
        renderSidebar();
      }
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '✅ Trimis';
      }
      showSuccessModal(lesson);
    } else {
      showToast('❌ Ceva nu a mers bine! Încearcă din nou.', 'error');
      appendOutput(message, 'error');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '✅ Trimite';
      }
    }
  } catch (e) {
    showToast('❌ Eroare la rulare!', 'error');
    appendOutput('Eroare: ' + e.message, 'error');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = '✅ Trimite';
    }
  }
}

function showSuccessModal(lesson) {
  const overlay = document.createElement('div');
  overlay.className = 'success-overlay';
  overlay.innerHTML = `
    <div class="success-modal">
      <div class="success-emoji">🎉</div>
      <h2>Lecție completă!</h2>
      <p>Ai terminat cu succes: <strong>${lesson.icon} ${lesson.title}</strong></p>
      <div class="xp-gained">+${lesson.xp} XP</div>
      <br><br>
      <button class="btn btn-submit" id="nextLessonBtn">Lecția următoare →</button>
    </div>
  `;
  document.body.appendChild(overlay);

  const currentIndex = CURRICULUM.findIndex(l => l.id === lesson.id);
  document.getElementById('nextLessonBtn').addEventListener('click', () => {
    overlay.remove();
    const nextLesson = CURRICULUM[currentIndex + 1];
    if (nextLesson) {
      loadLesson(nextLesson.id);
    }
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

async function runCode() {
  clearOutput();
  showToast('🚀 Se execută codul...', 'info');
  try {
    const output = await runPythonCode(codeEditor.value);
    appendOutput(output || '(fără ieșire)', 'success');
  } catch (e) {
    showToast('❌ Eroare la execuție!', 'error');
    appendOutput('Eroare: ' + e.message, 'error');
  }
}

// Window Dragging Logic
function makeWindowDraggable(elmnt, header) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  header.onmousedown = dragMouseDown;
  header.ontouchstart = dragTouchStart;

  function dragMouseDown(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (e.target.classList.contains('resizer')) return;
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function dragTouchStart(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (e.target.classList.contains('resizer')) return;
    e.preventDefault();
    const touch = e.touches[0];
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    document.ontouchend = closeDragElement;
    document.ontouchmove = elementTouchDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    applyDragPosition();
  }

  function elementTouchDrag(e) {
    e.preventDefault();
    const touch = e.touches[0];
    pos1 = pos3 - touch.clientX;
    pos2 = pos4 - touch.clientY;
    pos3 = touch.clientX;
    pos4 = touch.clientY;
    applyDragPosition();
  }

  function applyDragPosition() {
    let newTop = elmnt.offsetTop - pos2;
    let newLeft = elmnt.offsetLeft - pos1;
    if (newTop < 0) newTop = 0;
    if (newLeft < 0) newLeft = 0;
    if (newTop > window.innerHeight - 80) newTop = window.innerHeight - 80;
    if (newLeft > window.innerWidth - 100) newLeft = window.innerWidth - 100;
    elmnt.style.top = newTop + "px";
    elmnt.style.left = newLeft + "px";
    elmnt.style.bottom = 'auto';
    elmnt.style.right = 'auto';
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}

// Horizontal drag scrolling for lesson-nav on mobile
function makeLessonNavDraggable() {
  const nav = document.querySelector('.lesson-nav');
  if (!nav) return;
  
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;
  
  nav.style.cursor = 'grab';
  
  nav.addEventListener('mousedown', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (window.innerWidth > 900) return; // Only for mobile
    
    isDragging = true;
    nav.style.cursor = 'grabbing';
    startX = e.clientX;
    scrollLeft = nav.scrollLeft;
    
    const mouseMove = (moveEvent) => {
      if (!isDragging) return;
      moveEvent.preventDefault();
      nav.scrollLeft = scrollLeft - (moveEvent.clientX - startX);
    };
    
    const mouseUp = () => {
      isDragging = false;
      nav.style.cursor = 'grab';
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };
    
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  });
  
  // Touch support for mobile
  nav.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    
    isDragging = true;
    startX = e.touches[0].clientX;
    scrollLeft = nav.scrollLeft;
    nav.style.cursor = 'grabbing';
    
    const touchMove = (moveEvent) => {
      if (!isDragging) return;
      moveEvent.preventDefault();
      nav.scrollLeft = scrollLeft - (moveEvent.touches[0].clientX - startX);
    };
    
    const touchEnd = () => {
      isDragging = false;
      nav.style.cursor = 'grab';
      nav.removeEventListener('touchmove', touchMove);
      nav.removeEventListener('touchend', touchEnd);
    };
    
    nav.addEventListener('touchmove', touchMove, { passive: false });
    nav.addEventListener('touchend', touchEnd);
  });
}

// All-Sides Window Resizing Logic
function makeWindowResizable(elmnt) {
  const resizers = elmnt.querySelectorAll('.resizer');
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_left = 0;
  let original_top = 0;
  let currentResizer = null;

  for (let i = 0; i < resizers.length; i++) {
    const resizer = resizers[i];
    resizer.addEventListener('mousedown', function(e) {
      e.preventDefault();
      currentResizer = resizer;
      original_width = parseFloat(getComputedStyle(elmnt, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(elmnt, null).getPropertyValue('height').replace('px', ''));
      original_x = e.clientX;
      original_y = e.clientY;
      original_left = elmnt.offsetLeft;
      original_top = elmnt.offsetTop;
      
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });
    resizer.addEventListener('touchstart', function(e) {
      e.preventDefault();
      currentResizer = resizer;
      original_width = parseFloat(getComputedStyle(elmnt, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(elmnt, null).getPropertyValue('height').replace('px', ''));
      const touch = e.touches[0];
      original_x = touch.clientX;
      original_y = touch.clientY;
      original_left = elmnt.offsetLeft;
      original_top = elmnt.offsetTop;
      
      window.addEventListener('touchmove', touchResize);
      window.addEventListener('touchend', stopTouchResize);
    });
  }

  function resize(e) {
    const minWidth = 350;
    const minHeight = 250;
    
    if (!currentResizer) return;

    if (currentResizer.classList.contains('r-right')) {
      const width = original_width + (e.clientX - original_x);
      if (width > minWidth) elmnt.style.width = width + 'px';
    }
    else if (currentResizer.classList.contains('r-left')) {
      const width = original_width - (e.clientX - original_x);
      if (width > minWidth) {
        elmnt.style.width = width + 'px';
        elmnt.style.left = (original_left + (e.clientX - original_x)) + 'px';
      }
    }
    else if (currentResizer.classList.contains('r-bottom')) {
      const height = original_height + (e.clientY - original_y);
      if (height > minHeight) elmnt.style.height = height + 'px';
    }
    else if (currentResizer.classList.contains('r-top')) {
      const height = original_height - (e.clientY - original_y);
      if (height > minHeight) {
        elmnt.style.height = height + 'px';
        elmnt.style.top = (original_top + (e.clientY - original_y)) + 'px';
      }
    }
    else if (currentResizer.classList.contains('r-bottom-right')) {
      const width = original_width + (e.clientX - original_x);
      const height = original_height + (e.clientY - original_y);
      if (width > minWidth) elmnt.style.width = width + 'px';
      if (height > minHeight) elmnt.style.height = height + 'px';
    }
    else if (currentResizer.classList.contains('r-bottom-left')) {
      const width = original_width - (e.clientX - original_x);
      const height = original_height + (e.clientY - original_y);
      if (height > minHeight) {
        elmnt.style.height = height + 'px';
        if (width > minWidth) {
          elmnt.style.width = width + 'px';
          elmnt.style.left = (original_left + (e.clientX - original_x)) + 'px';
        }
      }
    }
    else if (currentResizer.classList.contains('r-top-right')) {
      const width = original_width + (e.clientX - original_x);
      const height = original_height - (e.clientY - original_y);
      if (width > minWidth) elmnt.style.width = width + 'px';
      if (height > minHeight) {
        elmnt.style.height = height + 'px';
        elmnt.style.top = (original_top + (e.clientY - original_y)) + 'px';
      }
    }
    else if (currentResizer.classList.contains('r-top-left')) {
      const width = original_width - (e.clientX - original_x);
      const height = original_height - (e.clientY - original_y);
      if (width > minWidth) {
        elmnt.style.width = width + 'px';
        elmnt.style.left = (original_left + (e.clientX - original_x)) + 'px';
      }
      if (height > minHeight) {
        elmnt.style.height = height + 'px';
        elmnt.style.top = (original_top + (e.clientY - original_y)) + 'px';
      }
    }
  }

  function touchResize(e) {
    const touch = e.touches[0];
    const fakeEvent = { clientX: touch.clientX, clientY: touch.clientY };
    resize(fakeEvent);
  }

  function stopResize() {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
    currentResizer = null;
  }

  function stopTouchResize() {
    window.removeEventListener('touchmove', touchResize);
    window.removeEventListener('touchend', stopTouchResize);
    currentResizer = null;
  }
}

document.getElementById('runBtn').addEventListener('click', runCode);
document.getElementById('submitBtn').addEventListener('click', submitCode);
document.getElementById('clearOutputBtn').addEventListener('click', clearOutput);

// Minimize & Toggle actions
minimizeBtn.addEventListener('click', () => {
  if (window.innerWidth <= 900) return;
  floatingEditor.classList.add('minimized');
  floatingToggleBtn.classList.remove('hidden');
});

floatingToggleBtn.addEventListener('click', () => {
  floatingEditor.classList.remove('minimized');
  floatingToggleBtn.classList.add('hidden');
});

codeEditor.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = codeEditor.selectionStart;
    const end = codeEditor.selectionEnd;
    codeEditor.value = codeEditor.value.substring(0, start) + '    ' + codeEditor.value.substring(end);
    codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
  }
});

async function init() {
  loadProgress();
  updateStats();
  renderSidebar();

  if (CURRICULUM.length > 0) {
    loadLesson(CURRICULUM[0].id);
  }

  function ensureEditorVisible() {
    const w = window.innerWidth;
    
    // Remove any minimized state
    floatingEditor.classList.remove('minimized');
    
    if (w > 900) {
      const h = window.innerHeight;
      const editorWidth = floatingEditor.offsetWidth || 420;
      const editorHeight = floatingEditor.offsetHeight || 400;
      
      floatingEditor.style.top = (h - editorHeight - 60) + 'px';
      floatingEditor.style.left = (w - editorWidth - 30) + 'px';
      floatingEditor.style.position = 'fixed';
      floatingEditor.style.bottom = 'auto';
      floatingEditor.style.right = 'auto';
      
      // Hide the toggle button when editor is visible on desktop
      floatingToggleBtn.classList.add('hidden');
    } else {
      floatingEditor.style.position = 'relative';
      floatingEditor.style.top = 'auto';
      floatingEditor.style.left = 'auto';
      floatingEditor.style.bottom = 'auto';
      floatingEditor.style.right = 'auto';
      
      // Hide the toggle button when editor is visible on mobile
      floatingToggleBtn.classList.add('hidden');
    }
  }
  
  // Initial setup
  ensureEditorVisible();

  // Handle window resize
  window.addEventListener('resize', () => {
    ensureEditorVisible();
  });

  // Enable horizontal drag scrolling for lesson-nav on mobile
  makeLessonNavDraggable();

  // Bind dragging and resizing only on desktop
  if (window.innerWidth > 900) {
    makeWindowDraggable(floatingEditor, editorHeader);
    makeWindowResizable(floatingEditor);
  }

  await initPyodide();
}

init();