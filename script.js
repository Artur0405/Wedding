const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHR9b9scQzWvN8VSHlmCvzbPopk82FgIi5ht43dDwcjLVTD2pj9h2TqJFWyiAHnifE/exec";



let screenHeight = window.innerHeight;
let virtualPageHeight = screenHeight * 3.5; // или 4, 5 — сколько "прокрутки" нужно
if (window.innerWidth <= 768) {
  document.getElementById("scroll-wrapper").style.height = virtualPageHeight + "px";
}



// При загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  if (
    window.matchMedia("(orientation: landscape)").matches &&
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  ) {
    document.body.classList.add("mobile-landscape");
  } else {
    document.body.classList.remove("mobile-landscape");
  }
});

// При смене ориентации
window.matchMedia("(orientation: landscape)").addEventListener("change", (e) => {
  if (
    e.matches &&
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
  ) {
    document.body.classList.add("mobile-landscape");
  } else {
    document.body.classList.remove("mobile-landscape");
  }
});


let currentScroll = 0;
let targetScroll = 0;


  const content = document.querySelector('.content-overlay');
  const contentForm = document.querySelector('.content-overlay form');
  const images = document.querySelectorAll('.parallax-images img');
  const image = document.querySelector('.parallax-images');


// Плавность движения (0.08 = мягко, 0.2 = быстрее)
const ease = 0.8;

function updateParallax() {
  // Плавное приближение
  currentScroll += (targetScroll - currentScroll) * ease;

  // Применяем смещение к картинкам

  if (window.innerWidth <= 768) {

    console.log("Mobile script запущен");
    images.forEach((img, index) => {
      const speed = index === 0 ? 1 : 1.06; // можно регулировать
      img.style.transform = `translate3d(0, ${-currentScroll * speed}px, 0)`;
    });
  } else {

    console.log("Desktop script запущен");
    if (image) {
      image.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;
    }
  }

  if (window.innerWidth <= 768) {

    if (content) {
      content.style.transform = `translate3d(0, ${-currentScroll * 1}px, 0)`;
    }
  } else {
    if (content) {
      content.style.transform = `translate3d(0, ${-currentScroll * 0.23}px, 0)`;
    }
    if (contentForm) {
      contentForm.style.transform = `translate3d(0, ${-currentScroll * 1}px, 0)`;
    }
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

const form = document.getElementById("rsvp-form");
const attendanceSelect = document.getElementById("attendance-select");
const extraFields = document.getElementById("extra-fields");
const guestsNumber = document.getElementById("guests_number")
const guests = document.getElementById("guests")
attendanceSelect.addEventListener("change", function () {
  if (this.value === "Այո") {
    document.querySelector('input[name="guests"]').value = "1";
    if (guestsNumber.value === "1") {
      extraFields.style.display = "block";
      guests.style.display = "none"
      guests.required = false
    } else {
      extraFields.style.display = "block";
      guests.style.display = "block"
      guests.required = true
    }

  } else {
    extraFields.style.display = "none";
    guests.style.display = "none"
    guests.required = false
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
    guests.required = true
  } else {
    guests.style.display = "none";
    guests.required = false
    form.extra_guests.value = ""; // очищаем, если не нужно
  }
}


guestsNumber.addEventListener("input", () => {
  if (guestsNumber.value < 1) {
    guestsNumber.value = 1;
  }
  updateExtraGuestsVisibility();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((text) => {
      if (text.trim() === "OK") {
        alert("Շնորհակալություն՝ պատասխանի համար ❤️");
        form.reset();
        extraFields.style.display = "none";
        guests.style.display = "none";
        guests.required = false
      } else {
        console.warn("Սերվերի պատասխանը:", text);
        alert("Տեղի ունեցավ սխալ։ Խնդրում ենք փորձել ավելի ուշ։");
      }
    })
    .catch((err) => {
      console.error("Fetch սխալ:", err);
      alert("Տեղի ունեցավ սխալ։ Խնդրում ենք փորձել ավելի ուշ։");
    });
  
  
  });

  // Прокрутка к началу при обновлении страницы
  window.addEventListener("load", function () {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10); // или 100 если нужно чуть позже
  });

// Скрываем прелоадер после загрузки
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.pointerEvents = "none";
    setTimeout(() => {
      preloader.remove();
    }, 500); // Через 0.5 сек окончательно удалим
  }
});

// _______________________________________________________________________________________________

function showImageSizes() {
  let output = 'Размеры изображений:\n\n';

  document.querySelectorAll('img').forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    output += `#${index + 1} — ${rect.width.toFixed(1)}px × ${rect.height.toFixed(1)}px\n`;
  });

  alert(output);
}