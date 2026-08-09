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
  'Adivina': 'Lee la pista en español y responde con la palabra correcta en inglés.',
  'Mímica': 'Haz la acción sin hablar. Los demás deben adivinar y decir la respuesta en inglés.',
  'Dibuja': 'Haz el dibujo indicado. Después identifica o escribe la palabra pedida en inglés.',
  'Pregunta': 'Lee la pregunta en español y responde usando la palabra o frase correcta en inglés.',
  'Flash Win': 'Saca una carta física Flash Win y cumple la instrucción. La respuesta principal debe ser en inglés.',
  'Súper Salto': '¡Conseguiste el Súper Salto! Avanza directamente desde la casilla 35 hasta la 38.'
};

const NORMAL_SEGMENTS = ['Adivina','Mímica','Dibuja','Pregunta','Flash Win','Adivina','Mímica','Dibuja','Pregunta','Flash Win'];
const JUMP_SEGMENTS = ['Adivina','Mímica','Dibuja','Pregunta','Flash Win','Súper Salto'];

const challengeBank = {
  'Adivina': [
    { prompt: 'Sirvo para ver. ¿Cómo se dice esta parte del cuerpo en inglés?', answer: 'eye = ojo' },
    { prompt: 'Sirvo para escuchar. ¿Cómo se dice esta parte del cuerpo en inglés?', answer: 'ear = oreja / oído' },
    { prompt: 'La usas para comer y sonreír. ¿Cómo se dice en inglés?', answer: 'mouth = boca' },
    { prompt: 'Está dentro de la boca y lo cepillas todos los días. ¿Cómo se dice en inglés?', answer: 'tooth = diente' },
    { prompt: 'Está al final de la pierna y lo usas para caminar. ¿Cómo se dice en inglés?', answer: 'foot = pie' },
    { prompt: 'Está entre el cuello y el brazo. ¿Cómo se dice en inglés?', answer: 'shoulder = hombro' },
    { prompt: 'Si te duele la cabeza, ¿cómo se llama ese malestar en inglés?', answer: 'a headache = dolor de cabeza' },
    { prompt: 'Toses y te moquea la nariz. ¿Cómo se dice “resfriado” en inglés?', answer: 'a cold = resfriado' },
    { prompt: 'Te duele una muela. ¿Cómo se dice ese malestar en inglés?', answer: 'a toothache = dolor de muela' },
    { prompt: 'Te duele el estómago. ¿Cómo se dice ese malestar en inglés?', answer: 'a stomach-ache = dolor de estómago' },
    { prompt: 'Se juega pateando una pelota para hacer goles. ¿Cómo se llama este deporte en inglés?', answer: 'football / soccer = fútbol' },
    { prompt: 'Se juega con raqueta y una pelota sobre una red. ¿Cómo se llama este deporte en inglés?', answer: 'tennis = tenis' }
  ],
  'Mímica': [
    { prompt: 'Haz la mímica de una tos. Los demás deben decir el nombre en inglés.', answer: 'a cough = tos' },
    { prompt: 'Haz la mímica de dolor de cabeza. Los demás deben decirlo en inglés.', answer: 'a headache = dolor de cabeza' },
    { prompt: 'Haz la mímica de dolor de muela. Los demás deben decirlo en inglés.', answer: 'a toothache = dolor de muela' },
    { prompt: 'Haz la mímica de dolor de estómago. Los demás deben decirlo en inglés.', answer: 'a stomach-ache = dolor de estómago' },
    { prompt: 'Haz la mímica de estar resfriado. Los demás deben decirlo en inglés.', answer: 'a cold = resfriado' },
    { prompt: 'Haz la mímica de nadar. Los demás deben decir la actividad en inglés.', answer: 'swimming = nadar / natación' },
    { prompt: 'Haz la mímica de jugar fútbol. Los demás deben decir el deporte en inglés.', answer: 'football / soccer = fútbol' },
    { prompt: 'Haz la mímica de jugar tenis. Los demás deben decir el deporte en inglés.', answer: 'tennis = tenis' },
    { prompt: 'Haz la mímica de andar en bicicleta. Los demás deben decirlo en inglés.', answer: 'riding a bike / cycling = andar en bicicleta' },
    { prompt: 'Sin hablar, muestra que te duele una pierna. Los demás deben formar la frase en inglés.', answer: 'My leg hurts. = Me duele la pierna.' }
  ],
  'Dibuja': [
    { prompt: 'Dibuja un ojo. Después di cómo se escribe en inglés.', answer: 'eye = ojo' },
    { prompt: 'Dibuja una boca. Después di cómo se escribe en inglés.', answer: 'mouth = boca' },
    { prompt: 'Dibuja una mano. Después di cómo se escribe en inglés.', answer: 'hand = mano' },
    { prompt: 'Dibuja un pie. Después di cómo se escribe en inglés.', answer: 'foot = pie' },
    { prompt: 'Dibuja a una persona con dolor de cabeza. Los demás deben decir el malestar en inglés.', answer: 'a headache' },
    { prompt: 'Dibuja a una persona con dolor de muela. Los demás deben decir el malestar en inglés.', answer: 'a toothache' },
    { prompt: 'Dibuja a una persona jugando fútbol. Los demás deben decir el deporte en inglés.', answer: 'football / soccer' },
    { prompt: 'Dibuja a una persona jugando tenis. Los demás deben decir el deporte en inglés.', answer: 'tennis' },
    { prompt: 'Dibuja una cara y escribe 3 partes del cuerpo en inglés.', answer: 'Ejemplos: eye, ear, mouth, nose, hair, head.' },
    { prompt: 'Dibuja una parte del cuerpo que aparezca en las cartas Flash Win. Los demás deben decirla en inglés.', answer: 'Respuesta según el dibujo.' }
  ],
  'Pregunta': [
    { prompt: '¿Cómo se dice “cabeza” en inglés?', answer: 'head' },
    { prompt: '¿Cómo se dice “ojo” en inglés?', answer: 'eye' },
    { prompt: '¿Cómo se dice “oreja” en inglés?', answer: 'ear' },
    { prompt: '¿Cómo se dice “boca” en inglés?', answer: 'mouth' },
    { prompt: '¿Cómo se dice “hombro” en inglés?', answer: 'shoulder' },
    { prompt: '¿Cómo se dice “mano” en inglés?', answer: 'hand' },
    { prompt: '¿Cómo se dice “pierna” en inglés?', answer: 'leg' },
    { prompt: '¿Cómo se dice “brazo” en inglés?', answer: 'arm' },
    { prompt: '¿Cómo se dice “pelo” en inglés?', answer: 'hair' },
    { prompt: 'Completa esta pregunta en inglés: “What’s the ______?”', answer: 'matter' },
    { prompt: 'Completa en inglés: “I’ve got a ______.” Usa una enfermedad o malestar.', answer: 'Ej.: cold, cough, headache, toothache, stomach-ache, temperature.' },
    { prompt: 'Completa en inglés: “She’s got a ______.” Usa una enfermedad o malestar.', answer: 'Ej.: cold, cough, headache, toothache, stomach-ache, temperature.' },
    { prompt: 'Di 3 partes del cuerpo en inglés.', answer: 'Ej.: head, hand, leg.' },
    { prompt: 'Di 2 enfermedades o malestares en inglés.', answer: 'Ej.: a cold, a cough.' },
    { prompt: 'Estás enfermo. Elige la palabra correcta: You MUST / MUSTN’T stay in bed.', answer: 'MUST' },
    { prompt: 'Te duele el estómago. Elige: You MUST / MUSTN’T eat lots of sweets.', answer: 'MUSTN’T' },
    { prompt: 'Elige la opción correcta: You MUST / MUSTN’T drink water when you are ill.', answer: 'MUST' },
    { prompt: '¿Cómo se dice “dolor de muela” en inglés?', answer: 'a toothache' },
    { prompt: '¿Cómo se dice “dolor de estómago” en inglés?', answer: 'a stomach-ache' },
    { prompt: '¿Cómo se dice “tos” en inglés?', answer: 'a cough' }
  ],
  'Flash Win': [
    { prompt: 'Saca 1 carta Flash Win. Mira la imagen o palabra y di primero su nombre en inglés y después en español.', answer: 'Ganas el reto si identificas correctamente la carta en ambos idiomas.' },
    { prompt: 'Saca 1 carta Flash Win. Di solamente la palabra correcta en inglés.', answer: 'El adulto comprueba la respuesta con la carta.' },
    { prompt: 'Saca 1 carta Flash Win. Deletrea en voz alta la palabra en inglés.', answer: 'El adulto comprueba el deletreo con la carta.' },
    { prompt: 'Saca 1 carta Flash Win. Haz una mímica para que otro jugador diga la palabra en inglés.', answer: 'Ganas el reto si el otro jugador dice correctamente la palabra en inglés.' },
    { prompt: 'Saca 1 carta Flash Win. Haz un dibujo para que otro jugador diga la palabra en inglés.', answer: 'Ganas el reto si el otro jugador dice correctamente la palabra en inglés.' },
    { prompt: 'Saca 1 carta Flash Win. Si es una parte del cuerpo, úsala en la frase “My ___ hurts.”', answer: 'Ej.: My head hurts. / My leg hurts.' },
    { prompt: 'Saca 1 carta Flash Win. Si es una enfermedad o malestar, úsala en la frase “I’ve got a ___.”', answer: 'Ej.: I’ve got a cold. / I’ve got a headache.' },
    { prompt: 'Saca 2 cartas Flash Win. Di correctamente las dos palabras en inglés.', answer: 'Debes identificar las dos para completar el reto.' }
  ],
  'Súper Salto': [
    { prompt: '¡SÚPER SALTO! Ya puedes dejar la casilla 35. Mueve tu ficha directamente a la casilla 38.', answer: 'Avanza 35 → 38. Las casillas 36 y 37 no existen.' }
  ]
};

const finalQuestions = [
  { question: 'Un niño dice: “My stomach hurts.” ¿Qué le pasa?', options: ['He’s got a headache.','He’s got a stomach-ache.','He’s got a cold.'], correct: 1 },
  { question: '¿Cuál es la frase correcta para decir “Stella tiene fiebre”?', options: ['She’s got a temperature.','She’s got a toothache.','She’s got a cold foot.'], correct: 0 },
  { question: 'Tienes un fuerte dolor de estómago. ¿Cuál consejo es correcto?', options: ['You must eat lots of sweets.','You mustn’t eat lots of sweets.','You must play football.'], correct: 1 },
  { question: '¿Qué palabra significa “dolor de cabeza”?', options: ['a headache','a cough','a toothache'], correct: 0 },
  { question: 'Completa la pregunta en inglés: “What’s the _____?”', options: ['cold','matter','head'], correct: 1 },
  { question: '¿Cuál frase significa “Me duele la pierna”?', options: ['My leg hurts.','My hand hurts.','My hair hurts.'], correct: 0 },
  { question: '¿Cuál de estas palabras es un deporte?', options: ['tennis','toothache','shoulder'], correct: 0 },
  { question: '¿Cuál es la traducción correcta de “brazo”?', options: ['arm','leg','back'], correct: 0 },
  { question: 'Estás enfermo y tienes mucho calor. ¿Qué malestar tienes?', options: ['a temperature','a shoulder','a foot'], correct: 0 },
  { question: '¿Cuál consejo en inglés es correcto cuando estás enfermo?', options: ['You must drink water.','You mustn’t rest.','You must eat only sweets.'], correct: 0 }
];

let mode = 'normal';
let spinning = false;
let currentRotation = 0;
let currentSegments = NORMAL_SEGMENTS;
let currentChallenge = null;
let lastFinalIndex = -1;

function randomItem(list) { return list[Math.floor(Math.random() * list.length)]; }
function randomFinalQuestion() {
  let index;
  do { index = Math.floor(Math.random() * finalQuestions.length); } while (finalQuestions.length > 1 && index === lastFinalIndex);
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
  wheel.style.background = `conic-gradient(${currentSegments.map((cat,i)=>`${COLORS[cat]} ${i*angle}deg ${(i+1)*angle}deg`).join(',')})`;
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
      [...finalOptions.children].forEach(b => b.disabled = true);
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
doneBtn.addEventListener('click', () => { challengePanel.classList.add('hidden'); window.scrollTo({ top: 0, behavior: 'smooth' }); });
rulesBtn.addEventListener('click', () => rulesDialog.showModal());
closeRulesBtn.addEventListener('click', () => rulesDialog.close());
rulesDialog.addEventListener('click', e => { if (e.target === rulesDialog) rulesDialog.close(); });
startFinalBtn.addEventListener('click', showFinalQuestion);
nextFinalBtn.addEventListener('click', showFinalQuestion);
window.addEventListener('resize', buildWheel);

setMode('normal');
