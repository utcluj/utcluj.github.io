const CURRICULUM = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. VARIABILE & IEȘIRE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'variables',
    title: 'Variabile & Ieșire',
    icon: '📦',
    concept: `
      <h3>📖 Variabile și ieșire</h3>
      <p>Variabilele sunt containere pentru stocarea datelor. În Python, creezi o variabilă dându-i un nume și o valoare folosind semnul <code>=</code>.</p>
      <p>Funcția <code>print()</code> afișează text sau valori pe ecran.</p>
      <p><strong>Exemplu:</strong> <code>nume = "Ana"</code> creează o variabilă numită <code>nume</code> care conține textul "Ana".</p>
    `,
    example: `# Stocarea datelor în variabile
nume = "Alex"
varsta = 14
scoala = "Școala Soarelui"

# Afișarea variabilelor
print("Nume:", nume)
print("Vârstă:", varsta)
print("Școală:", scoala)`,
    gameExample: `# Exemplu: Creator de personaj
nume_erou = "Dragonul de Foc"
viata = 100
arma = "Sabie Magică"

print("Bine ai venit, " + nume_erou + "!")
print("Viață: " + str(viata))
print("Armă: " + arma)`,
    task: `🐾 Creează fișa unui animal de companie! Definește trei variabile:
1. <code>nume_animal</code> cu valoarea <code>"Fluffy"</code>
2. <code>tip_animal</code> cu valoarea <code>"pisică"</code>
3. <code>varsta_animal</code> cu valoarea <code>3</code>

Apoi folosește <code>print()</code> pentru a afișa: <code>"Pisica Fluffy are 3 ani!"</code>
(Sugestie: folosește mai multe argumente în print() separate prin virgulă)`,
    solution: `nume_animal = "Fluffy"
tip_animal = "pisică"
varsta_animal = 3
print("Pisica", tip_animal, nume_animal, "are", varsta_animal, "ani!")`,
    xp: 50,
    starterCode: `# Scrie codul tău aici\n`,
    validator: (output) => {
      const checks = [
        output.includes('Fluffy'),
        output.includes('pisică') || output.includes('pisica'),
        output.includes('3')
      ];
      const passed = checks.filter(Boolean).length >= 2;
      return {
        pass: passed,
        message: passed
          ? '🎉 Fenomenal! Ai stăpânit variabilele și print()!'
          : '🐾 Asigură-te că ieșirea conține "Fluffy", "pisică" și "3". Încearcă din nou!'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 2. OBȚINEREA DE INTRARE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'input',
    title: 'Citirea Datelor',
    icon: '⌨️',
    concept: `
      <h3>📖 Funcția input()</h3>
      <p>Funcția <code>input()</code> permite programului tău să întrebe utilizatorul și să aștepte răspunsul lui. Tot ce tastează utilizatorul este returnat ca text (șir de caractere).</p>
      <p>Poți pune o întrebare între paranteze: <code>input("Cum te cheamă? ")</code></p>
      <p><strong>Notă:</strong> În acest simulator, valoarea introdusă va fi "albastru".</p>
    `,
    example: `# Întrebarea utilizatorului
nume = input("Introdu numele tău: ")
print("Salut, " + nume + "!")

# Obținerea unui număr (convertire text în număr întreg)
varsta = int(input("Introdu vârsta ta: "))
print("Anul viitor vei avea", varsta + 1)`,
    gameExample: `# Exemplu: Pornirea aventurii
erou = input("Care este numele eroului tău? ")
aventura = input("Ce aventură vei alege? ")

print("=== AVENTURA A INCEPUT ===")
print("Erou:", erou)
print("Aventură:", aventura)
print("Mult noroc, " + erou + "!")`,
    task: `Creează un program simplu care:
1. Cere utilizatorului culoarea favorită cu mesajul: <code>"Care este culoarea ta preferată? "</code>
2. Salvează răspunsul în variabila <code>culoare</code>
3. Afișează: <code>"Culoarea ta preferată este [culoare]!"</code>

<strong>Simulăm răspunsul cu "albastru".</strong>`,
    solution: `culoare = input("Care este culoarea ta preferată? ")
print("Culoarea ta preferată este " + culoare + "!")`,
    xp: 60,
    starterCode: `# Întreabă despre culoarea preferată\n`,
    validator: (output) => {
      const checks = [
        output.includes('albastru'),
        output.includes('preferată') || output.includes('preferata')
      ];
      const passed = checks.filter(Boolean).length >= 2;
      console.log(output, checks)
      return {
        pass: passed,
        message: passed
          ? '🚀 Bravo! Ai folosit bine funcția input()!'
          : '⌨️ Asigură-te că folosești input() și afișezi rezultatul corect!'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 3. NUMERE & MATEMATICĂ
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'numbers',
    title: 'Numere & Matematică',
    icon: '🔢',
    concept: `
      <h3>📖 Numere în Python</h3>
      <p>Python poate face calcule matematice. Există două tipuri principale de numere:</p>
      <ul>
        <li><strong>Întregi</strong> (int): <code>5</code>, <code>42</code>, <code>-7</code></li>
        <li><strong>Zecimale</strong> (float): <code>3.14</code>, <code>2.5</code>, <code>-0.5</code></li>
      </ul>
      <p>Operatori matematici:</p>
      <ul>
        <li><code>+</code> adunare, <code>-</code> scădere, <code>*</code> înmulțire, <code>/</code> împărțire</li>
        <li><code>//</code> împărțire întreagă, <code>%</code> restul împărțirii, <code>**</code> ridicare la putere</li>
      </ul>
    `,
    example: `# Calcule matematice simple
mere = 12
prieteni = 4

print("Mere per prieten:", mere // prieteni)
print("Mere rămase:", mere % prieteni)

# Puteri și rădăcini
print("2 la puterea 10:", 2 ** 10)
print("Rădăcina pătrată a lui 9:", 9 ** 0.5)`,
    gameExample: `# Exemplu: Calculatorul de daune
atac = 35
aparare = 10
multiplicator_critic = 2

dauna_normala = atac - aparare
dauna_critica = dauna_normala * multiplicator_critic

print("Daună normală:", dauna_normala)
print("Daună critică:", dauna_critica)`,
    task: `🍕 Calculatorul de pizza! Scrie un program care:
1. Creează variabila <code>pizza_felii</code> cu valoarea <code>16</code>
2. Creează variabila <code>copii</code> cu valoarea <code>5</code>
3. Calculează câte felii primește fiecare copil (folosind <code>//</code>) și stochează în <code>felii_per_copil</code>
4. Calculează câte felii rămân (folosind <code>%</code>) și stochează în <code>felii_ramase</code>
5. Afișează exact: <code>"Fiecare copil primește 3 felii și rămân 1 felii!"</code>`,
    solution: `pizza_felii = 16
copii = 5
felii_per_copil = pizza_felii // copii
felii_ramase = pizza_felii % copii
print("Fiecare copil primește", felii_per_copil, "felii și rămân", felii_ramase, "felii!")`,
    xp: 65,
    starterCode: `pizza_felii = 16\ncopii = 5\n# Calculează și afișează\n`,
    validator: (output) => {
      const passed = output.includes('3') && output.includes('1');
      return {
        pass: passed,
        message: passed
          ? '🍕 Excelent! Ești un maestru al împărțirilor matematice!'
          : '🔢 Verifică calculele. Rezultatul ar trebui să arate 3 felii și restul 1.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 4. ȘIRURI DE CARACTERE & METODE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'strings',
    title: 'Șiruri de Caractere',
    icon: '🔤',
    concept: `
      <h3>📖 Lucrul cu textul</h3>
      <p>Șirurile de caractere sunt texte puse în ghilimele. Python are multe metode pentru a manipula textul:</p>
      <ul>
        <li><code>.upper()</code> → transformă în litere mari</li>
        <li><code>.lower()</code> → transformă în litere mici</li>
        <li><code>.strip()</code> → scoate spațiile din margini</li>
        <li><code>.replace(vechi, nou)</code> → înlocuiește cuvinte</li>
        <li><code>len(text)</code> → numărul de caractere</li>
      </ul>
    `,
    example: `# Metode de text
mesaj = "  Bună, Lume!  "
print(mesaj.strip())        # "Bună, Lume!"
print(mesaj.upper())        # "  BUNĂ, LUME!  "
print(mesaj.lower())        # "  bună, lume!  "
print(mesaj.replace("Lume", "Python"))`,
    gameExample: `# Exemplu: Decodificator de mesaje secrete
secret = "  aMiC dRaGoN  "

pas1 = secret.strip()
pas2 = pas1.upper()
pas3 = pas2.replace("A", "4")

print("Original:", secret)
print("Decodat:", pas3)`,
    task: `Pornind de la textul: <code>text = "Python e SUPER"</code>
1. Elimină spațiile folosind <code>.strip()</code>
2. Convertește-l la litere mici folosind <code>.lower()</code>
3. Înlocuiește cuvântul "super" cu "minunat" folosind <code>.replace()</code>
4. Afișează rezultatul final!

Rezultat așteptat: <code>"python e minunat"</code>`,
    solution: `text = "Python e SUPER"
pas1 = text.strip()
pas2 = pas1.lower()
pas3 = pas2.replace("super", "minunat")
print(pas3)`,
    xp: 70,
    starterCode: `text = "Python e SUPER"\n# Scrie codul tău aici\n`,
    validator: (output) => {
      const expected = 'python e minunat';
      const passed = output.trim().includes(expected);
      return {
        pass: passed,
        message: passed
          ? '🥷 Super! Ai transformat textul exact cum trebuie!'
          : `Verifică rezultatul. Ar trebui să fie exact: "${expected}"`
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 5. LISTE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'lists',
    title: 'Liste',
    icon: '📋',
    concept: `
      <h3>📖 Liste</h3>
      <p>Listele stochează mai multe elemente într-o singură variabilă. Ele sunt ordonate și pot fi modificate.</p>
      <ul>
        <li><code>lista.append(element)</code> → adaugă la sfârșit</li>
        <li><code>lista[0]</code> → primul element</li>
        <li><code>lista[-1]</code> → ultimul element</li>
        <li><code>len(lista)</code> → numărul de elemente</li>
      </ul>
    `,
    example: `# Lucrul cu liste
fructe = ["măr", "banană", "cireș"]
print(fructe[0])        # "măr"
fructe.append("portocală")
print(len(fructe))      # 4`,
    gameExample: `# Exemplu: Inventarul unui personaj
inventar = ["sabie", "poțiune"]
inventar.append("scut")
inventar.append("hartă")

for obiect in inventar:
    print("Ai în rucsac:", obiect)`,
    task: `⭐ Creează o listă numită <code>note</code> cu valorile: 10, 20, 30.
Apoi:
1. Adaugă valoarea 40 la listă folosind <code>.append()</code>
2. Afișează primul element (<code>note[0]</code>)
3. Afișează ultimul element (<code>note[-1]</code>)
4. Afișează lungimea listei folosind <code>len()</code>`,
    solution: `note = [10, 20, 30]
note.append(40)
print(note[0])
print(note[-1])
print(len(note))`,
    xp: 80,
    starterCode: `# Creează și modifică lista de note\n`,
    validator: (output) => {
      const linii = output.trim().split('\n');
      const arePrimul = linii.some(l => l.includes('10'));
      const areUltimul = linii.some(l => l.includes('40'));
      const areLung = linii.some(l => l.includes('4'));
      const passed = arePrimul && areUltimul && areLung;
      return {
        pass: passed,
        message: passed
          ? '🏆 Bravo! Ai învățat operațiile cu liste!'
          : '📋 Asigură-te că afișezi elementele cerute și lungimea listei.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 6. DICȚIONARE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'dictionaries',
    title: 'Dicționare',
    icon: '📚',
    concept: `
      <h3>📖 Dicționare</h3>
      <p>Dicționarele stochează perechi de tip <strong>cheie-valoare</strong>. Sunt ideale pentru a grupa caracteristici ale unui obiect.</p>
      <ul>
        <li><code>dict["cheie"]</code> → obține valoarea</li>
        <li><code>dict["nou"] = valoare</code> → adaugă element</li>
        <li><code>for k, v in dict.items():</code> → parcurge dicționarul</li>
      </ul>
    `,
    example: `# Dicționar simplu
elev = {
    "nume": "Sam",
    "varsta": 16,
    "nota": "A"
}
print(elev["nume"])  # "Sam"
elev["oras"] = "Cluj"`,
    gameExample: `# Exemplu: Fișa personajului
personaj = {
    "nume": "Luna",
    "clasa": "Vrăjitoare",
    "nivel": 5,
    "mana": 100
}

for atribut, valoare in personaj.items():
    print(atribut + ":", valoare)`,
    task: `📖 Creează un dicționar numită <code>carte</code> cu cheile "titlu", "autor" și "pagini" (pune ce valori vrei).
Apoi:
1. Afișează titlul folosind <code>carte["titlu"]</code>
2. Adaugă o cheie nouă "an" cu valoarea 2023
3. Parcurge dicționarul și afișează toate perechile cheie-valoare`,
    solution: `carte = {"titlu": "Codul Secret", "autor": "Mage", "pagini": 200}
print(carte["titlu"])
carte["an"] = 2023
for k, v in carte.items():
    print(k + ":", v)`,
    xp: 90,
    starterCode: `# Creează dicționarul carte\n`,
    validator: (output) => {
      const areTitlu = output.includes('titlu') || output.includes('carte');
      const areAn = output.includes('an') || output.includes('2023');
      const passed = areTitlu && areAn;
      return {
        pass: passed,
        message: passed
          ? '🧙 Maestru al dicționarelor! Datele sunt organizate perfect!'
          : '📚 Asigură-te că afișezi titlul, adaugi anul 2023 și parcurgi elementele.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 7. CONDIȚII
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'conditionals',
    title: 'Condiții',
    icon: '🔀',
    concept: `
      <h3>📖 Condițiile if / elif / else</h3>
      <p>Permit programului tău să ia decizii logice. Dacă o condiție este adevărată, se execută un bloc de cod, altfel se continuă cu următoarele.</p>
    `,
    example: `# Controlul fluxului
temperatura = 25

if temperatura > 30:
    print("E cald!")
elif temperatura > 20:
    print("Vreme frumoasă")
else:
    print("E frig!")`,
    gameExample: `# Exemplu: Alege drumul
drum = input("Alege drumul (stanga/dreapta): ")

if drum == "stanga":
    print("Ai găsit o comoară!")
elif drum == "dreapta":
    print("Te-ai întâlnit cu un dragon!")
else:
    print("Ai rămas pe loc...")`,
    task: `🎓 Scrie un evaluator de note:
1. Creează o variabilă <code>nota</code> cu valoarea 85
2. Folosește if/elif/else pentru a afișa:
   - "A" dacă nota >= 90
   - "B" dacă nota >= 80
   - "C" dacă nota >= 70
   - "F" altfel`,
    solution: `nota = 85
if nota >= 90:
    print("A")
elif nota >= 80:
    print("B")
elif nota >= 70:
    print("C")
else:
    print("F")`,
    xp: 100,
    starterCode: `# Pune nota și verific-o\n`,
    validator: (output) => {
      const passed = output.trim().includes('B');
      return {
        pass: passed,
        message: passed
          ? 'Bine! Ai înțeles deciziile if/elif/else.'
          : 'Așteptat rezultatul "B" pentru nota 85.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 8. BUCLE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'loops',
    title: 'Bucle',
    icon: '🔄',
    concept: `
      <h3>📖 Bucle repetitive</h3>
      <p>Buclele <code>for</code> și <code>while</code> repetă execuția unui cod. <code>range(start, stop)</code> generează o listă de numere succesive.</p>
    `,
    example: `# Buclă simplă for
for i in range(3):
    print("Repetare:", i)

# Buclă while
contor = 3
while contor > 0:
    print("Contor:", contor)
    contor = contor - 1`,
    gameExample: `# Exemplu: Lansare rachetă
secunde = 5
while secunde > 0:
    print("T-minus", secunde)
    secunde -= 1
print("🚀 Decolare!")`,
    task: `🔢 Afișează tabela înmulțirii cu 5!
Folosește o buclă <code>for</code> cu <code>range(1, 11)</code> pentru a afișa:
<br> 5 x 1 = 5
<br> 5 x 2 = 10
<br> ... până la 5 x 10 = 50`,
    solution: `for i in range(1, 11):
    print("5 x", i, "=", 5 * i)`,
    xp: 110,
    starterCode: `# Scrie bucla for aici\n`,
    validator: (output) => {
      const linii = output.trim().split('\n');
      const areToate = linii.length >= 10;
      const suntCorecte = linii.slice(0,10).every((l, idx) => l.includes(`5 x ${idx + 1} = ${5 * (idx + 1)}`));
      const passed = areToate && suntCorecte;
      return {
        pass: passed,
        message: passed
          ? '🔄 Ai finalizat buclele cu succes! Felicitări!'
          : '🔄 Asigură-te că tabela conține toate înmulțirile de la 1 la 10.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 9. FUNCȚII
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'functions',
    title: 'Funcții',
    icon: '⚙️',
    concept: `
      <h3>📖 Ce sunt funcțiile?</h3>
      <p>Funcțiile sunt fragmente de cod reutilizabile. Le definești folosind <code>def</code> și le poți apela de oricâte ori vrei.</p>
    `,
    example: `# Definirea unei funcții
def saluta(nume):
    return "Salut, " + name + "!"

print(saluta("Gigel"))`,
    gameExample: `# Exemplu: Calcul daune
def calculeaza_daune(atac, scut):
    rezultat = atac - scut
    return max(0, rezultat)

print("Daune primite:", calculeaza_daune(40, 15))`,
    task: `🧮 Creează o funcție numită <code>patrat</code> care:
1. Acceptă un singur parametru <code>n</code>
2. Returnează valoarea lui <code>n</code> ridicată la pătrat (adică <code>n * n</code>)
Apoi apelează funcția <code>patrat(5)</code> și afișează rezultatul cu <code>print()</code>.`,
    solution: `def patrat(n):
    return n * n
print(patrat(5))`,
    xp: 120,
    starterCode: `# Definește funcția patrat\n`,
    validator: (output) => {
      const passed = output.includes('25');
      return {
        pass: passed,
        message: passed
          ? '🔧 Excelent! Funcția funcționează corect!'
          : '⚙️ Așteptat ca rezultatul apelului patrat(5) să fie 25.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 10. LISTE AVANSATE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'lists-advanced',
    title: 'Liste Avansate',
    icon: '🎯',
    concept: `
      <h3>📖 Liste prin comprehensiune</h3>
      <p>Sunt moduri rapide și elegante de a crea sau transforma liste în Python într-o singură linie de cod!</p>
    `,
    example: `# Comprehensiune de liste
numere = [1, 2, 3, 4]
dublate = [x * 2 for x in numere]
print(dublate)  # [2, 4, 6, 8]`,
    gameExample: `# Exemplu: Selecție valori puternice
puteri = [50, 120, 30, 200, 85]
luptatori_elite = [p for p in puteri if p >= 100]
print("Elite:", luptatori_elite)`,
    task: `🚀 Pornind de la lista: <code>numere = [1, 2, 3, 4, 5]</code>
1. Adaugă numărul <code>6</code> la listă
2. Șterge numărul <code>3</code> din listă (folosește <code>.remove(3)</code>)
3. Creează o listă numită <code>dublate</code> folosind o list comprehension care înmulțește fiecare număr cu 2
4. Afișează lista <code>dublate</code>`,
    solution: `numere = [1, 2, 3, 4, 5]
numere.append(6)
numere.remove(3)
dublate = [x * 2 for x in numere]
print(dublate)`,
    xp: 130,
    starterCode: `numere = [1, 2, 3, 4, 5]\n# Modifică și dublează\n`,
    validator: (output) => {
      const passed = output.includes('[2, 4, 8, 10, 12]') || output.includes('2, 4, 8, 10, 12');
      return {
        pass: passed,
        message: passed
          ? '🎯 Super! Lista a fost modificată și dublată corect!'
          : '🎯 Rezultat incorect. Verifică metodele append, remove și list comprehension.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 11. GESTIONAREA ERORILOR
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'error-handling',
    title: 'Gestionarea Erorilor',
    icon: '🛡️',
    concept: `
      <h3>📖 try / except</h3>
      <p>Pentru a evita închiderea forțată a programului în caz de eroare, poți "prinde" eroarea folosind blocuri <code>try</code> și <code>except</code>.</p>
    `,
    example: `try:
    numar = int("text_gresit")
except ValueError:
    print("Eroare de conversie!")`,
    gameExample: `# Exemplu: Deschiderea lăzii
def deschide(cheie):
    try:
        valoare = int(cheie)
        if valoare == 1234:
            return "Comoară deschisă!"
        return "Cod greșit!"
    except:
        return "Cheie invalidă!"

print(deschide("abc"))`,
    task: `🛡️ Scrie un program care convertește în siguranță un text:
1. Folosește structura <code>try/except</code>
2. În <code>try</code>: cere input cu <code>input("Număr: ")</code>, transformă-l în întreg (<code>int</code>) și afișează valoarea înmulțită cu 2
3. În <code>except</code>: afișează <code>"Intrare invalidă!"</code>

<strong>Simulăm inputul cu textul "abc" pentru a genera eroarea.</strong>`,
    solution: `try:
    numar = int(input("Număr: "))
    print(numar * 2)
except:
    print("Intrare invalidă!")`,
    xp: 140,
    starterCode: `# Scrie codul de gestionare a erorilor aici\n`,
    validator: (output) => {
      const passed = output.includes('Intrare invalidă!');
      return {
        pass: passed,
        message: passed
          ? '🛡️ Felicitări! Ai securizat programul împotriva erorilor!'
          : '🛡️ Asigură-te că afișezi "Intrare invalidă!" în caz de eroare.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 12. TUPLE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'tuples',
    title: 'Tuple',
    icon: '📎',
    concept: `
      <h3>📖 Ce sunt tuplele?</h3>
      <p>Tuplele (tuples) sunt liste imutabile. Odată create, elementele lor nu se pot modifica, adăuga sau șterge.</p>
    `,
    example: `# Creare tuplă
coordonate = (10, 20)
print(coordonate[0])  # 10
# coordonate[0] = 50 -> Va genera o eroare!`,
    gameExample: `# Exemplu: Poziții pe ecran
pozitie_erou = (100, 150)
x, y = pozitie_erou
print(f"Eroul este la X: {x}, Y: {y}")`,
    task: `🎯 Coordonatele comorii!
1. Creează o tuplă numită <code>pozitie</code> cu valorile <code>(5, 10)</code>
2. Despachetează coordonatele în variabilele <code>x</code> și <code>y</code>
3. Afișează: <code>"Comoara e la x=5, y=10"</code>
4. Creează o altă tuplă numită <code>culoare_rgb</code> cu valorile <code>(255, 128, 64)</code>
5. Afișează lungimea tuplei <code>culoare_rgb</code> folosind <code>len()</code>`,
    solution: `pozitie = (5, 10)
x, y = pozitie
print(f"Comoara e la x={x}, y={y}")
culoare_rgb = (255, 128, 64)
print(len(culoare_rgb))`,
    xp: 80,
    starterCode: `# Lucrează cu tuple\n`,
    validator: (output) => {
      const hasCoord = output.includes('x=5') && output.includes('y=10');
      const hasLen = output.includes('3');
      const passed = hasCoord && hasLen;
      return {
        pass: passed,
        message: passed
          ? '🎯 Excelent! Datele tale fixe sunt salvate în siguranță!'
          : '📎 Verifică formatul afișat și lungimea tuplei.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 13. SETURI
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'sets',
    title: 'Seturi',
    icon: '🔶',
    concept: `
      <h3>📖 Seturi (Sets)</h3>
      <p>Seturile sunt colecții neordonate de elemente unice. Ele elimină automat duplicatele și sunt optime pentru operații de reuniune, intersecție și diferență.</p>
    `,
    example: `# Seturi unice
numere = {1, 2, 2, 3}
print(numere)  # {1, 2, 3}
numere.add(4)
print(2 in numere)  # True`,
    gameExample: `# Joc: Abilități magice
vrajitor = {"Foc", "Apa", "Gheata"}
razboinic = {"Taiere", "Foc"}
comune = vrajitor & razboinic
print("Abilitate comună:", comune) # {"Foc"}`,
    task: `🔶 Școala de magie! Doi ucenici au liste de vrăji:
1. Creează setul <code>vrajile_anei</code> = <code>{"Foc", "Apa", "Pamant"}</code>
2. Creează setul <code>vrajile_lui_ion</code> = <code>{"Apa", "Aer", "Foc"}</code>
3. Afișează reuniunea celor două seturi (toate vrăjile disponibile) folosind operatorul <code>|</code>
4. Afișează intersecția lor (vrăjile cunoscute de amândoi) folosind <code>&</code>
5. Adaugă <code>"Fulger"</code> în setul <code>vrajile_anei</code>
6. Verifică dacă <code>"Pamant"</code> este în setul <code>vrajile_anei</code> cu operatorul <code>in</code>`,
    solution: `vrajile_anei = {"Foc", "Apa", "Pamant"}
vrajile_lui_ion = {"Apa", "Aer", "Foc"}
print(vrajile_anei | vrajile_lui_ion)
print(vrajile_anei & vrajile_lui_ion)
vrajile_anei.add("Fulger")
print("Pamant" in vrajile_anei)`,
    xp: 80,
    starterCode: `vrajile_anei = {"Foc", "Apa", "Pamant"}\nvrajile_lui_ion = {"Apa", "Aer", "Foc"}\n`,
    validator: (output) => {
      const hasUnion = output.includes('Pamant') && output.includes('Aer');
      const hasCheck = output.includes('True');
      const passed = hasUnion && hasCheck;
      return {
        pass: passed,
        message: passed
          ? '🔶 Superb! Ai învățat operațiile cu mulțimi!'
          : '🔶 Asigură-te că afișezi reuniunea, intersecția și rezultatul verificării.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 14. F-STRINGS & FORMATAREA TEXTULUI
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'fstrings',
    title: 'F-Strings',
    icon: '✍️',
    concept: `
      <h3>📖 Formatarea f-strings</h3>
      <p>F-strings sunt cel mai simplu mod de a formata textul. Adaugi caracterul <code>f</code> în fața ghilimelelor și incluzi variabilele direct între acolade <code>{var}</code>.</p>
    `,
    example: `# Formatare f-string
nume = "Dan"
nota = 9.578
print(f"Salut, {nume}!")
print(f"Nota rotunjită este: {nota:.1f}")`,
    gameExample: `# Exemplu: Interfața unui utilizator
erou = "Magician"
nivel = 12
xp = 450
print(f"🦸 Erou: {erou:<10} | Nivel: {nivel} | XP: {xp}")`,
    task: `Formatează raportul unui elev:
Variabilele sunt deja declarate în codul de pornire.
1. Afișează: <code>"Elev: [nume], Clasa: [clasa]"</code> folosind f-string
2. Afișează media formatată cu exact o singură zecimală: <code>"Media: [medie]"</code> (folosește formatarea <code>{medie:.1f}</code>)
3. Afișează: <code>"Felicitări, [nume]! Ai promovat clasa [clasa]!"</code>`,
    solution: `nume = "Andrei"
clasa = 6
medie = 9.456
print(f"Elev: {nume}, Clasa: {clasa}")
print(f"Media: {medie:.1f}")
print(f"Felicitări, {nume}! Ai promovat clasa {clasa}!")`,
    xp: 85,
    starterCode: `nume = "Andrei"\nclasa = 6\nmedie = 9.456\n# Formatează mesajele folosind f-strings\n`,
    validator: (output) => {
      const hasName = output.includes('Andrei');
      const hasClass = output.includes('6');
      const hasMedia = output.includes('9.5');
      const passed = hasName && hasClass && hasMedia;
      return {
        pass: passed,
        message: passed
          ? '✍️ Excelent! Formatarea textului este o abilitate de bază!'
          : '✍️ Verifică dacă media este rotunjită corect la 9.5 folosind f-string.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 15. BUCLE IMBRICATE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'nested-loops',
    title: 'Bucle Imbricate',
    icon: '🌀',
    concept: `
      <h3>📖 Bucle în bucle</h3>
      <p>Când plasezi o buclă în interiorul altei bucle, se numește buclă imbricată. Pentru fiecare pas al buclei exterioare, bucla interioară se execută complet.</p>
    `,
    example: `# Buclă în buclă
for i in range(2):
    for j in range(3):
        print(f"i={i}, j={j}")`,
    gameExample: `# Exemplu: Desenarea unei hărți 3x3
for rand in range(3):
    for col in range(3):
        print("🟩", end="")
    print()`,
    task: `🌀 Desenează un triunghi de stele folosind bucle imbricate!
Bucla exterioară trebuie să meargă de la 1 la 5 inclusiv, iar bucla interioară să printeze stele pe același rând.
Rezultatul ar trebui să fie:
<pre>*
**
***
****
*****</pre>
(Sugestie: folosește <code>print("*", end="")</code> în bucla internă și un <code>print()</code> simplu în cea externă pentru rând nou)`,
    solution: `for i in range(1, 6):
    for j in range(i):
        print("*", end="")
    print()`,
    xp: 115,
    starterCode: `# Desenează triunghiul de stele\n`,
    validator: (output) => {
      const linii = output.trim().split('\n').filter(l => l.trim().length > 0);
      const passed = linii.length >= 5 && linii[0].includes('*') && linii[4].includes('*****');
      return {
        pass: passed,
        message: passed
          ? '🌀 Perfect! Ai generat triunghiul cu succes!'
          : '🌀 Triunghiul nu are dimensiunile corecte. Verifică limitele range().'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 16. ȘIRURI DE CARACTERE AVANSATE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'strings-advanced',
    title: 'Șiruri Avansate',
    icon: '🔠',
    concept: `
      <h3>📖 Tehnici avansate cu text</h3>
      <p>Poți folosi <code>join()</code> pentru a uni o listă într-un text sau felierea <code>[:: -1]</code> pentru a inversa caracterele.</p>
    `,
    example: `# Split și join
cuvinte = ["Ana", "are", "mere"]
propozitie = "-".join(cuvinte)
print(propozitie)  # "Ana-are-mere"
print(propozitie[::-1]) # "erem-era-anA"`,
    gameExample: `# Exemplu: Mesaj secret
mesaj = "SALUT"
inversat = mesaj[::-1]
print("Mesaj codat:", inversat) # "TULAS"`,
    task: `🕵️ Propoziția secretă!
Pornind de la textul: <code>propozitie = "Ana are mere si pere"</code>
1. Împarte propoziția în cuvinte cu <code>.split()</code> și afișează numărul de cuvinte cu <code>len()</code>
2. Unește cuvintele folosind separatorul <code>" | "</code> și afișează rezultatul
3. Inversează propoziția completă (folosind felierea <code>[::-1]</code>) și afișeaz-o`,
    solution: `propozitie = "Ana are mere si pere"
cuvinte = propozitie.split()
print(len(cuvinte))
print(" | ".join(cuvinte))
print(propozitie[::-1])`,
    xp: 95,
    starterCode: `propozitie = "Ana are mere si pere"\n# Scrie codul tău\n`,
    validator: (output) => {
      const hasCount = output.includes('5');
      const hasJoin = output.includes('|');
      const hasReverse = output.includes('erep') || output.includes('ereM');
      const passed = hasCount && hasJoin && hasReverse;
      return {
        pass: passed,
        message: passed
          ? '🕵️ Grozav! Ai decodificat și reconstruit propoziția!'
          : '🔠 Verifică operațiile split, join și felierea inversă.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 17. DOMENIU (SCOPE) & VARIABILE GLOBALE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'scope',
    title: 'Domeniu & Global',
    icon: '🌍',
    concept: `
      <h3>📖 Scopul variabilelor</h3>
      <p>Variabilele pot fi locale (există doar într-o funcție) sau globale (există peste tot). Folosește instrucțiunea <code>global</code> pentru a modifica o variabilă globală din interiorul unei funcții.</p>
    `,
    example: `scor = 0

def adauga():
    global scor
    scor += 10

adauga()
print(scor)  # 10`,
    gameExample: `# Exemplu: Contor de monede
monede = 0

def primeste_monede(suma):
    global monede
    monede += suma
    print(f"Monede: {monede}")

primeste_monede(5)
primeste_monede(10)`,
    task: `🏦 Creează un cont bancar simplu!
1. Definește variabila globală <code>sold</code> cu valoarea <code>100</code>
2. Creează funcția <code>depune(suma)</code> care adaugă suma la soldul global și afișează noul sold
3. Creează funcția <code>retrage(suma)</code> care, dacă soldul este suficient, scade suma din el, altfel afișează <code>"Fonduri insuficiente!"</code>
4. Apelează <code>depune(50)</code>, <code>retrage(30)</code> și apoi <code>retrage(200)</code>`,
    solution: `sold = 100

def depune(suma):
    global sold
    sold += suma
    print(sold)

def retrage(suma):
    global sold
    if sold >= suma:
        sold -= suma
        print(sold)
    else:
        print("Fonduri insuficiente!")

depune(50)
retrage(30)
retrage(200)`,
    xp: 120,
    starterCode: `sold = 100\n# Definește funcțiile bancare\n`,
    validator: (output) => {
      const hasDep = output.includes('150');
      const hasRet = output.includes('120');
      const hasErr = output.includes('insuficiente') || output.includes('Fonduri');
      const passed = hasDep && hasRet && hasErr;
      return {
        pass: passed,
        message: passed
          ? '🏦 Bancher de succes! Variabilele globale sunt acum clare!'
          : '🌍 Verifică soldul după depunere și retragere.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 18. FUNCȚII LAMBDA
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'lambda',
    title: 'Funcții Lambda',
    icon: '⚡',
    concept: `
      <h3>📖 Funcții Lambda</h3>
      <p>Sunt funcții simple definite pe o singură linie de cod, fără un nume asociat în mod tradițional.</p>
      <p>Sintaxă: <code>lambda arg1, arg2: expresie</code></p>
    `,
    example: `# Lambda simplu
dublu = lambda x: x * 2
print(dublu(5))  # 10`,
    gameExample: `# Exemplu: Sortare după puncte
clasament = [("Erou", 90), ("Monstru", 40), ("Zână", 75)]
sortati = sorted(clasament, key=lambda p: p[1])
print(sortati)`,
    task: `Sortează și filtrează date:
Ai o listă de numere: <code>puncte = [45, 12, 87, 23, 67, 9, 55]</code>
1. Sortează lista descrescător folosind <code>sorted()</code> și afișeaz-o
2. Creează o listă numită <code>mari</code> care conține doar numerele din listă mai mari de 50 folosind <code>filter()</code> și o funcție lambda. Printează lista <code>mari</code>
3. Creează o listă numită <code>triplicate</code> unde fiecare număr din <code>puncte</code> este înmulțit cu 3 folosind <code>map()</code> și o funcție lambda. Printează lista <code>triplicate</code>`,
    solution: `puncte = [45, 12, 87, 23, 67, 9, 55]
print(sorted(puncte, reverse=True))
mari = list(filter(lambda x: x > 50, puncte))
print(mari)
triplicate = list(map(lambda x: x * 3, puncte))
print(triplicate)`,
    xp: 130,
    starterCode: `puncte = [45, 12, 87, 23, 67, 9, 55]\n# Codul tău aici\n`,
    validator: (output) => {
      const hasSorted = output.includes('87') && output.includes('12');
      const hasFiltered = output.includes('87') || output.includes('67') || output.includes('55');
      const hasTripled = output.includes('261') || output.includes('135');
      const passed = hasSorted && hasFiltered && hasTripled;
      return {
        pass: passed,
        message: passed
          ? 'Bine! Codul este corect și concis.'
          : '⚡ Asigură-te că utilizezi corect lambda împreună cu filter și map.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 19. RECURSIVITATE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'recursion',
    title: 'Recursivitate',
    icon: '🪞',
    concept: `
      <h3>📖 Funcții recursive</h3>
      <p>Recursivitatea este tehnica prin care o funcție se apelează pe ea însăși. Orice funcție recursivă are nevoie de un <strong>caz de bază</strong> pentru a se opri, altfel va rula la infinit!</p>
    `,
    example: `# Numărătoare recursivă
def numara(n):
    if n <= 0:
        print("Stop!")
        return
    print(n)
    numara(n - 1)

numara(3)`,
    gameExample: `# Exemplu: Ecoul unei peșteri
def ecou(cuvant, repetari):
    if repetari <= 0:
        return ""
    print(cuvant)
    ecou(cuvant, repetari - 1)

ecou("HOU!", 3)`,
    task: `🔢 Calculează șirul Fibonacci!
Șirul Fibonacci începe cu 0 și 1, iar fiecare număr următor este suma celor două dinaintea lui: 0, 1, 1, 2, 3, 5, 8, 13...
1. Creează funcția recursivă <code>fib(n)</code>
   - Cazul de bază: dacă n <= 0, returnează 0. Dacă n == 1, returnează 1
   - Pasul recursiv: returnează <code>fib(n-1) + fib(n-2)</code>
2. Folosește o buclă pentru a afișa primele 8 elemente din șir (de la fib(0) la fib(7)) pe rânduri separate`,
    solution: `def fib(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)

for i in range(8):
    print(fib(i))`,
    xp: 150,
    starterCode: `# Scrie funcția recursivă fib(n)\n`,
    validator: (output) => {
      const linii = output.trim().split('\n').map(l => l.trim());
      const expected = ['0', '1', '1', '2', '3', '5', '8', '13'];
      const passed = expected.every(val => linii.includes(val));
      return {
        pass: passed,
        message: passed
          ? '🪞 Uimitor! Ai descifrat secretul recursivității!'
          : '🔢 Rezultatele Fibonacci nu corespund. Ar trebui să ai valorile 0, 1, 1, 2, 3, 5, 8, 13.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 20. CLASE & OBIECTE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'classes',
    title: 'Clase & Obiecte',
    icon: '🏗️',
    concept: `
      <h3>📖 Programarea Orientată pe Obiecte (OOP)</h3>
      <p>O <strong>clasă</strong> este un șablon pentru a crea obiecte, iar un <strong>obiect</strong> este o instanță a clasei. Constructorul <code>__init__</code> este apelat automat la crearea obiectului.</p>
    `,
    example: `# Creare clasă
class Caine:
    def __init__(self, nume):
        self.nume = nume
    def latra(self):
        print(f"{self.nume} spune Ham!")

rex = Caine("Rex")
rex.latra()`,
    gameExample: `# Exemplu: Proprietăți personaj
class Erou:
    def __init__(self, nume, hp):
        self.nume = nume
        self.hp = hp
    def status(self):
        print(f"{self.nume} are {self.hp} puncte de viață")

vrajitor = Erou("Gandalf", 80)
vrajitor.status()`,
    task: `🚗 Modelează o mașină!
1. Creează clasa <code>Masina</code>
2. Adaugă constructorul <code>__init__(self, marca, model, viteza_max)</code>
3. Adaugă metoda <code>descriere(self)</code> care afișează: <code>"Mașina [marca] [model] merge cu [viteza_max] km/h"</code>
4. Adaugă metoda <code>este_rapida(self)</code> care returnează <code>True</code> dacă viteza_max >= 200, altfel <code>False</code>
5. Creează o mașină rapidă și afișează descrierea și dacă este rapidă`,
    solution: `class Masina:
    def __init__(self, marca, model, viteza_max):
        self.marca = marca
        self.model = model
        self.viteza_max = viteza_max
    def descriere(self):
        print(f"Mașina {self.marca} {self.model} merge cu {self.viteza_max} km/h")
    def este_rapida(self):
        return self.viteza_max >= 200

m = Masina("Ferrari", "F40", 324)
m.descriere()
print(m.este_rapida())`,
    xp: 160,
    starterCode: `# Scrie clasa Masina aici\n`,
    validator: (output) => {
      const hasCar = output.includes('Mașina') || output.includes('Masina') || output.includes('Ferrari');
      const hasSpeed = output.includes('324');
      const hasFast = output.includes('True');
      const passed = hasCar && hasSpeed && hasFast;
      return {
        pass: passed,
        message: passed
          ? '🏗️ Grozav! Ai creat prima ta structură orientată pe obiecte!'
          : '🚗 Asigură-te că mașina are descrierea completă și returnează True.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 21. PROCESARE DE DATE (SIMULARE FIȘIER)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'file-simulation',
    title: 'Date & Procesare',
    icon: '📁',
    concept: `
      <h3>📖 Procesare de text și date</h3>
      <p>În viața reală, datele vin din fișiere externe. Putem simula citirea unui fișier transformând un text pe mai multe rânduri într-o listă de rânduri cu <code>split("\\n")</code>.</p>
    `,
    example: `# Procesare text multilinie
date = """Gigel,10\\nMaria,15"""
for rand in date.split("\\n"):
    parti = rand.split(",")
    print(f"Nume: {parti[0]}, Scor: {parti[1]}")`,
    gameExample: `# Exemplu: Scoruri dintr-un fișier
date_joc = """Erou1,3000\\nErou2,4500"""
for linie in date_joc.split("\\n"):
    if linie.strip():
        nume, scor = linie.split(",")
        print(f"Jucător: {nume} -> Scor: {scor}")`,
    task: `📊 Analizatorul de note!
Pornind de la textul definit în editorul de cod:
1. Parcurge fiecare rând din <code>date_elevi</code>
2. Separă numele și nota folosind <code>.split(",")</code>
3. Calculează suma notelor și media lor
4. Afișează fiecare elev sub forma: <code>"[nume]: nota [nota]"</code>
5. La final, afișează media clasei rotunjită la o zecimală: <code>"Media clasei: [medie]"</code> (Așteptat: 8.6)`,
    solution: `date_elevi = """Ana,9\\nBob,7\\nMaria,10\\nIon,8\\nElena,9"""

total = 0
numar = 0

for rand in date_elevi.split("\\n"):
    if rand.strip():
        parti = rand.split(",")
        nume = parti[0]
        nota = int(parti[1])
        print(f"{nume}: nota {nota}")
        total += nota
        numar += 1

medie = total / numar
print(f"Media clasei: {medie:.1f}")`,
    xp: 140,
    starterCode: `date_elevi = """Ana,9\\nBob,7\\nMaria,10\\nIon,8\\nElena,9"""\n# Procesează notele\n`,
    validator: (output) => {
      const hasAvg = output.includes('8.6') || output.includes('8,6') || output.includes('Media clasei');
      const hasNames = output.includes('Ana') && output.includes('Elena');
      const passed = hasAvg && hasNames;
      return {
        pass: passed,
        message: passed
          ? '📁 Excelent! Ai prelucrat fișierul de date exact ca un profesionist!'
          : '📊 Verifică dacă afișezi notele tuturor elevilor și media clasei este 8.6.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 22. GENERATOARE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'generators',
    title: 'Generatoare',
    icon: '⚙️',
    concept: `
      <h3>📖 Generatoare de date</h3>
      <p>Generatoarele produc valori una câte una, la cerere, folosind instrucțiunea <code>yield</code> în loc de <code>return</code>. Aceasta economisește memorie când lucrăm cu volume mari de date.</p>
    `,
    example: `# Generator simplu
def numere_pana_la(maxim):
    n = 1
    while n <= maxim:
        yield n
        n += 1

for valoare in numere_pana_la(3):
    print(valoare)  # Afișează 1, apoi 2, apoi 3`,
    gameExample: `# Exemplu: Generator nelimitat
def gen_inamici():
    contor = 1
    while True:
        yield f"Goblin #{contor}"
        contor += 1

g = gen_inamici()
print(next(g))  # Goblin #1
print(next(g))  # Goblin #2`,
    task: `🔢 Creatorul de numere pare!
1. Creează un generator numit <code>numere_pare(n)</code> care produce primele <code>n</code> numere pare începând de la 0 (adică 0, 2, 4, 6...)
2. Creează un alt generator numit <code>fibonacci_gen(n)</code> care generează primele <code>n</code> numere din șirul Fibonacci
3. Afișează cele 5 numere pare generate sub formă de listă cu <code>print(list(numere_pare(5)))</code>
4. Afișează primele 7 numere Fibonacci sub formă de listă cu <code>print(list(fibonacci_gen(7)))</code>`,
    solution: `def numere_pare(n):
    for i in range(n):
        yield i * 2

def fibonacci_gen(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

print(list(numere_pare(5)))
print(list(fibonacci_gen(7)))`,
    xp: 145,
    starterCode: `# Definește generatoarele pare și fibonacci\n`,
    validator: (output) => {
      const hasPare = output.includes('[0, 2, 4, 6, 8]');
      const hasFib = output.includes('[0, 1, 1, 2, 3, 5, 8]');
      const passed = hasPare && hasFib;
      return {
        pass: passed,
        message: passed
          ? '⚙️ Minunat! Generatoarele tale livrează date pe bandă rulantă!'
          : '🔢 Asigură-te că afișezi listele corecte pentru ambele generatoare.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 23. DECORATORI
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'decorators',
    title: 'Decoratori',
    icon: '🎀',
    concept: `
      <h3>📖 Decoratori</h3>
      <p>Un decorator este o funcție care modifică comportamentul unei alte funcții, adăugând acțiuni înainte sau după execuția acesteia, fără a-i schimba codul sursă direct. Se aplică cu prefixul <code>@</code>.</p>
    `,
    example: `def decorator_salut(functie):
    def wrapper():
        print("Bună!")
        functie()
        print("La revedere!")
    return wrapper

@decorator_salut
def spune_nume():
    print("Sunt Gigel.")

spune_nume()`,
    gameExample: `# Exemplu: Jurnalizare a funcțiilor
def log_atac(func):
    def wrapper(*args):
        print("[LOG] Începe lupta!")
        func(*args)
        print("[LOG] Luptă finalizată!")
    return wrapper

@log_atac
def loveste(putere):
    print(f"Lovitură de {putere} daune!")

loveste(50)`,
    task: `⏱️ Decoratorul de măsurare a timpului!
1. Creează un decorator numit <code>cronometreaza</code> care calculează durata de rulare a unei funcții
2. Folosește modulul <code>time</code> (importă-l în program)
3. Decoratorul trebuie să afișeze la sfârșit: <code>"[TIMP] calcul_lung a rulat în X secunde"</code> (unde X este timpul scurs)
4. Decorează funcția <code>calcul_lung()</code> care simulează o buclă for ce adună numerele de la 0 la 100000.
5. Apelează funcția <code>calcul_lung()</code>`,
    solution: `import time

def cronometreaza(functie):
    def wrapper(*args, **kwargs):
        start = time.time()
        rezultat = functie(*args, **kwargs)
        durata = time.time() - start
        print(f"[TIMP] {functie.__name__} a rulat în {durata:.4f} secunde")
        return rezultat
    return wrapper

@cronometreaza
def calcul_lung():
    total = 0
    for i in range(100000):
        total += i
    return total

calcul_lung()`,
    xp: 155,
    starterCode: `import time\n# Creează decoratorul cronometreaza\n`,
    validator: (output) => {
      const hasTiming = output.includes('secunde') || output.includes('TIMP');
      const hasFuncName = output.includes('calcul_lung');
      const passed = hasTiming && hasFuncName;
      return {
        pass: passed,
        message: passed
          ? '🎀 Felicitări! Ai creat primul tău decorator de performanță!'
          : '🎀 Asigură-te că decoratorul cronometrează corect și afișează numele funcției.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 24. SORTARE & CĂUTARE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'sorting',
    title: 'Sortare & Căutare',
    icon: '🔍',
    concept: `
      <h3>📖 Sortare și Căutare</h3>
      <p>Python oferă funcții încorporate puternice pentru a ordona elementele unei liste (<code>sorted()</code> sau <code>.sort()</code>) și pentru a efectua căutări.</p>
    `,
    example: `# Sortează elementele
numere = [50, 10, 30]
print(sorted(numere))  # [10, 30, 50]
# Căutare rapidă
valori = [1, 2, 3, 4, 5]
print(3 in valori)  # True`,
    gameExample: `# Exemplu: Sortare după puncte de viață
inamici = [
    {"nume": "Zombie", "hp": 50},
    {"nume": "Dragon", "hp": 500},
    {"nume": "Orc", "hp": 150}
]
sortati = sorted(inamici, key=lambda i: i["hp"])
print(sortati)`,
    task: `🏆 Clasamentul competiției!
Ai o listă de jucători cu scorurile lor: <code>jucatori = [("Ana", 850), ("Ion", 1200), ("Maria", 950), ("Vlad", 750), ("Elena", 1100)]</code>. Scrie un program care:
1. Sortează lista de jucători descrescător după scorurile lor
2. Afișează top 3 jucători sub forma: <code>"[nume]: [scor]"</code>
3. Determină și afișează scorul maxim folosind funcția <code>max()</code> (doar valoarea numerică)
4. Determină și afișează scorul minim folosind <code>min()</code>`,
    solution: `jucatori = [("Ana", 850), ("Ion", 1200), ("Maria", 950), ("Vlad", 750), ("Elena", 1100)]
sortati = sorted(jucatori, key=lambda j: j[1], reverse=True)
for i in range(3):
    print(f"{sortati[i][0]}: {sortati[i][1]}")

scoruri = [j[1] for j in jucatori]
print("Max:", max(scoruri))
print("Min:", min(scoruri))`,
    xp: 135,
    starterCode: `jucatori = [("Ana", 850), ("Ion", 1200), ("Maria", 950), ("Vlad", 750), ("Elena", 1100)]\n# Scrie algoritmul de sortare și analiză\n`,
    validator: (output) => {
      const hasTop = output.includes('Ion: 1200') && output.includes('Elena: 1100');
      const hasMinMax = output.includes('1200') && output.includes('750');
      const passed = hasTop && hasMinMax;
      return {
        pass: passed,
        message: passed
          ? '🔍 Excelent! Ești gata să organizezi competiții reale!'
          : '🏆 Asigură-te că afișezi top 3 jucători și valorile maximă/minimă corecte.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 25. COMPREHENSIUNI DE DICȚIONARE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'comprehensions',
    title: 'Comprehensiuni',
    icon: '🧩',
    concept: `
      <h3>📖 Comprehensiuni de dicționare și seturi</h3>
      <p>Similar cu listele, poți folosi comprehensiuni pentru a crea dicționare sau seturi într-o singură linie. Sintaxa pentru dicționare este: <code>{cheie: valoare for item in iterabil if conditie}</code>.</p>
    `,
    example: `# Comprehensiuni
numere = [1, 2, 3]
patrate_dict = {x: x**2 for x in numere}
print(patrate_dict)  # {1: 1, 2: 4, 3: 9}`,
    gameExample: `# Exemplu: Lista de prețuri
produse = ["sabie", "scut", "potiune"]
magazin = {p: len(p) * 10 for p in produse}
print(magazin) # Prețuri bazate pe lungimea numelui`,
    task: `🌈 Fabrica de culori!
Pornind de la lista de culori declarată:
1. Creează o listă numită <code>scurte</code> care să conțină doar culorile care au o lungime strict mai mică de 6 litere, convertite la majuscule (cu <code>.upper()</code>). Printează lista
2. Creează un dicționar numit <code>lungimi</code> care să aibă culorile drept chei, iar lungimea numelui lor drept valori. Printează dicționarul
3. Creează un set numit <code>initiale</code> care conține doar prima literă a fiecărei culori. Printează setul`,
    solution: `culori = ["rosu", "verde", "albastru", "galben", "portocaliu"]
scurte = [c.upper() for c in culori if len(c) < 6]
lungimi = {c: len(c) for c in culori}
initiale = {c[0] for c in culori}
print(scurte)
print(lungimi)
print(initiale)`,
    xp: 130,
    starterCode: `culori = ["rosu", "verde", "albastru", "galben", "portocaliu"]\n# Scrie comprehensiunile\n`,
    validator: (output) => {
      const hasShort = output.includes('ROSU') && output.includes('VERDE');
      const hasDict = output.includes('rosu') && output.includes('4');
      const hasSet = output.includes('r') || output.includes('v') || output.includes('a');
      const passed = hasShort && hasDict && hasSet;
      return {
        pass: passed,
        message: passed
          ? 'Bine! Comprehensiunile sunt corecte.'
          : 'Verifică listele, dicționarul și setul generate.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 26. MOȘTENIRE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'inheritance',
    title: 'Moștenire',
    icon: '👑',
    concept: `
      <h3>📖 Moștenirea claselor</h3>
      <p>Moștenirea (inheritance) permite unei clase noi să preia variabilele și metodele unei clase deja existente. Clasa copil poate adăuga apoi metode proprii sau să le suprascrie pe cele moștenite.</p>
    `,
    example: `class Vehicul:
    def porneste(self):
        print("Vehicul pornit")

class Masina(Vehicul): # Moștenește Vehicul
    def claxoneaza(self):
        print("Beep beep!")

m = Masina()
m.porneste()     # Metodă moștenită!
m.claxoneaza()`,
    gameExample: `# Exemplu: Clase de personaje
class Personaj:
    def __init__(self, nume):
        self.nume = nume
class Vrajitor(Personaj):
    def vraja(self):
        print(f"{self.nume} aruncă o bilă de foc!")

v = Vrajitor("Harry")
v.vraja()`,
    task: `🐾 Creează o structură de clase pentru animale!
1. Clasa părinte <code>Animal</code> cu constructorul <code>__init__(self, nume, sunet)</code> și metoda <code>vorbeste(self)</code> care afișează <code>"[nume]: [sunet]!"</code>
2. Clasa copil <code>Caine(Animal)</code> care apelează constructorul părintelui folosind <code>super().__init__(nume, "Ham Ham")</code>, stochează suplimentar variabila <code>rasa</code> și are metoda <code>aduce_mingea(self)</code> care afișează <code>"Rex aduce mingea!"</code> (sau numele corespunzător)
3. Clasa copil <code>Pisica(Animal)</code> care apelează constructorul părintelui cu <code>"Miau"</code>, stochează suplimentar <code>culoare</code> și are metoda <code>toarce(self)</code> ce printează <code>"Mițu toarce: purrr..."</code>
4. Creează o pisică și un câine și testează-le metodele!`,
    solution: `class Animal:
    def __init__(self, nume, sunet):
        self.nume = nume
        self.sunet = sunet
    def vorbeste(self):
        print(f"{self.nume}: {self.sunet}!")

class Caine(Animal):
    def __init__(self, nume, rasa):
        super().__init__(nume, "Ham Ham")
        self.rasa = rasa
    def aduce_mingea(self):
        print(f"{self.nume} aduce mingea!")

class Pisica(Animal):
    def __init__(self, nume, culoare):
        super().__init__(nume, "Miau")
        self.culoare = culoare
    def toarce(self):
        print(f"{self.nume} toarce: purrr...")

rex = Caine("Rex", "Labrador")
rex.vorbeste()
rex.aduce_mingea()
mitu = Pisica("Mițu", "Negru")
mitu.vorbeste()
mitu.toarce()`,
    xp: 165,
    starterCode: `# Scrie structura claselor Animal, Caine și Pisica\n`,
    validator: (output) => {
      const hasHam = output.includes('Ham Ham');
      const hasMiau = output.includes('Miau');
      const hasPlay = output.includes('aduce mingea') || output.includes('toarce');
      const passed = hasHam && hasMiau && hasPlay;
      return {
        pass: passed,
        message: passed
          ? '👑 Felicitări! Ai înțeles conceptul de moștenire în OOP!'
          : '🐾 Asigură-te că ambele animale scot sunetele specifice și execută activitățile lor.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 27. EXCEPȚII PERSONALIZATE
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'custom-exceptions',
    title: 'Excepții Speciale',
    icon: '🚨',
    concept: `
      <h3>📖 Definirea propriilor erori</h3>
      <p>Poți crea propriile clase de excepții moștenind din clasa de bază <code>Exception</code> pentru a semnala erori logice specifice programului tău.</p>
    `,
    example: `class ValoarePreaMica(Exception):
    pass

def verifica(n):
    if n < 10:
        raise ValoarePreaMica("Valoarea e sub 10!")

try:
    verifica(5)
except ValoarePreaMica as e:
    print(e)`,
    gameExample: `# Exemplu: Gestiune monede
class MonedeInsuficiente(Exception):
    pass

def cumpara(monede, pret):
    if monede < pret:
        raise MonedeInsuficiente("Nu ai destule monede!")
    print("Cumpărat!")

try:
    cumpara(10, 50)
except MonedeInsuficiente as e:
    print(e)`,
    task: `🎮 Creează excepții speciale pentru jocul tău!
1. Definește excepția <code>ScorNegativ(Exception)</code>
2. Definește excepția <code>NivelDepasit(Exception)</code>
3. Scrie funcția <code>actualizeaza_jucator(scor, nivel)</code>:
   - dacă scorul este mai mic de 0, aruncă <code>ScorNegativ("Scorul nu poate fi negativ!")</code>
   - dacă nivelul este mai mare de 100, aruncă <code>NivelDepasit("Nivelul maxim este 100!")</code>
   - altfel afișează <code>"Jucător actualizat"</code>
4. Rulează funcția într-un bloc <code>try/except</code> care prinde ambele erori și le printează mesajele. Testează cu un scor negativ.`,
    solution: `class ScorNegativ(Exception):
    pass
class NivelDepasit(Exception):
    pass

def actualizeaza_jucator(scor, nivel):
    if scor < 0:
        raise ScorNegativ("Scorul nu poate fi negativ!")
    if nivel > 100:
        raise NivelDepasit("Nivelul maxim este 100!")
    print("Jucător actualizat")

try:
    actualizeaza_jucator(-10, 5)
except ScorNegativ as e:
    print(e)
except NivelDepasit as e:
    print(e)`,
    xp: 150,
    starterCode: `# Scrie excepțiile și funcția de actualizare\n`,
    validator: (output) => {
      const passed = output.includes('Scorul nu poate fi negativ') || output.includes('negativ');
      return {
        pass: passed,
        message: passed
          ? '🚨 Excelent! Sistemul tău de erori personalizate funcționează de minune!'
          : '🚨 Aruncă excepția ScorNegativ când scorul primit este mai mic de 0.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 28. JOCUL GHICITURII (MINI-PROIECT)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'mini-project',
    title: '🏆 Proiect Final: Ghicitoarea',
    icon: '🎲',
    concept: `
      <h3>📖 Primul tău proiect complet</h3>
      <p>Felicitări! Ai ajuns la mini-proiectul de final de capitol. Aici vei folosi bucle, condiții și funcții pentru a construi un joc interactiv de ghicit numere.</p>
    `,
    example: `import random
# Ghicirea unui număr între 1 și 10
secret = random.randint(1, 10)
ghicitura = 5
if ghicitura == secret:
    print("Ai ghicit!")
else:
    print("Mai încearcă!")`,
    gameExample: `# Exemplu: Verificare scor
def verifica_scor(incercari):
    if incercari <= 3:
        return "Scor maxim: 100!"
    return "Scor: 50"`,
    task: `🎲 Construiește jocul de ghicit numere!
Cerințe:
1. Creează funcția <code>verifica(ghicitura, secret)</code> care returnează:
   - <code>"Prea mic!"</code> dacă ghicitura < secret
   - <code>"Prea mare!"</code> dacă ghicitura > secret
   - <code>"Ai ghicit!"</code> dacă ghicitura == secret
2. Creează funcția <code>calculeaza_scor(incercari)</code> care returnează 100 de puncte dacă încercările sunt <= 3, altfel returnează 50 de puncte
3. Simulează jocul pentru un număr <code>secret = 37</code> și o listă de încercări <code>[25, 37]</code>.
4. Pentru fiecare încercare, afișează feedback-ul funcției <code>verifica</code>, iar la final afișează scorul calculat.`,
    solution: `secret = 37
def verifica(ghicitura, secret):
    if ghicitura < secret:
        return "Prea mic!"
    elif ghicitura > secret:
        return "Prea mare!"
    else:
        return "Ai ghicit!"

def calculeaza_scor(incercari):
    if incercari <= 3:
        return 100
    return 50

ghicituri = [25, 37]
incercari = 0
for g in ghicituri:
    incercari += 1
    rezultat = verifica(g, secret)
    print(f"Ghicesc {g}: {rezultat}")
    if rezultat == "Ai ghicit!":
        break

print("Scor:", calculeaza_scor(incercari))`,
    xp: 300,
    starterCode: `secret = 37\nghicituri = [25, 37]\n# Scrie logica jocului de ghicit\n`,
    validator: (output) => {
      const hasSmall = output.includes('Prea mic!') || output.includes('mic');
      const hasWin = output.includes('Ai ghicit!');
      const hasScore = output.includes('100') || output.includes('Scor');
      const passed = hasSmall && hasWin && hasScore;
      return {
        pass: passed,
        message: passed
          ? '🏆 Felicitări deosebite! Ai construit jocul tău complet! Ești un programator de nota 10!'
          : '🎲 Verifică dacă afișezi feedback-urile "Prea mic!" și "Ai ghicit!" și scorul 100.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 29. MODULE STANDARD (NOU)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'modules',
    title: 'Module Standard',
    icon: '🔌',
    concept: `
      <h3>📖 Module în Python</h3>
      <p>Modulele sunt fișiere gata scrise de alți programatori care conțin funcții utile. Le poți adăuga în codul tău folosind instrucțiunea <code>import</code>.</p>
      <ul>
        <li><code>import math</code>: conține funcții matematice avansate, de exemplu: <code>math.ceil()</code> pentru rotunjirea în sus</li>
        <li><code>import random</code>: conține funcții pentru numere aleatoare, de exemplu: <code>random.randint(min, max)</code></li>
      </ul>
    `,
    example: `import math
import random

# Rădăcină pătrată
print(math.sqrt(16))  # 4.0

# Număr la întâmplare
print(random.randint(1, 10))`,
    gameExample: `# Exemplu: Zaruri cu bonus
import random
import math

zar1 = random.randint(1, 6)
zar2 = random.randint(1, 6)
suma = zar1 + zar2
bonus = math.ceil(suma * 0.1)
print(f"Zaruri: {zar1}, {zar2} | Suma finală cu bonus: {suma + bonus}")`,
    task: `🔌 Simulează o luptă cu un monstru folosind module standard!
1. Importă modulele <code>random</code> și <code>math</code>
2. Generează o valoare aleatoare pentru atacul eroului între 15 și 30 folosind <code>random.randint(15, 30)</code> și salvează-o în variabila <code>atac</code>
3. Calculează atacul final rotunjit în sus cu <code>math.ceil()</code> după ce aplici un spor de 15% (înmulțește atacul inițial cu 1.15) și salvează rezultatul în variabila <code>atac_final</code>
4. Afișează: <code>"Eroul lovește cu [atac_final] puncte!"</code>`,
    solution: `import random
import math
atac = random.randint(15, 30)
atac_final = math.ceil(atac * 1.15)
print(f"Eroul lovește cu {atac_final} puncte!")`,
    xp: 140,
    starterCode: `# Scrie programul folosind import random și math\n`,
    validator: (output) => {
      const hasText = output.includes('lovește cu') || output.includes('loveste cu');
      const hasNumber = /\d+/.test(output);
      const passed = hasText && hasNumber;
      return {
        pass: passed,
        message: passed
          ? '🔌 Genial! Ai învățat cum să utilizezi modulele standard math și random!'
          : '🔌 Asigură-te că afișezi atacul calculat în formatul cerut.'
      };
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // 30. BUBBLE SORT (NOU)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'bubble-sort',
    title: 'Algoritmul Bulelor',
    icon: '🫧',
    concept: `
      <h3>📖 Ce este Bubble Sort?</h3>
      <p>Algoritmul bulelor (Bubble Sort) este un mod de a ordona elementele unei liste. El compară elementele vecine și le schimbă locul dacă nu sunt în ordinea corectă. Numerele mari se ridică la capăt precum bulele de săpun!</p>
    `,
    example: `# Sortează o listă simplă
numere = [5, 2, 9, 1]
n = len(numere)
for i in range(n):
    for j in range(0, n - i - 1):
        if numere[j] > numere[j+1]:
            numere[j], numere[j+1] = numere[j+1], numere[j]
print(numere)  # [1, 2, 5, 9]`,
    gameExample: `# Exemplu: Sortare obiecte după greutate
bomboane = [{"nume": "Menta", "g": 12}, {"nume": "Jelly", "g": 5}, {"nume": "Choco", "g": 20}]
n = len(bomboane)
for i in range(n):
    for j in range(0, n - i - 1):
        if bomboane[j]["g"] > bomboane[j+1]["g"]:
            bomboane[j], bomboane[j+1] = bomboane[j+1], bomboane[j]
print(bomboane)`,
    task: `🫧 Ordonează baloanele cu aer cald după înălțime!
Ai o listă de înălțimi: <code>inaltimi = [120, 85, 300, 150, 50]</code>
1. Implementează algoritmul Bubble Sort pentru a le ordona crescător
2. Printează lista ordonată la final cu <code>print(inaltimi)</code>

Rezultat așteptat: <code>[50, 85, 120, 150, 300]</code>`,
    solution: `inaltimi = [120, 85, 300, 150, 50]
n = len(inaltimi)
for i in range(n):
    for j in range(0, n - i - 1):
        if inaltimi[j] > inaltimi[j+1]:
            inaltimi[j], inaltimi[j+1] = inaltimi[j+1], inaltimi[j]
print(inaltimi)`,
    xp: 180,
    starterCode: `inaltimi = [120, 85, 300, 150, 50]\n# Sortează lista crescător folosind Bubble Sort\n`,
    validator: (output) => {
      const passed = output.includes('[50, 85, 120, 150, 300]') || output.includes('50, 85, 120, 150, 300');
      return {
        pass: passed,
        message: passed
          ? '🫧 Excelent! Ai stăpânit algoritmul Bubble Sort! Ești un programator priceput! 🎉🐍🚀'
          : '🫧 Verifică algoritmul. Rezultatul final trebuie să fie exact [50, 85, 120, 150, 300].'
      };
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CURRICULUM };
}