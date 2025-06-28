document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOM fully loaded");

  const basket = document.getElementById('basket');
  const container = document.getElementById('basket-container');

  if (!basket) {
    console.error("❌ Basket element not found!");
    return;
  }

  if (!container) {
    console.error("❌ Container element not found!");
    return;
  }

  const basketSize = 96; // 24 * 4 = 96px

  document.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    let x = e.clientX - rect.left - basketSize / 2;
    let y = e.clientY - rect.top - basketSize / 2;

    // Clamp within container
    x = Math.max(0, Math.min(x, rect.width - basketSize));
    y = Math.max(0, Math.min(y, rect.height - basketSize));

    console.log(`📍 Mouse X: ${e.clientX}, Y: ${e.clientY}`);
    console.log(`📦 Basket Position → X: ${x}, Y: ${y}`);

    requestAnimationFrame(() => {
      basket.style.left = x + 'px';
      basket.style.top = y + 'px';
    });
  });

  console.log("✅ Mousemove event listener attached");
});
