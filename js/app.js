let pyodide = null;
let pyodideReady = false;
let currentLessonId = null;
let completedLessons = new Set();
let totalXP = 0;
let streak = 0;
let lastCompletedDate = null;

let cheatState = 0; // State machine for cheat code
let cheatActive = false; // Tracks if the unlock cheat is currently active
let preCheatActiveLessonId = null; // Saves the active lesson ID before the cheat unlocks everything

const outputArea = document.getElementById('outputArea');
const codeEditor = document.getElementById('codeEditor');
const lessonNav = document.getElementById('lessonNav');
const contentPanel = document.getElementById('contentPanel');
const xpDisplay = document.getElementById('xpDisplay');
const streakDisplay = document.getElementById('streakDisplay');
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
      streak = data.streak || 0;
      lastCompletedDate = data.lastCompletedDate || null;
    } else {
      completedLessons = new Set();
      totalXP = 0;
      streak = 0;
      lastCompletedDate = null;
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
}

function saveProgress() {
  if (cheatActive) return; // Do not save any progress while the cheat is active!
  try {
    const data = {
      completed: Array.from(completedLessons),
      totalXP,
      streak,
      lastCompletedDate
    };
    localStorage.setItem('FunPyClub_progress', JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

function updateStreak() {
  const today = new Date().toDateString();
  if (lastCompletedDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (lastCompletedDate === yesterday.toDateString()) {
      streak += 1;
    } else if (lastCompletedDate !== today) {
      streak = 1;
    }
    lastCompletedDate = today;
  }
}

function updateStats() {
  xpDisplay.textContent = totalXP;
  streakDisplay.textContent = streak;
  const progress = (completedLessons.size / CURRICULUM.length) * 100;
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
    
    const isLocked = index > 0 && !completedLessons.has(CURRICULUM[index - 1].id);
    if (isLocked) {
      item.classList.add('locked');
    }
    
    item.innerHTML = `
      <span class="nav-icon">${lesson.icon}</span>
      <span>${index + 1}. ${lesson.title}</span>
    `;
    
    item.addEventListener('click', () => {
      if (!item.classList.contains('locked')) {
        loadLesson(lesson.id);
      } else {
        showToast('🔒 Finalizează lecțiile anterioare mai întâi!', 'error');
      }
    });
    lessonNav.appendChild(item);
  });
}

// State machine triggers for the unlock cheat code
function handleLogoClick() {
  if (cheatActive) {
    // Revert cheat! Re-locks and restores progress to saved state
    cheatActive = false;
    cheatState = 0;
    loadProgress();
    updateStats();
    
    // Select previously active section in sidebar before cheat was activated
    if (preCheatActiveLessonId) {
      loadLesson(preCheatActiveLessonId);
    } else if (CURRICULUM.length > 0) {
      loadLesson(CURRICULUM[0].id);
    } else {
      renderSidebar();
    }
    
    showToast("🔒 Cheat dezactivat! Progresul a revenit la starea salvată.", "info");
    return;
  }
  
  if (cheatState === 0) cheatState = 1;
  else if (cheatState === 1) cheatState = 2;
  else if (cheatState === 2) cheatState = 3;
  else if (cheatState === 4) cheatState = 5;
  else if (cheatState === 5) cheatState = 6;
  else if (cheatState === 7) cheatState = 8;
  else if (cheatState === 8) cheatState = 9;
  else if (cheatState === 9) cheatState = 10;
  else if (cheatState === 10) cheatState = 11;
  else {
    cheatState = 1; // Restart sequence from first logo click
  }
  console.log("Cheat State (Logo Click):", cheatState);
}

function handleButtonClick() {
  if (cheatActive) return; // Do not check code when cheat is already active
  
  if (cheatState === 3) {
    cheatState = 4;
  } else if (cheatState === 6) {
    cheatState = 7;
  } else if (cheatState === 11) {
    // UNLOCKED EVERYTHING IN MEMORY ONLY (Do not save progress)
    preCheatActiveLessonId = currentLessonId; // Save currently selected lesson
    cheatActive = true;
    completedLessons = new Set(CURRICULUM.map(l => l.id));
    // progress is NOT saved here to localStorage
    renderSidebar();
    showToast("🔓 Cheat Code activat! Toate secțiunile sunt deblocate.", "success");
    cheatState = 0;
  } else {
    cheatState = 0; // Reset
  }
  console.log("Cheat State (Button Click):", cheatState);
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
      <div class="concept-section">
        <h3>💡 Exemplu</h3>
        <pre class="example-block"><code>${highlightPython(lesson.example)}</code></pre>
      </div>
      <div class="concept-section">
        <h3>🎮 Exemplu de joc</h3>
        <pre class="game-example"><code>${highlightPython(lesson.gameExample)}</code></pre>
      </div>
      <div class="task-section">
        <h3>🎯 Sarcina ta</h3>
        <p class="task-text">${lesson.task}</p>
        <button class="btn btn-submit" id="taskEditBtn">💻 Editează soluția</button>
      </div>
    </div>
  `;
  codeEditor.value = lesson.starterCode;
  
  // When 'Editează soluția' is clicked, restore editor and focus it
  document.getElementById('taskEditBtn')?.addEventListener('click', () => {
    floatingEditor.classList.remove('minimized');
    floatingToggleBtn.classList.add('hidden');
    codeEditor.focus();
    showToast('Editorul a fost deschis! Spor la scris cod! 🚀', 'info');
    
    // Cheat code step check
    handleButtonClick();
  });
}

function loadLesson(id) {
  currentLessonId = id;
  const lesson = CURRICULUM.find(l => l.id === id);
  if (!lesson) return;
  renderLesson(lesson);
  renderSidebar();
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
from io import StringIO
sys.stdin = StringIO("${simulateInput}\\n")
`;
  } else {
    stdinSetup = `
import sys
from io import StringIO
sys.stdin = StringIO("")
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

  clearOutput();
  showToast('⏳ Se verifică soluția ta...', 'info');

  try {
    let output = '';
    let passed = false;
    let message = '';

    if (lesson.validator) {
      try {
        output = await runPythonCode(codeEditor.value, 'albastru');
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
      completedLessons.add(lesson.id);
      totalXP += lesson.xp;
      updateStreak();
      saveProgress();
      updateStats();
      renderSidebar();
      showSuccessModal(lesson);
    } else {
      showToast('❌ Ceva nu a mers bine! Încearcă din nou.', 'error');
      appendOutput(message, 'error');
    }
  } catch (e) {
    showToast('❌ Eroare la rulare!', 'error');
    appendOutput('Eroare: ' + e.message, 'error');
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

  function dragMouseDown(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
    if (e.target.classList.contains('resizer')) return; // Avoid drag conflict with resizers
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    let newTop = elmnt.offsetTop - pos2;
    let newLeft = elmnt.offsetLeft - pos1;
    
    // Bounds check
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
  }
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

  function stopResize() {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
    currentResizer = null;
  }
}

document.getElementById('runBtn').addEventListener('click', runCode);
document.getElementById('submitBtn').addEventListener('click', submitCode);
document.getElementById('clearOutputBtn').addEventListener('click', clearOutput);

// Minimize & Toggle actions
minimizeBtn.addEventListener('click', () => {
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

  // Set initial position for the floating window
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w > 900) {
    floatingEditor.style.top = (h - 610) + 'px';
    floatingEditor.style.left = (w - 570) + 'px';
  }

  // Bind dragging and resizing
  makeWindowDraggable(floatingEditor, editorHeader);
  makeWindowResizable(floatingEditor);

  // Bind logo click event for cheat code detection
  const logoHeader = document.querySelector('.logo');
  if (logoHeader) {
    logoHeader.addEventListener('click', handleLogoClick);
    logoHeader.style.cursor = 'pointer';
  }

  await initPyodide();
}

init();