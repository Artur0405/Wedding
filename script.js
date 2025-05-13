let latestScrollY = 1;
let ticking = false;

function updateParallax() {
  const scrollY = latestScrollY;

  const images = document.querySelector('.parallax-images');
  if (images) {
    const imageSpeed = 1;
    images.style.transform = `translateY(${-scrollY * imageSpeed}px)`;
  }

  const content = document.querySelector('.content-overlay');
  if (content) {
    const contentSpeed = 0.8;
    content.style.transform = `translateY(${scrollY * contentSpeed}px)`;
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  latestScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});
