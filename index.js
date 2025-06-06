$(document).ready(function () {
	let countDownDate = new Date("2025-08-08T00:00:00").getTime();

	const startTimer = () => {
		let now = new Date().getTime();

		let distance = countDownDate - now;

		let days = Math.floor(distance / (1000 * 60 * 60 * 24));
		let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		let seconds = Math.floor((distance % (1000 * 60)) / 1000);

		$("#days").text(days);
		$("#hours").text(hours);
		$("#minutes").text(minutes);
		$("#seconds").text(seconds);

		if (distance < 0) {
			clearInterval(x);
			$(".timer").html("EXPIRED");
		}
	}
	startTimer();
	const x = setInterval(startTimer, 1000);

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
	$(document).scroll(function () {
		if ($('#slider-cover-img').is(":visible")) {
			setTimeout(function () {
				$('#slider-cover-img').fadeOut(500); // Smoothly hide the cover image
				setTimeout(function () {
					$('.swiper').css('position', 'unset');
					$('.swiper').fadeIn(500).css('opacity', 1) // Show the slider
				}, 500); // Delay to match the fade out duration
			}, 2000); // Delay to match the fade out duration
		}
	});

});

let swiper = new Swiper(".mySwiper", {
	effect: "cards",
	grabCursor: true,
	centeredSlides: true,
	loop: true,
});