# Super Win English

Aplicación web móvil para acompañar el tablero físico **Super Win** y practicar contenidos de inglés de 3° básico.

## Contenidos

- Body parts: head, eye, ear, mouth, shoulder, hand, leg, arm, hair, tooth, back, stomach, foot.
- Illness / health: a temperature, a cold, a cough, a headache, a toothache, a stomach-ache.
- Estructuras: `What's the matter?`, `I've got...`, `He's got...`, `She's got...`, `My ___ hurts.`
- `must / mustn't`.
- Sports & leisure básicos.
- Cartas físicas **Flash Win**.

## Modos de juego

### Casilla ?
Ruleta normal con cinco tipos de reto:

1. Adivina
2. Mímica
3. Dibuja
4. Pregunta
5. Flash Win

### Casilla 35 — Súper Salto
Las casillas 36 y 37 no existen. Al llegar a la casilla 35, el jugador permanece allí y, en sus siguientes turnos, gira la ruleta especial hasta obtener **Súper Salto**.

- Si sale otro reto, lo realiza y permanece en 35.
- Si sale **Súper Salto**, avanza directamente de **35 a 38**.
- El recorrido continúa 38 → 39 → 40 → 41.

### Casilla 41 — Pregunta Final
Al llegar a la 41 se activa una pregunta final de inglés con alternativas.

- Respuesta correcta: **SUPER WIN — gana el juego**.
- Respuesta incorrecta: permanece en 41 y recibe otra pregunta final en su próximo turno.

## Ejecución local

Es una aplicación estática. No requiere instalación ni build.

Abrir `index.html` directamente o servir la carpeta con cualquier servidor HTTP local.

## Despliegue en Vercel

1. Importar el repositorio `cmstecnologia86-ops/superwin` en Vercel.
2. Framework Preset: **Other**.
3. Root Directory: `./`.
4. Build Command: dejar vacío.
5. Output Directory: dejar vacío.
6. Deploy.

El archivo `vercel.json` ya está incluido.
