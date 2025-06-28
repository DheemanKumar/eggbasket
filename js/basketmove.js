// Basket movement logic
const basket = document.getElementById('basket');
const container = document.getElementById('basket-container');

const basketSize = 96; // 24 * 4 (Tailwind w-24 = 6rem = 96px)

document.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left - basketSize / 2;
  let y = e.clientY - rect.top - basketSize / 2;

  // Clamp position inside container
  x = Math.max(0, Math.min(x, rect.width - basketSize));
  y = Math.max(0, Math.min(y, rect.height - basketSize));

  // Use requestAnimationFrame for smooth movement
  requestAnimationFrame(() => {
    basket.style.left = x + 'px';
    basket.style.top = y + 'px';
  });
});
