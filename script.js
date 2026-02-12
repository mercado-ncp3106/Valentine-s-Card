let noClicks = 0;
let yesScale = 1;
let typingInterval;

const question = document.getElementById("question");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttons = document.getElementById("buttons");
const card = document.getElementById("card");

const romanticMessages = [
  "Sure ka ba jan lods? 🥺",
  "Weh hindi nga? 🥺",
  "Luh sige na! 🥺",
  "Pleeeeeaaaaaseee! 🥺",
  "Last na sure ka na ba jan? 🥺",
  "Kulit mo ah ayaw mo i-yes! 😡"
];

function typeText(el, text) {
  clearInterval(typingInterval);
  el.textContent = "";
  let i = 0;
  typingInterval = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(typingInterval);
  }, 40);
}

noBtn.addEventListener("click", () => {
  noClicks++;

  const msg =
    romanticMessages[Math.min(noClicks - 1, romanticMessages.length - 1)];
  typeText(question, msg);

  yesScale += 0.25;
  yesBtn.style.transform = `translateX(-50%) scale(${yesScale})`;

  const textScale = 1 + (yesScale - 1) * 0.35;
  question.style.transform = `scale(${textScale})`;

  question.style.color = `rgb(255, ${130 - noClicks * 4}, ${160 - noClicks * 4})`;

  if (noClicks >= 6) {
    activateRunAwayNo();
  }

  spawnSparkle();
});

/* YES → SLIDES */
yesBtn.addEventListener("click", () => {
  buttons.style.display = "none";
  showSlide0();
  startHearts();
});

/* SLIDE 0 */
function showSlide0() {
  question.style.transform = "scale(1.5)";
  question.style.color = "#ff1e56";
  typeText(question, "Yey, gusto naman pala eh! 😌");

  createNextButton(() => {
    showSlide1();
  });
}

/* SLIDE 1 */
function showSlide1() {
  question.style.transform = "scale(1.4)";
  question.style.color = "#ff1e56";
  typeText(question, "February 14, 2026 Saturday\nBlakes tayo 🥩");

  createNextButton(() => {
    showSlide2();
  });
}

/* SLIDE 2 */
function showSlide2() {
  question.style.transform = "scale(1.6)";
  question.style.color = "#ff1e56";
  typeText(question, "I love you! 😘");
}


function createNextButton(onClick) {
  // Remove existing NEXT if any
  const oldNext = document.getElementById("nextBtn");
  if (oldNext) oldNext.remove();

  const nextBtn = document.createElement("button");
  nextBtn.id = "nextBtn";
  nextBtn.textContent = "NEXT ➜";

  nextBtn.style.marginTop = "30px";
  nextBtn.style.background = "#ff4d6d";
  nextBtn.style.color = "white";
  nextBtn.style.border = "none";
  nextBtn.style.borderRadius = "50px";
  nextBtn.style.padding = "12px 32px";
  nextBtn.style.fontSize = "16px";
  nextBtn.style.cursor = "pointer";
  nextBtn.style.position = "relative";

  card.appendChild(nextBtn);

  nextBtn.addEventListener("click", () => {
    nextBtn.remove();
    onClick();
  });
}


/* Effects */
function spawnSparkle() {
  const s = document.createElement("div");
  s.className = "sparkle";
  s.textContent = "✨";
  s.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 4000);
}

function startHearts() {
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = "💖";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = Math.random() * 2 + 4 + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 6000);
  }, 250);
}

function activateRunAwayNo() {

  // 🔒 Block ALL clicking methods
  noBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    moveNoButton();
  });

  noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
  });

  // 👀 Move when cursor gets close
  noBtn.addEventListener("mouseenter", moveNoButton);
  noBtn.addEventListener("mouseover", moveNoButton);
}

function moveNoButton() {
  const rect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = rect.width - btnRect.width;
  const maxY = rect.height - btnRect.height;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  noBtn.style.transform = "none";
}
