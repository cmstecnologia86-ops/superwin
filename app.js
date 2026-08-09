const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const roulettePanel = document.getElementById('roulettePanel');
const challengePanel = document.getElementById('challengePanel');
const finalPanel = document.getElementById('finalPanel');
const modeButtons = [...document.querySelectorAll('.mode-btn')];
const modeLabel = document.getElementById('modeLabel');
const modeMessage = document.getElementById('modeMessage');
const jumpBadge = document.getElementById('jumpBadge');
const jumpLegend = document.getElementById('jumpLegend');
const challengeIcon = document.getElementById('challengeIcon');
const challengeCategory = document.getElementById('challengeCategory');
const challengeDescription = document.getElementById('challengeDescription');
const challengePrompt = document.getElementById('challengePrompt');
const answerText = document.getElementById('answerText');
const showAnswerBtn = document.getElementById('showAnswerBtn');
const doneBtn = document.getElementById('doneBtn');
const rulesBtn = document.getElementById('rulesBtn');
const rulesDialog = document.getElementById('rulesDialog');
const closeRulesBtn = document.getElementById('closeRulesBtn');
const startFinalBtn = document.getElementById('startFinalBtn');
const finalQuestionBox = document.getElementById('finalQuestionBox');
const finalQuestion = document.getElementById('finalQuestion');
const finalOptions = document.getElementById('finalOptions');
const finalFeedback = document.getElementById('finalFeedback');
const nextFinalBtn = document.getElementById('nextFinalBtn');

const COLORS = {
  'Adivina': '#f33f4b',
  'Mímica': '#f2bd20',
  'Dibuja': '#39b86a',
  'Pregunta': '#17a8e8',
  'Flash Win': '#7c4bd4',
  'Súper Salto': '#ff7a00'
};

const ICONS = {
  'Adivina': '🕵️',
  'Mímica': '🎭',
  'Dibuja': '✏️',
  'Pregunta': '❓',
  'Flash Win': '⚡',
  'Súper Salto': '🚀'
};

const DESCRIPTIONS = {
  'Adivina': 'Lee la pista en español y responde con la palabra o frase correcta en inglés.',
  'Mímica': 'Haz la acción sin hablar. Los demás deben decir en inglés qué parte del cuerpo duele o qué malestar tienes.',
  'Dibuja': 'Haz el dibujo indicado. Los demás deben identificar en inglés la parte del cuerpo o el malestar.',
  'Pregunta': 'Lee la pregunta en español y responde con la palabra o frase correcta en inglés.',
  'Flash Win': 'Saca una carta Flash Win y úsala para practicar el vocabulario y las frases de la Unidad 5.',
  'Súper Salto': '¡Conseguiste el Súper Salto! Avanza directamente desde la casilla 35 hasta la 38.'
};

const NORMAL_SEGMENTS = [
  'Adivina', 'Mímica', 'Dibuja', 'Pregunta', 'Flash Win',
  'Adivina', 'Mímica', 'Dibuja', 'Pregunta', 'Flash Win'
];

const JUMP_SEGMENTS = [
  'Adivina', 'Mímica', 'Dibuja', 'Pregunta', 'Flash Win', 'Súper Salto'
];

// Banco enfocado en lo que aparece realmente en las páginas trabajadas de la Unidad 5:
// body parts, illnesses, What’s the matter?, hurts, have got / has got y must / mustn’t.
const challengeBank = {
  'Adivina': [
    { prompt: 'La usas para ver. ¿Cómo se dice “ojo” en inglés?', answer: 'eye' },
    { prompt: 'La usas para escuchar. ¿Cómo se dice “oreja” en inglés?', answer: 'ear' },
    { prompt: 'La usas para comer y hablar. ¿Cómo se dice “boca” en inglés?', answer: 'mouth' },
    { prompt: 'Está sobre tus ojos y puede ser corto o largo. ¿Cómo se dice “pelo” en inglés?', answer: 'hair' },
    { prompt: 'Está entre el cuello y el brazo. ¿Cómo se dice “hombro” en inglés?', answer: 'shoulder' },
    { prompt: 'La usas para tomar objetos. ¿Cómo se dice “mano” en inglés?', answer: 'hand' },
    { prompt: 'Está entre el hombro y la mano. ¿Cómo se dice “brazo” en inglés?', answer: 'arm' },
    { prompt: 'La usas para caminar y correr. ¿Cómo se dice “pierna” en inglés?', answer: 'leg' },
    { prompt: 'Está al final de la pierna. ¿Cómo se dice “pie” en inglés?', answer: 'foot' },
    { prompt: 'Está dentro de tu boca y lo cepillas. ¿Cómo se dice “diente” en inglés?', answer: 'tooth' },
    { prompt: 'Si te duele la cabeza, ¿cómo se dice “dolor de cabeza” en inglés?', answer: 'a headache' },
    { prompt: 'Si te duele una muela, ¿cómo se dice “dolor de muela” en inglés?', answer: 'a toothache' },
    { prompt: 'Si te duele el estómago, ¿cómo se dice “dolor de estómago” en inglés?', answer: 'a stomach-ache' },
    { prompt: 'Si estás resfriado, ¿cómo se dice “resfrío” en inglés?', answer: 'a cold' },
    { prompt: 'Si estás tosiendo, ¿cómo se dice “tos” en inglés?', answer: 'a cough' },
    { prompt: 'Si estás muy caliente y tienes fiebre, ¿qué expresión usa el libro?', answer: 'a temperature' },
    { prompt: 'Si te duele la espalda, ¿cómo se dice “dolor de espalda” en inglés?', answer: 'a backache' },
    { prompt: 'Si te duele el oído, ¿cómo se dice “dolor de oído” en inglés?', answer: 'an earache' }
  ],

  'Mímica': [
    { prompt: 'Haz como si te doliera la cabeza. Los demás deben decir la frase en inglés.', answer: 'I’ve got a headache. / My head hurts.' },
    { prompt: 'Haz como si te doliera una muela. Los demás deben decir la frase en inglés.', answer: 'I’ve got a toothache. / My tooth hurts.' },
    { prompt: 'Haz como si te doliera el estómago. Los demás deben decir la frase en inglés.', answer: 'I’ve got a stomach-ache. / My stomach hurts.' },
    { prompt: 'Haz como si estuvieras tosiendo. Los demás deben decir el malestar en inglés.', answer: 'I’ve got a cough.' },
    { prompt: 'Haz como si estuvieras resfriado y sonándote la nariz. Los demás deben decirlo en inglés.', answer: 'I’ve got a cold.' },
    { prompt: 'Haz como si tuvieras fiebre y mucho calor. Los demás deben decirlo en inglés.', answer: 'I’ve got a temperature.' },
    { prompt: 'Haz como si te doliera la espalda. Los demás deben decir el malestar en inglés.', answer: 'I’ve got a backache. / My back hurts.' },
    { prompt: 'Haz como si te doliera el oído. Los demás deben decir el malestar en inglés.', answer: 'I’ve got an earache. / My ear hurts.' },
    { prompt: 'Haz como si te doliera el ojo y no pudieras leer. Los demás deben formar la frase en inglés.', answer: 'My eye hurts. I can’t read.' },
    { prompt: 'Haz como si te doliera el pie y no pudieras patear una pelota. Los demás deben formar la frase en inglés.', answer: 'My foot hurts. I can’t kick the ball.' },
    { prompt: 'Haz como si te doliera la pierna y no pudieras andar en bicicleta. Los demás deben formar la frase en inglés.', answer: 'My leg hurts. I can’t ride my bike.' },
    { prompt: 'Haz como si te doliera el brazo y no pudieras jugar tenis. Los demás deben formar la frase en inglés.', answer: 'My arm hurts. I can’t play tennis.' },
    { prompt: 'Haz como si te doliera la mano y no pudieras atrapar una pelota. Los demás deben formar la frase en inglés.', answer: 'My hand hurts. I can’t catch the ball.' }
  ],

  'Dibuja': [
    { prompt: 'Dibuja una cabeza. Los demás deben decir la palabra en inglés.', answer: 'head' },
    { prompt: 'Dibuja un ojo. Los demás deben decir la palabra en inglés.', answer: 'eye' },
    { prompt: 'Dibuja una oreja. Los demás deben decir la palabra en inglés.', answer: 'ear' },
    { prompt: 'Dibuja una boca. Los demás deben decir la palabra en inglés.', answer: 'mouth' },
    { prompt: 'Dibuja una nariz. Los demás deben decir la palabra en inglés.', answer: 'nose' },
    { prompt: 'Dibuja una mano. Los demás deben decir la palabra en inglés.', answer: 'hand' },
    { prompt: 'Dibuja un brazo. Los demás deben decir la palabra en inglés.', answer: 'arm' },
    { prompt: 'Dibuja una pierna. Los demás deben decir la palabra en inglés.', answer: 'leg' },
    { prompt: 'Dibuja un pie. Los demás deben decir la palabra en inglés.', answer: 'foot' },
    { prompt: 'Dibuja a alguien con dolor de cabeza. Los demás deben decir el malestar en inglés.', answer: 'a headache' },
    { prompt: 'Dibuja a alguien con dolor de muela. Los demás deben decir el malestar en inglés.', answer: 'a toothache' },
    { prompt: 'Dibuja a alguien con dolor de estómago. Los demás deben decir el malestar en inglés.', answer: 'a stomach-ache' },
    { prompt: 'Dibuja a alguien resfriado. Los demás deben decir el malestar en inglés.', answer: 'a cold' },
    { prompt: 'Dibuja a alguien tosiendo. Los demás deben decir el malestar en inglés.', answer: 'a cough' },
    { prompt: 'Dibuja una persona completa y escribe 5 partes del cuerpo en inglés.', answer: 'Ejemplos: head, eye, ear, mouth, nose, hand, arm, leg, foot.' }
  ],

  'Pregunta': [
    { prompt: '¿Cómo se dice “cabeza” en inglés?', answer: 'head' },
    { prompt: '¿Cómo se dice “ojo” en inglés?', answer: 'eye' },
    { prompt: '¿Cómo se dice “oreja” en inglés?', answer: 'ear' },
    { prompt: '¿Cómo se dice “boca” en inglés?', answer: 'mouth' },
    { prompt: '¿Cómo se dice “nariz” en inglés?', answer: 'nose' },
    { prompt: '¿Cómo se dice “pelo” en inglés?', answer: 'hair' },
    { prompt: '¿Cómo se dice “hombro” en inglés?', answer: 'shoulder' },
    { prompt: '¿Cómo se dice “espalda” en inglés?', answer: 'back' },
    { prompt: '¿Cómo se dice “estómago” en inglés?', answer: 'stomach' },
    { prompt: '¿Cómo se dice “mano” en inglés?', answer: 'hand' },
    { prompt: '¿Cómo se dice “brazo” en inglés?', answer: 'arm' },
    { prompt: '¿Cómo se dice “pierna” en inglés?', answer: 'leg' },
    { prompt: '¿Cómo se dice “pie” en inglés?', answer: 'foot' },
    { prompt: '¿Cómo se dice “diente” en inglés?', answer: 'tooth' },
    { prompt: 'Completa la pregunta del libro: “What’s the ______?”', answer: 'matter' },
    { prompt: '¿Cómo preguntas en inglés “¿Qué te pasa?”?', answer: 'What’s the matter?' },
    { prompt: '¿Cómo dices “Me duele el ojo” en inglés?', answer: 'My eye hurts.' },
    { prompt: '¿Cómo dices “Me duele el pie” en inglés?', answer: 'My foot hurts.' },
    { prompt: '¿Cómo dices “Me duele la pierna” en inglés?', answer: 'My leg hurts.' },
    { prompt: '¿Cómo dices “Me duele el brazo” en inglés?', answer: 'My arm hurts.' },
    { prompt: '¿Cómo dices “Me duele la mano” en inglés?', answer: 'My hand hurts.' },
    { prompt: 'Completa: “I’ve got a ______.” si tienes dolor de cabeza.', answer: 'headache' },
    { prompt: 'Completa: “I’ve got a ______.” si tienes dolor de muela.', answer: 'toothache' },
    { prompt: 'Completa: “I’ve got a ______.” si tienes dolor de estómago.', answer: 'stomach-ache' },
    { prompt: 'Completa: “I’ve got a ______.” si tienes tos.', answer: 'cough' },
    { prompt: 'Completa: “I’ve got a ______.” si estás resfriado.', answer: 'cold' },
    { prompt: 'Completa: “She’s got a ______.” si Stella tiene fiebre.', answer: 'temperature' },
    { prompt: 'Elige la estructura correcta para “Él tiene tos”: He’s got / She’s got / They’ve got.', answer: 'He’s got a cough.' },
    { prompt: 'Elige la estructura correcta para “Ella tiene fiebre”: He’s got / She’s got / They’ve got.', answer: 'She’s got a temperature.' },
    { prompt: 'Elige la estructura correcta para “Ellos tienen resfrío”: He’s got / She’s got / They’ve got.', answer: 'They’ve got a cold.' },
    { prompt: 'Stella está enferma. ¿Cuál es correcto: She must stay in bed / She mustn’t stay in bed?', answer: 'She must stay in bed.' },
    { prompt: 'Stella está enferma. ¿Cuál es correcto: She must drink lots of water / She mustn’t drink water?', answer: 'She must drink lots of water.' },
    { prompt: 'Simon dice que le duele el estómago. ¿Cuál es correcto: He must eat sweets / He mustn’t eat sweets?', answer: 'He mustn’t eat sweets.' },
    { prompt: 'Si te duele el ojo y no puedes leer, completa: “My eye hurts. I can’t ______.”', answer: 'read' },
    { prompt: 'Si te duele el diente y no puedes comer, completa: “My tooth hurts. I can’t ______.”', answer: 'eat' },
    { prompt: 'Si te duele el pie y no puedes patear la pelota, completa: “My foot hurts. I can’t ______ the ball.”', answer: 'kick' },
    { prompt: 'Si te duele la pierna y no puedes andar en bicicleta, completa: “My leg hurts. I can’t ______ my bike.”', answer: 'ride' },
    { prompt: 'Si te duele el brazo y no puedes jugar tenis, completa: “My arm hurts. I can’t ______ tennis.”', answer: 'play' },
    { prompt: 'Si te duele la mano y no puedes atrapar la pelota, completa: “My hand hurts. I can’t ______ the ball.”', answer: 'catch' }
  ],

  'Flash Win': [
    { prompt: 'Saca 1 carta Flash Win. Di la palabra en inglés y después en español.', answer: 'Debes identificar correctamente la palabra de la carta.' },
    { prompt: 'Saca 1 carta Flash Win. Di solamente la palabra correcta en inglés.', answer: 'El adulto comprueba la respuesta con la carta.' },
    { prompt: 'Saca 1 carta Flash Win. Deletrea la palabra en inglés.', answer: 'Debes deletrear correctamente la palabra de la carta.' },
    { prompt: 'Saca 1 carta Flash Win. Si es una parte del cuerpo, forma una frase con “My ___ hurts.”', answer: 'Ej.: My head hurts. / My hand hurts. / My leg hurts.' },
    { prompt: 'Saca 1 carta Flash Win. Si es un malestar, forma una frase con “I’ve got a ___.”', answer: 'Ej.: I’ve got a cold. / I’ve got a headache.' },
    { prompt: 'Saca 1 carta Flash Win. Forma una pregunta y una respuesta usando “What’s the matter?”', answer: 'Ej.: What’s the matter? I’ve got a cough.' },
    { prompt: 'Saca 1 carta Flash Win. Haz una mímica y otro jugador debe decir la palabra en inglés.', answer: 'El punto se gana si identifica correctamente la carta en inglés.' },
    { prompt: 'Saca 1 carta Flash Win. Haz un dibujo y otro jugador debe decir la palabra en inglés.', answer: 'El punto se gana si identifica correctamente la carta en inglés.' },
    { prompt: 'Saca 2 cartas Flash Win y di correctamente las dos palabras en inglés.', answer: 'Debes acertar las dos palabras.' }
  ],

  'Súper Salto': [
    { prompt: '¡SÚPER SALTO! Ya puedes dejar la casilla 35. Mueve tu ficha directamente a la casilla 38.', answer: 'Avanza 35 → 38. Las casillas 36 y 37 no existen.' }
  ]
};

const finalQuestions = [
  {
    question: '¿Cuál es la frase correcta para decir “Me duele el ojo”?',
    options: ['My eye hurts.', 'My ear hurts.', 'My head hurts.'],
    correct: 0
  },
  {
    question: '¿Cuál palabra significa “dolor de cabeza”?',
    options: ['a headache', 'a toothache', 'a backache'],
    correct: 0
  },
  {
    question: '¿Cuál palabra significa “dolor de muela”?',
    options: ['a cold', 'a toothache', 'a cough'],
    correct: 1
  },
  {
    question: '¿Cuál palabra significa “dolor de estómago”?',
    options: ['a stomach-ache', 'an earache', 'a headache'],
    correct: 0
  },
  {
    question: 'Completa correctamente: “What’s the _____?”',
    options: ['matter', 'temperature', 'stomach'],
    correct: 0
  },
  {
    question: 'Stella tiene fiebre. ¿Cuál es la frase correcta?',
    options: ['She’s got a temperature.', 'She’s got a toothache.', 'She’s got a hand.'],
    correct: 0
  },
  {
    question: 'Un niño tiene tos. ¿Cuál es la frase correcta?',
    options: ['He’s got a cough.', 'He’s got a cold foot.', 'He’s got an arm.'],
    correct: 0
  },
  {
    question: '¿Cuál frase significa “Me duele la pierna”?',
    options: ['My leg hurts.', 'My hand hurts.', 'My mouth hurts.'],
    correct: 0
  },
  {
    question: 'Si te duele el pie y no puedes patear la pelota, ¿cuál frase es correcta?',
    options: ['My foot hurts. I can’t kick the ball.', 'My arm hurts. I can’t read.', 'My eye hurts. I can’t catch the ball.'],
    correct: 0
  },
  {
    question: 'Si te duele la mano y no puedes atrapar la pelota, ¿cuál frase es correcta?',
    options: ['My hand hurts. I can’t catch the ball.', 'My foot hurts. I can’t eat.', 'My leg hurts. I can’t read.'],
    correct: 0
  },
  {
    question: 'Stella está enferma. ¿Qué debe hacer?',
    options: ['She must stay in bed.', 'She mustn’t drink water.', 'She must eat lots of sweets.'],
    correct: 0
  },
  {
    question: 'Simon dice que tiene dolor de estómago. ¿Qué es correcto?',
    options: ['He mustn’t eat sweets.', 'He must eat sweets.', 'He mustn’t rest.'],
    correct: 0
  },
  {
    question: '¿Cuál es la traducción correcta de “hombro”?',
    options: ['shoulder', 'stomach', 'back'],
    correct: 0
  },
  {
    question: '¿Cuál es la traducción correcta de “brazo”?',
    options: ['arm', 'leg', 'hand'],
    correct: 0
  },
  {
    question: '¿Cuál es la traducción correcta de “espalda”?',
    options: ['back', 'mouth', 'hair'],
    correct: 0
  },
  {
    question: '¿Cuál frase usa correctamente “They’ve got”?',
    options: ['They’ve got a cold.', 'They’ve got is cold.', 'They has got a cold.'],
    correct: 0
  }
];

let mode = 'normal';
let spinning = false;
let currentRotation = 0;
let currentSegments = NORMAL_SEGMENTS;
let currentChallenge = null;
let lastFinalIndex = -1;

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomFinalQuestion() {
  let index;
  do {
    index = Math.floor(Math.random() * finalQuestions.length);
  } while (finalQuestions.length > 1 && index === lastFinalIndex);
  lastFinalIndex = index;
  return finalQuestions[index];
}

function setMode(nextMode) {
  mode = nextMode;
  challengePanel.classList.add('hidden');
  answerText.classList.add('hidden');
  modeButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));

  if (mode === 'final') {
    roulettePanel.classList.add('hidden');
    finalPanel.classList.remove('hidden');
    resetFinalPanel();
    return;
  }

  finalPanel.classList.add('hidden');
  roulettePanel.classList.remove('hidden');

  if (mode === 'jump') {
    currentSegments = JUMP_SEGMENTS;
    modeLabel.textContent = 'CASILLA 35';
    modeMessage.textContent = 'Gira hasta conseguir el Súper Salto';
    jumpBadge.classList.remove('hidden');
    jumpLegend.classList.remove('hidden');
  } else {
    currentSegments = NORMAL_SEGMENTS;
    modeLabel.textContent = 'CASILLA ?';
    modeMessage.textContent = 'Gira la Ruleta Super Win';
    jumpBadge.classList.add('hidden');
    jumpLegend.classList.add('hidden');
  }

  buildWheel();
}

function buildWheel() {
  wheel.innerHTML = '';
  const angle = 360 / currentSegments.length;
  wheel.style.background = `conic-gradient(${currentSegments.map((cat, i) => `${COLORS[cat]} ${i * angle}deg ${(i + 1) * angle}deg`).join(',')})`;

  const size = wheel.getBoundingClientRect().width || 340;
  const center = size / 2;
  const radius = size * 0.375;

  currentSegments.forEach((category, i) => {
    const label = document.createElement('div');
    label.className = 'wheel-label';
    label.textContent = category;
    const centerAngle = i * angle + angle / 2 - 90;
    const radians = centerAngle * Math.PI / 180;
    label.style.left = `${center + Math.cos(radians) * radius}px`;
    label.style.top = `${center + Math.sin(radians) * radius}px`;
    label.style.transform = `translate(-50%, -50%) rotate(${centerAngle + 90}deg)`;
    wheel.appendChild(label);
  });
}

function showChallenge(category) {
  currentChallenge = randomItem(challengeBank[category]);
  challengeCategory.textContent = category;
  challengeIcon.textContent = ICONS[category];
  challengeIcon.style.background = COLORS[category];
  challengeDescription.textContent = DESCRIPTIONS[category];
  challengePrompt.textContent = currentChallenge.prompt;
  answerText.textContent = currentChallenge.answer;
  answerText.classList.add('hidden');
  challengePanel.classList.remove('hidden');
  challengePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function spin() {
  if (spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  challengePanel.classList.add('hidden');

  const index = Math.floor(Math.random() * currentSegments.length);
  const angle = 360 / currentSegments.length;
  const targetCenter = index * angle + angle / 2;
  const desired = 360 - targetCenter;
  const normalized = ((currentRotation % 360) + 360) % 360;

  let adjustment = desired - normalized;
  if (adjustment < 0) adjustment += 360;

  currentRotation += 360 * 7 + adjustment;
  wheel.style.transform = `rotate(${currentRotation}deg)`;
  const category = currentSegments[index];

  window.setTimeout(() => {
    spinning = false;
    spinBtn.disabled = false;
    showChallenge(category);
  }, 4450);
}

function resetFinalPanel() {
  finalQuestionBox.classList.add('hidden');
  finalFeedback.className = 'final-feedback hidden';
  nextFinalBtn.classList.add('hidden');
  startFinalBtn.classList.remove('hidden');
}

function showFinalQuestion() {
  const item = randomFinalQuestion();
  startFinalBtn.classList.add('hidden');
  nextFinalBtn.classList.add('hidden');
  finalQuestionBox.classList.remove('hidden');
  finalFeedback.className = 'final-feedback hidden';
  finalQuestion.textContent = item.question;
  finalOptions.innerHTML = '';

  item.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.type = 'button';
    btn.textContent = option;

    btn.addEventListener('click', () => {
      [...finalOptions.children].forEach(b => { b.disabled = true; });

      if (index === item.correct) {
        btn.classList.add('correct');
        finalFeedback.textContent = '🏆 ¡SUPER WIN! ¡Respuesta correcta! Ganaste el juego.';
        finalFeedback.className = 'final-feedback win';
      } else {
        btn.classList.add('wrong');
        finalOptions.children[item.correct].classList.add('correct');
        finalFeedback.textContent = 'Casi. Permaneces en la casilla 41. En tu próximo turno puedes intentar otra pregunta final.';
        finalFeedback.className = 'final-feedback retry';
        nextFinalBtn.classList.remove('hidden');
      }
    });

    finalOptions.appendChild(btn);
  });
}

modeButtons.forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));
spinBtn.addEventListener('click', spin);
showAnswerBtn.addEventListener('click', () => answerText.classList.toggle('hidden'));
doneBtn.addEventListener('click', () => {
  challengePanel.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
rulesBtn.addEventListener('click', () => rulesDialog.showModal());
closeRulesBtn.addEventListener('click', () => rulesDialog.close());
rulesDialog.addEventListener('click', event => {
  if (event.target === rulesDialog) rulesDialog.close();
});
startFinalBtn.addEventListener('click', showFinalQuestion);
nextFinalBtn.addEventListener('click', showFinalQuestion);
window.addEventListener('resize', buildWheel);

setMode('normal');
