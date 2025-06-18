$(document).ready(function () {
	// Таймер обратного отсчёта
	let countDownDate = new Date("2025-07-19T00:00:00").getTime();

	const startTimer = () => {
		let now = new Date().getTime();
		let distance = countDownDate - now;

		if (distance <= 0) {
			$(".timer").html(`
				<div class="expired-wrapper text-center w-100">
					<span class="expired-text">Today 🕊️</span>
				</div>
			`);
			$(".hero-notice").text("Today is our Wedding 💍");
			if (distance <= -86400000 ) {
				$(".timer").html(`
					<div class="expired-wrapper text-center w-100">
						<span class="expired-text">We are already married 🕊️</span>
					</div>
				`);
				$(".hero-notice").text("We are already married 💍");
			}
			return; // Останавливаем — не запускаем таймер
		} 

		let days = Math.floor(distance / (1000 * 60 * 60 * 24));
		let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);

		$("#days").text(days);
		$("#hours").text(hours);
		$("#minutes").text(minutes);
		$("#seconds").text(seconds);


		if (distance <= 0) {
			clearInterval(x);
		}

	};
	startTimer();
	const x = setInterval(startTimer, 1000);

	// Кнопка play/pause для аудио
	$("#playButton").on("click", function () {
		let audio = $("#my_audio").get(0);
		if (audio.paused) {
			audio.play();
			$("#playButton img").attr('src', "Assets/pause-btn.svg");
		} else {
			audio.pause();
			$("#playButton img").attr('src', "Assets/play-btn.svg");
		}
	});


	// Автозапуск с безопасной установкой параметров
setTimeout(() => {
	const video = $("#myVideo").get(0);
	if (video) {
		video.muted = true;       // обязательно установить программно
		video.autoplay = true;
		video.playsInline = true;

		const playPromise = video.play();
		if (playPromise !== undefined) {
			playPromise
				.then(() => {
					console.log("✅ Видео запущено автоматически");
				})
				.catch((error) => {
					console.warn("❗ Браузер заблокировал autoplay:", error);
				});
		}
	}
}, 300);  // Лучше 200–300 мс, чтобы DOM успел отрендериться

// function tryStartVideo() {
// 	const video = $("#myVideo").get(0);
// 	if (video && video.paused) {
// 		video.muted = true;
// 		video.play()
// 			.then(() => console.log("▶️ Видео запущено после взаимодействия"))
// 			.catch(e => console.warn("🚫 Видео не запустилось:", e));
// 	}
// 	$(document).off("click touchstart wheel keydown mousemove", tryStartVideo);
// }

// // Назначаем обработчики на document, а не window
// $(document).on("click touchstart wheel keydown mousemove", tryStartVideo);

// let lastScrollY = window.scrollY;

// function checkScrollActivity() {
// 	const currentScrollY = window.scrollY;

// 	if (Math.abs(currentScrollY - lastScrollY) > 5) {
// 		console.log("📜 Зафиксировано движение скролла");
// 		triggerVideoByScroll();
// 	}

// 	lastScrollY = currentScrollY;
// }

// // Повторяем проверку каждые 100 мс
// let scrollMonitor = setInterval(checkScrollActivity, 100);

// function triggerVideoByScroll() {
// 	const video = $("#myVideo").get(0);
// 	if (video && video.paused) {
// 		video.muted = true;
// 		video.play()
// 			.then(() => {
// 				console.log("▶️ Видео запущено после scroll");
// 			})
// 			.catch(e => console.warn("🚫 Видео кккккне запустилось:", e));
// 	}

// 	// Удаляем таймер после срабатывания
// 	// clearInterval(scrollMonitor);
// }


	// Скрытие cover-изображения и показ слайдера
	$(document).scroll(function () {
		if ($('#slider-cover-img').is(":visible")) {
			setTimeout(function () {
				$('#slider-cover-img').fadeOut(500);
				setTimeout(function () {
					$('.swiper').css('position', 'unset');
					$('.swiper').fadeIn(500).css('opacity', 1);
				}, 500);
			}, 2000);
		}
	});

	// Авторасширение textarea
	const autoGrow = (element) => {
		element.style.height = "auto";
		element.style.height = element.scrollHeight + "px";
	};

	const messageTextarea = document.querySelector('textarea[name="message"]');
	if (messageTextarea) {
		messageTextarea.addEventListener("input", () => autoGrow(messageTextarea));
		window.addEventListener("load", () => autoGrow(messageTextarea));
	}
});

// Инициализация Swiper
let swiper = new Swiper(".mySwiper", {
	effect: "cards",
	grabCursor: true,
	centeredSlides: true,
	loop: true,
});

// === RSVP-форма ===

const form = document.getElementById("rsvp-form");
const guestsNumber = document.getElementById("guests_number");
const guests = document.getElementById("guests");
const extraFields = document.getElementById("extra-fields");
const extraFieldsGuests = document.getElementById("extra-fields-message");

function getAttendanceValue() {
	const selected = document.querySelector('input[name="attendance"]:checked');
	return selected ? selected.value : "";
}

function updateExtraGuestsVisibility() {
	const guestCount = parseInt(guestsNumber.value, 10);
	const attendance = getAttendanceValue();

	if (attendance === "Այո" && guestCount > 1) {
		guests.style.display = "block";
		guests.required = true;
	} else {
		guests.style.display = "none";
		guests.required = false;
		form.extra_guests.value = "";
	}
}

function handleAttendanceChange() {
	const attendance = getAttendanceValue();

	if (attendance === "Այո") {
		form.guests.value = "";

		extraFields.style.display = "block";
		extraFieldsGuests.style.display = "block";

		if (guestsNumber.value === "" || guestsNumber.value === "1") {
			guests.style.display = "none";
			guests.required = false;
		} else {
			guests.style.display = "block";
			guests.required = true;
		}
	} else {
		extraFields.style.display = "none";
		extraFieldsGuests.style.display = "none";
		guests.style.display = "none";
		guests.required = false;

		form.guests.value = "";
		form.extra_guests.value = "";
		form.message.value = "";
	}
}

// Слушаем выбор радиокнопок
document.querySelectorAll('input[name="attendance"]').forEach((radio) => {
	radio.addEventListener("change", handleAttendanceChange);
});

// Слушаем ввод количества гостей
guestsNumber.addEventListener("input", () => {
	if (guestsNumber.value < 1) {
		guestsNumber.value = 1;
	}
	updateExtraGuestsVisibility();
});

// Обработка формы отправки
form.addEventListener("submit", function (e) {
	e.preventDefault();

	const submitButton = form.querySelector("button[type='submit']");
	submitButton.disabled = true;
	submitButton.innerText = "Ուղարկվում է...";

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
				extraFieldsGuests.style.display = "none";
				guests.style.display = "none";
				guests.required = false;
			} else {
				console.warn("Սերվերի պատասխանը:", text);
				alert("Տեղի ունեցավ սխալ։ Խնդրում ենք փորձել ավելի ուշ։");
			}
		})
		.catch((err) => {
			console.error("Fetch սխալ:", err);
			alert("Տեղի ունեցավ սխալ։ Խնդրում ենք փորձել ավելի ուշ։");
		})
		.finally(() => {
			submitButton.disabled = false;
			submitButton.innerText = "Ուղարկել";
		});
});
