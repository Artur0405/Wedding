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
    content.style.transform = `translate3d(0, ${-currentScroll * 0.15}px, 0)`;
  }

  // Следующий кадр
  requestAnimationFrame(updateParallax);
}

// Следим за прокруткой
window.addEventListener('scroll', () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  targetScroll = Math.min(window.scrollY, maxScroll);
});
requestAnimationFrame(updateParallax);

// _______________________________________________________________________________________________
// Показ/скрытие дополнительных полей




const form = document.getElementById("rsvp-form");
const attendanceSelect = document.getElementById("attendance-select");
const extraFields = document.getElementById("extra-fields");guests_number
const guestsNumber = document.getElementById("guests_number")
const guests = document.getElementById("guests")
attendanceSelect.addEventListener("change", function () {
  if (this.value === "Այո") {
    document.querySelector('input[name="guests"]').value = "1";
    if (guestsNumber.value === "1") {
      extraFields.style.display = "block";
      guests.style.display = "none"
    } else {
      extraFields.style.display = "block";
      guests.style.display = "block"
    }

  } else {
    extraFields.style.display = "none";
    guests.style.display = "block"
    document.querySelector('input[name="guests"]').value = "";
    document.querySelector('input[name="extra_guests"]').value = "";
    document.querySelector('textarea[name="message"]').value = "";
  }
});

guestsNumber.addEventListener("input", updateExtraGuestsVisibility);

// Функция, проверяющая нужно ли показывать поле имён
function updateExtraGuestsVisibility() {
  const guestCount = parseInt(guestsNumber.value, 10);

  if (attendanceSelect.value === "Այո" && guestCount > 1) {
    guests.style.display = "block";
  } else {
    guests.style.display = "none";
    form.extra_guests.value = ""; // очищаем, если не нужно
  }
}

guestsNumber.addEventListener("input", () => {
  if (guestsNumber.value < 1) {
    guestsNumber.value = 1;
  }
  updateExtraGuestsVisibility();
});

// emailjs.init("pdiDqGdKMmFlIL8NF");
// // 📤 Отправка формы через EmailJS
// form.addEventListener("submit", function (event) {
//   event.preventDefault();

//   emailjs.sendForm("service_nevlnyc", "template_yzpnxvb", this)
//     .then(() => {
//       alert("Ձեր պատասխանը ուղարկվել է։ Շնորհակալություն ❤️");
//       form.reset();
//       extraFields.style.display = "none";
//     }, (error) => {
//       console.error("Սխալ:", error);
//       alert("Տեղի ունեցավ սխալ։ Խնդրում ենք փորձել ավելի ուշ։");
//     });
// });
// _______________________________________________________________________________________________

function showImageSizes() {
  let output = 'Размеры изображений:\n\n';

  document.querySelectorAll('img').forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    output += `#${index + 1} — ${rect.width.toFixed(1)}px × ${rect.height.toFixed(1)}px\n`;
  });

  alert(output);
}