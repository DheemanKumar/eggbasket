let point = 0;
const pointBord = document.getElementById('point-bord');
const EGG_BREAK_HEIGHT = window.innerHeight - 80; // You can adjust 100 to raise/lower the break zone

const eggSounds = [
  'sounds/cook1.mp3',
  'sounds/cook2.mp3',
  'sounds/cook3.mp3'
];


let spawnDelay = 2000;          // Starting delay in milliseconds
const MIN_DELAY = 500;          // Minimum delay cap
const DELAY_STEP = 100;          // Amount to decrease after each spawn
// Expose point globally for timer.js to access on game end
window.point = point;

function spawnEgg() {
  // 1. Select a random box
  const boxes = document.querySelectorAll('.flex.flex-row > div');
  if (boxes.length === 0) return;
  const idx = Math.floor(Math.random() * boxes.length);
  const box = boxes[idx];
  // Animate box scale up
  box.classList.add('scale-125', 'z-30', 'transition-transform', 'duration-200');
  setTimeout(() => {
    box.classList.remove('scale-125', 'z-30');
  }, 200);
  const boxRect = box.getBoundingClientRect();
  const main = document.querySelector('main');
  const mainRect = main.getBoundingClientRect();

  // 2. Create egg element
  const eggWidth = 24, eggHeight = 32; // match w-6 h-8
const egg = document.createElement('div');
egg.className = 'absolute w-6 h-8 z-10 scale-0 transition-transform duration-200 flex items-center justify-center';
egg.innerHTML = '<img src="images/egg.png" alt="egg" class="w-full h-full object-contain">';

// Center the egg above the box
const left = boxRect.left - mainRect.left + boxRect.width / 2 - eggWidth / 2;
const top = boxRect.top - mainRect.top + boxRect.height / 2 - eggHeight / 2;
egg.style.left = left + 'px';
egg.style.top = top + 'px';

main.appendChild(egg);

main.appendChild(egg); // Add egg to the screen

// 🔊 Play random egg sound
const randomSound = eggSounds[Math.floor(Math.random() * eggSounds.length)];
const audio = new Audio(randomSound);
audio.volume = 0.6;
audio.play();


  // Pop-up animation
  setTimeout(() => { egg.classList.remove('scale-0'); egg.classList.add('scale-100'); }, 10);

  // 2. Gravity
  let velocity = 0;
  let lastTime = null;
  function fall(time) {
    if (!lastTime) lastTime = time;
    const dt = (time - lastTime) / 1000;
    lastTime = time;
    velocity += 1200 * dt;
    let curTop = parseFloat(egg.style.top);
    curTop += velocity * dt;
    egg.style.top = curTop + 'px';

    // 3. Collision with basket
    const basket = document.getElementById('basket');
    if (basket) {
      const eggRect = egg.getBoundingClientRect();
      const basketRect = basket.getBoundingClientRect();
      if (
        eggRect.left < basketRect.right &&
        eggRect.right > basketRect.left &&
        eggRect.top < basketRect.bottom &&
        eggRect.bottom > basketRect.top
      ) {
        egg.remove();
        point++;
        window.point = point; // keep global updated
        if (pointBord) pointBord.innerText = point;
        return;
      }
    }
    // 4. Missed egg
    if (curTop > EGG_BREAK_HEIGHT-25) {
      egg.remove();
      // Spawn broken egg
      const broken = document.createElement('div');
      broken.className = 'absolute w-8 h-8 z-10 flex items-center justify-center';
      broken.innerHTML = '<img src="images/broken.png" alt="broken egg" class="w-full h-full object-contain">';
      broken.style.left = (parseFloat(egg.style.left) + eggWidth / 2 - 16) + 'px';
      broken.style.top = (EGG_BREAK_HEIGHT - mainRect.top - 16) + 'px';
      main.appendChild(broken);
      setTimeout(() => broken.remove(), 1500);
      return;
    }

    requestAnimationFrame(fall);
  }
  requestAnimationFrame(fall);
}


function spawnEggWithScaling() {
  spawnEgg(); // Your existing egg-spawning function

  // Decrease the delay
  spawnDelay = Math.max(MIN_DELAY, spawnDelay - DELAY_STEP);

  // Schedule the next spawn
  setTimeout(spawnEggWithScaling, spawnDelay);
}

// Start the first spawn
spawnEggWithScaling();

window.point = point;
