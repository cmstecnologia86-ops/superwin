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

const NORMAL_SEGMENTS = [
  'Adivina', 'Mímica', 'Dibuja', 'Pregunta', 'Flash Win',
  'Adivina', 'Mímica', 'Dibuja', 'Pregunta', 'Flash Win'
];

const JUMP_SEGMENTS = [
  'Adivina', 'Mímica', 'Dibuja', 'Pregunta', 'Flash Win', 'Súper Salto'
];

// Todo el banco está relacionado con los contenidos de inglés de 3° básico:
// Health / illness, body parts, sports & leisure, have got / has got y must / mustn't.
const challengeBank = {
  'Adivina': [
    { prompt: 'You see with me. What am I?', answer: 'eye = ojo' },
    { prompt: 'You hear with me. What am I?', answer: 'ear = oreja / oído' },
    { prompt: 'You eat and smile with me. What am I?', answer: 'mouth = boca' },
    { prompt: 'I am in your mouth and you brush me. What am I?', answer: 'tooth = diente' },
    { prompt: 'You walk with me. I am at the end of your leg. What am I?', answer: 'foot = pie' },
    { prompt: 'I am between your neck and your arm. What am I?', answer: 'shoulder = hombro' },
    { prompt: 'I can happen when your head hurts. What have you got?', answer: 'a headache = dolor de cabeza' },
    { prompt: 'You cough and your nose may run. What have you got?', answer: 'a cold = resfriado' },
    { prompt: 'Your tooth hurts. What have you got?', answer: 'a toothache = dolor de muela' },
    { prompt: 'Your stomach hurts. What have you got?', answer: 'a stomach-ache = dolor de estómago' },
    { prompt: 'You kick a ball and try to score a goal. What sport is it?', answer: 'football / soccer = fútbol' },
    { prompt: 'You use a racket and hit a ball over a net. What sport is it?', answer: 'tennis = tenis' }
  ],

  'Mímica': [
    { prompt: 'Mime: a cough. Los demás deben decir la palabra en inglés.', answer: 'a cough = tos' },
    { prompt: 'Mime: a headache. Los demás deben decir la palabra en inglés.', answer: 'a headache = dolor de cabeza' },
    { prompt: 'Mime: a toothache. Los demás deben decir la palabra en inglés.', answer: 'a toothache = dolor de muela' },
    { prompt: 'Mime: a stomach-ache. Los demás deben decir la palabra en inglés.', answer: 'a stomach-ache = dolor de estómago' },
    { prompt: 'Mime: a cold. Los demás deben decir la palabra en inglés.', answer: 'a cold = resfriado' },
    { prompt: 'Mime: swimming. Los demás deben decir el deporte en inglés.', answer: 'swimming = natación / nadar' },
    { prompt: 'Mime: playing football. Los demás deben decir el deporte en inglés.', answer: 'football / soccer = fútbol' },
    { prompt: 'Mime: playing tennis. Los demás deben decir el deporte en inglés.', answer: 'tennis = tenis' },
    { prompt: 'Mime: riding a bike. Los demás deben decir la actividad en inglés.', answer: 'riding a bike / cycling = andar en bicicleta' },
    { prompt: 'Sin hablar, muestra: My leg hurts. Los demás deben adivinar.', answer: 'My leg hurts. = Me duele la pierna.' }
  ],

  'Dibuja': [
    { prompt: 'Draw an EYE. Cuando termines, di la palabra en inglés.', answer: 'eye = ojo' },
    { prompt: 'Draw a MOUTH. Cuando termines, di la palabra en inglés.', answer: 'mouth = boca' },
    { prompt: 'Draw a HAND. Cuando termines, di la palabra en inglés.', answer: 'hand = mano' },
    { prompt: 'Draw a FOOT. Cuando termines, di la palabra en inglés.', answer: 'foot = pie' },
    { prompt: 'Draw a person with a HEADACHE. Los demás deben adivinar en inglés.', answer: 'a headache' },
    { prompt: 'Draw a person with a TOOTHACHE. Los demás deben adivinar en inglés.', answer: 'a toothache' },
    { prompt: 'Draw a person playing FOOTBALL. Los demás deben decir el deporte en inglés.', answer: 'football / soccer' },
    { prompt: 'Draw a person playing TENNIS. Los demás deben decir el deporte en inglés.', answer: 'tennis' },
    { prompt: 'Draw a face and label 3 body parts in English.', answer: 'Ejemplos: eye, ear, mouth, nose, hair, head.' },
    { prompt: 'Draw one body part from the Flash Win cards. Los demás deben decir su nombre en inglés.', answer: 'Respuesta según el dibujo.' }
  ],

  'Pregunta': [
    { prompt: 'How do you say “cabeza” in English?', answer: 'head' },
    { prompt: 'How do you say “ojo” in English?', answer: 'eye' },
    { prompt: 'How do you say “oreja” in English?', answer: 'ear' },
    { prompt: 'How do you say “boca” in English?', answer: 'mouth' },
    { prompt: 'How do you say “hombro” in English?', answer: 'shoulder' },
    { prompt: 'How do you say “mano” in English?', answer: 'hand' },
    { prompt: 'How do you say “pierna” in English?', answer: 'leg' },
    { prompt: 'How do you say “brazo” in English?', answer: 'arm' },
    { prompt: 'How do you say “pelo” in English?', answer: 'hair' },
    { prompt: 'Complete: “What’s the ______?”', answer: 'matter' },
    { prompt: 'Complete: “I’ve got a ______.” Usa una enfermedad en inglés.', answer: 'Ej.: cold, cough, headache, toothache, stomach-ache, temperature.' },
    { prompt: 'Complete: “She’s got a ______.” Usa una enfermedad en inglés.', answer: 'Ej.: cold, cough, headache, toothache, stomach-ache, temperature.' },
    { prompt: 'Say 3 body parts in English.', answer: 'Ej.: head, hand, leg.' },
    { prompt: 'Say 2 illnesses in English.', answer: 'Ej.: a cold, a cough.' },
    { prompt: 'You are ill. Choose: You MUST / MUSTN’T stay in bed.', answer: 'MUST' },
    { prompt: 'You have a stomach-ache. Choose: You MUST / MUSTN’T eat lots of sweets.', answer: 'MUSTN’T' },
    { prompt: 'Choose: You MUST / MUSTN’T drink water when you are ill.', answer: 'MUST' },
    { prompt: 'How do you say “dolor de muela” in English?', answer: 'a toothache' },
    { prompt: 'How do you say “dolor de estómago” in English?', answer: 'a stomach-ache' },
    { prompt: 'How do you say “tos” in English?', answer: 'a cough' }
  ],

  'Flash Win': [
    { prompt: '⚡ Saca 1 carta Flash Win. Di la palabra en INGLÉS y después en ESPAÑOL.', answer: 'El punto se gana si identifica correctamente la carta en ambos idiomas.' },
    { prompt: '⚡ Saca 1 carta Flash Win. Di SOLO la palabra en inglés.', answer: 'El adulto comprueba la respuesta con la carta.' },
    { prompt: '⚡ Saca 1 carta Flash Win. Spell it! Deletrea la palabra en inglés.', answer: 'El adulto comprueba el deletreo con la carta.' },
    { prompt: '⚡ Saca 1 carta Flash Win. Haz una mímica para que otro jugador diga la palabra en inglés.', answer: 'El punto se gana si el otro jugador adivina la palabra en inglés.' },
    { prompt: '⚡ Saca 1 carta Flash Win. Haz un dibujo para que otro jugador diga la palabra en inglés.', answer: 'El punto se gana si el otro jugador adivina la palabra en inglés.' },
    { prompt: '⚡ Saca 1 carta Flash Win. Si es una parte del cuerpo, di: “My ___ hurts.”', answer: 'Ej.: My head hurts. / My leg hurts.' },
    { prompt: '⚡ Saca 1 carta Flash Win. Si es una enfermedad, di: “I’ve got a ___.”', answer: 'Ej.: I’ve got a cold. / I’ve got a headache.' },
    { prompt: '⚡ Saca 2 cartas Flash Win. Di correctamente las dos palabras en inglés.', answer: 'Debe identificar ambas cartas para ganar el reto.' }
  ]
};

const finalQuestions = [
  {
    question: 'The boy says: “My stomach hurts.” What’s the matter?',
    options: ['He’s got a headache.', 'He’s got a stomach-ache.', 'He’s got a cold.'],
    correct: 1
  },
  {
    question: 'Choose the correct sentence: Stella tiene fiebre.',
    options: ['She’s got a temperature.', 'She’s got a toothache.', 'She’s got a cold foot.'],
    correct: 0
  },
  {
    question: 'You have a bad stomach-ache. What is correct?',
    options: ['You must eat lots of sweets.', 'You mustn’t eat lots of sweets.', 'You must play football.'],
    correct: 1
  },
  {
    question: 'Which word means “dolor de cabeza”?',
    options: ['a headache', 'a cough', 'a toothache'],
    correct: 0
  },
  {
    question: 'Complete the question: “What’s the _____?”',
    options: ['cold', 'matter', 'head'],
    correct: 1
  },
  {
    question: 'Which sentence is correct for “Me duele la pierna”?',
    options: ['My leg hurts.', 'My hand hurts.', 'My hair hurts.'],
    correct: 0
  },
  {
    question: 'Which one is a sport?',
    options: ['tennis', 'toothache', 'shoulder'],
    correct: 0
  },
  {
    question: 'Choose the correct translation for “brazo”.',
    options: ['arm', 'leg', 'back'],
    correct: 0
  },
  {
    question: 'You are ill and very hot. What have you got?',
    options: ['a temperature', 'a shoulder', 'a foot'],
    correct: 0
  },
  {
    question: 'Which advice is correct when you are ill?',
    options: ['You must drink water.', 'You mustn’t rest.', 'You must eat only sweets.'],
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
  if (finalQuestions.length === 1) return { item: finalQuestions[0], index: 0 };
  let index;
  do {
    index = Math.floor(Math.random() * finalQuestions.length);
  } while (index === lastFinalIndex);
  lastFinalIndex = index;
  return { item: finalQuestions[index], index };
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
    modeMessage.textContent = 'Busca el Súper Salto';
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
  const gradient = currentSegments
    .map((category, i) => `${COLORS[category]} ${i * angle}deg ${(i + 1) * angle}deg`)
    .join(', ');

  wheel.style.background = `conic-gradient(${gradient})`;

  const size = wheel.getBoundingClientRect().width || 340;
  const center = size / 2;
  const radius = size * 0.375;

  currentSegments.forEach((category, i) => {
    const label = document.createElement('div');
    label.className = 'wheel-label';
    label.textContent = category;

    const centerAngle = i * angle + angle / 2 - 90;
    const radians = centerAngle * Math.PI / 180;
    const x = center + Math.cos(radians) * radius;
    const y = center + Math.sin(radians) * radius;

    label.style.left = `${x}px`;
    label.style.top = `${y}px`;
    label.style.transform = `translate(-50%, -50%) rotate(${centerAngle + 90}deg)`;
    wheel.appendChild(label);
  });
}

function spinWheel() {
  if (spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  challengePanel.classList.add('hidden');

  const selectedIndex = Math.floor(Math.random() * currentSegments.length);
  const selectedCategory = currentSegments[selectedIndex];
  const segmentAngle = 360 / currentSegments.length;
  const targetCenter = selectedIndex * segmentAngle + segmentAngle / 2;
  const currentNormalized = ((currentRotation % 360) + 360) % 360;
  const desiredNormalized = (360 - targetCenter) % 360;
  let adjustment = desiredNormalized - currentNormalized;
  if (adjustment < 0) adjustment += 360;

  currentRotation += 360 * 7 + adjustment;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  const onEnd = () => {
    wheel.removeEventListener('transitionend', onEnd);
    spinning = false;
    spinBtn.disabled = false;
    showCategory(selectedCategory);
  };
  wheel.addEventListener('transitionend', onEnd);
}

function showCategory(category) {
  challengeIcon.textContent = ICONS[category] || '★';
  challengeIcon.style.background = COLORS[category] || '#0757b8';
  challengeCategory.textContent = category;
  answerText.classList.add('hidden');
  showAnswerBtn.classList.remove('hidden');

  if (category === 'Súper Salto') {
    currentChallenge = {
      prompt: '🚀 ¡SÚPER SALTO! Avanza directamente de la casilla 35 a la casilla 38.',
      answer: '¡Salto conseguido! El recorrido continúa: 38 → 39 → 40 → 41.'
    };
    showAnswerBtn.textContent = 'Ver recorrido';
  } else {
    currentChallenge = randomItem(challengeBank[category]);
    showAnswerBtn.textContent = 'Mostrar respuesta';
  }

  challengePrompt.textContent = currentChallenge.prompt;
  answerText.textContent = currentChallenge.answer;
  challengePanel.classList.remove('hidden');
  challengePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetFinalPanel() {
  finalQuestionBox.classList.add('hidden');
  finalFeedback.className = 'final-feedback hidden';
  finalOptions.innerHTML = '';
  nextFinalBtn.classList.add('hidden');
  startFinalBtn.classList.remove('hidden');
}

function loadFinalQuestion() {
  const { item } = randomFinalQuestion();
  startFinalBtn.classList.add('hidden');
  nextFinalBtn.classList.add('hidden');
  finalQuestionBox.classList.remove('hidden');
  finalFeedback.className = 'final-feedback hidden';
  finalQuestion.textContent = item.question;
  finalOptions.innerHTML = '';

  item.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = `${String.fromCharCode(65 + index)}) ${option}`;
    btn.addEventListener('click', () => gradeFinal(item, index, btn));
    finalOptions.appendChild(btn);
  });
}

function gradeFinal(item, selectedIndex, clickedButton) {
  const optionButtons = [...finalOptions.querySelectorAll('.option-btn')];
  optionButtons.forEach(btn => { btn.disabled = true; });

  const correctButton = optionButtons[item.correct];
  correctButton.classList.add('correct');

  if (selectedIndex === item.correct) {
    finalFeedback.textContent = '🏆 ¡SUPER WIN! ¡Respuesta correcta! ¡Ganaste el juego!';
    finalFeedback.className = 'final-feedback win';
    celebrate();
  } else {
    clickedButton.classList.add('wrong');
    finalFeedback.textContent = 'Casi. Te quedas en la casilla 41. En tu próximo turno prueba otra Pregunta Final.';
    finalFeedback.className = 'final-feedback retry';
    nextFinalBtn.classList.remove('hidden');
  }
}

function celebrate() {
  const symbols = ['⭐', '⚡', '🏆', '🎉'];
  for (let i = 0; i < 18; i++) {
    const piece = document.createElement('span');
    piece.textContent = randomItem(symbols);
    piece.style.position = 'fixed';
    piece.style.zIndex = '9999';
    piece.style.left = `${Math.random() * 92 + 4}%`;
    piece.style.top = '-30px';
    piece.style.fontSize = `${20 + Math.random() * 18}px`;
    piece.style.transition = `transform ${1.5 + Math.random()}s ease-in, opacity 2s ease-in`;
    piece.style.pointerEvents = 'none';
    document.body.appendChild(piece);
    requestAnimationFrame(() => {
      piece.style.transform = `translateY(${window.innerHeight + 80}px) rotate(${Math.random() * 720 - 360}deg)`;
      piece.style.opacity = '0';
    });
    setTimeout(() => piece.remove(), 2600);
  }
}

modeButtons.forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));
spinBtn.addEventListener('click', spinWheel);
showAnswerBtn.addEventListener('click', () => answerText.classList.toggle('hidden'));
doneBtn.addEventListener('click', () => {
  challengePanel.classList.add('hidden');
  roulettePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
startFinalBtn.addEventListener('click', loadFinalQuestion);
nextFinalBtn.addEventListener('click', loadFinalQuestion);
rulesBtn.addEventListener('click', () => rulesDialog.showModal());
closeRulesBtn.addEventListener('click', () => rulesDialog.close());
rulesDialog.addEventListener('click', event => {
  if (event.target === rulesDialog) rulesDialog.close();
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(buildWheel, 120);
});

setMode('normal');
