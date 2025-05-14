let currentScroll = 0;
let targetScroll = 0;

const images = document.querySelector('.parallax-images');
const content = document.querySelector('.content-overlay');

// Плавность движения (0.08 = мягко, 0.2 = быстрее)
const ease = 0.8;

function updateParallax() {
  // Плавное приближение
  currentScroll += (targetScroll - currentScroll) * ease;

  // Применяем смещение к картинкам
  if (images) {
    images.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;
  }

  // Применяем параллакс к тексту
  if (content) {
    content.style.transform = `translate3d(0, ${currentScroll * 0.8}px, 0)`;
  }

  // Следующий кадр
  requestAnimationFrame(updateParallax);
}

// Следим за прокруткой
window.addEventListener('scroll', () => {
  targetScroll = window.scrollY;
});
function showImageSizes() {
  let output = 'Размеры изображений:\n\n';

  document.querySelectorAll('img').forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    output += `#${index + 1} — ${rect.width.toFixed(1)}px × ${rect.height.toFixed(1)}px\n`;
  });

  alert(output);
}


// Старт
requestAnimationFrame(updateParallax);
