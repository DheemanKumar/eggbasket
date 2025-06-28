// Timer settings
const TOTAL_SECONDS = 60;
let timeLeft = TOTAL_SECONDS;
const radialText = document.getElementById('radial-timer-text');
const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference}`;
circle.style.strokeDashoffset = 0;

function setProgress(seconds) {
  const percent = seconds / TOTAL_SECONDS;
  const offset = circumference * (1 - percent);
  circle.style.strokeDashoffset = offset;
  console.log(`Setting progress: ${seconds} seconds left, offset: ${offset}`);
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function updateTimers() {
  radialText.textContent = timeLeft;
  setProgress(timeLeft);
}

updateTimers();
const interval = setInterval(() => {

  if (timeLeft > 0) {
    timeLeft--;
    updateTimers();
  } else {
    // Game over: redirect to endpage.html with score
    let point = 0;
    try {
      point = window.point || (window.spawnEgg && window.spawnEgg.point) || 0;
    } catch (e) {}
    if (typeof point !== 'number') {
      // fallback: try to get from DOM
      const pb = document.getElementById('point-bord');
      if (pb) point = parseInt(pb.innerText) || 0;
    }
    window.location.href = `endpage.html?score=${point}`;
  }
}, 1000);
