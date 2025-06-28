document.addEventListener('DOMContentLoaded', () => {
  const basket = document.getElementById('basket');
  const container = document.getElementById('basket-container');

  const basketSize = 96;

  document.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    let x = e.clientX - rect.left - basketSize / 2;
    let y = e.clientY - rect.top - basketSize / 2;

    x = Math.max(0, Math.min(x, rect.width - basketSize));
    y = Math.max(0, Math.min(y, rect.height - basketSize));

    requestAnimationFrame(() => {
      basket.style.left = x + 'px';
      basket.style.top = y + 'px';
    });
  });
});
