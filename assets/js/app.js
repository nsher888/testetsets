import { historyTextObject } from "./history-data.js";

const nav = document.querySelector(".nav");
const navOuter = document.querySelector("#nav-outer");
const navToggle = document.querySelector(".mobile-nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");
const openModal = document.querySelector(".about__btn");
const modal = document.querySelector(".instructions");
const modalClose = document.querySelector(".instructions__buttons__close");
const chatStart = document.querySelector("#chat-start-text");
const historyModal = document.querySelector(".history-items");
const histyoryModalCloseBtn = document.querySelector(".full-text-btn-close");

openModal.addEventListener("click", () => {
	modal.showModal();
	document.body.classList.toggle("stop-scrolling");
});

modalClose.addEventListener("click", () => {
	modal.close();
	document.body.classList.toggle("stop-scrolling");
});

modal.addEventListener("click", (e) => {
	if (e.target === modal) {
		modal.close();
		document.body.classList.toggle("stop-scrolling");
	}
});

navToggle.addEventListener("click", () => {
	const visibility = nav.getAttribute("data-visible");
	document.body.classList.toggle("stop-scrolling");

	if (visibility === "false") {
		nav.setAttribute("data-visible", true);
		navToggle.setAttribute("aria-expanded", true);
	} else {
		nav.setAttribute("data-visible", false);
		navToggle.setAttribute("aria-expanded", false);
	}

	navLinks.forEach((element) => {
		element.addEventListener("click", () => {
			nav.setAttribute("data-visible", false);
			navToggle.setAttribute("aria-expanded", false);
			document.body.classList.remove("stop-scrolling");
		});
	});
});

// ინსტრუქციის მოდალის ფუნქციონალი
const tabs = document.querySelectorAll(".tabcontent");
const dots = document.querySelectorAll(".dots");
const nextButton = document.querySelector(".instructions__buttons__next");
let currentTab = 0;

dots.forEach((dot, index) => {
	dot.addEventListener("click", () => {
		currentTab = index;
		updateTabs();
	});
});

nextButton.addEventListener("click", () => {
	currentTab = (currentTab + 1) % tabs.length;
	updateTabs();
});

function updateTabs() {
	tabs.forEach((tab, index) => {
		if (index === currentTab) {
			tab.style.display = "block";
			dots[index].classList.add("active");
		} else {
			tab.style.display = "none";
			dots[index].classList.remove("active");
		}
	});
}

updateTabs();

// ჩატის დაწყების ღილაკზე ფანჯრის გახსნა
chatStart.addEventListener("click", () => {
	document.querySelector(".chatbot__btn").click();
});

// ჩეთის ფანჯრის გახსნა
document.querySelector(".chatbot__btn").addEventListener("click", (e) => {
	let child = e.target.querySelector("div");

	if (child.className == "chatbot__open__btn") {
		child.className = "chatbot__close__btn";
		document
			.getElementById("chatbotIframe")
			.setAttribute("style", "display: block;");
	} else {
		child.className = "chatbot__open__btn";
		document
			.getElementById("chatbotIframe")
			.setAttribute("style", "display: none");
	}
});

// ACCORDION

const accItems = document.querySelectorAll(".footer__column");

accItems.forEach((listElement) => {
	listElement.addEventListener("click", () => {
		if (listElement.classList.contains("active")) {
			listElement.classList.remove("active");
		} else {
			accItems.forEach((listE) => {
				listE.classList.remove("active");
			});
			listElement.classList.toggle("active");
		}
	});
});

new Glide(".glide-anima", {
	type: "carousel",
	perView: 1.1,
	breakpoints: {
		1243: {
			perView: 2,
		},
		858: {
			perView: 1.8,
		},
		768: {
			perView: 1.5,
		},
		600: {
			perView: 1.1,
		},
	},
}).mount();

new Glide(".glide-history", {
	type: "carousel",
	perView: 1.5,
	breakpoints: {
		500: {
			perView: 1.2,
		},
	},
}).mount();

// HISTORY DIALOG WINDOW FUNCTIONALITY

const historySlides = document.querySelectorAll(".glide-slide-text");
const fullTextShowBtns = document.querySelectorAll(".full-text-btn");

historySlides.forEach((slide, index) => {
	if (slide.textContent.length > 200) {
		fullTextShowBtns[index].style.display = "flex";
		fullTextShowBtns[index].addEventListener("click", (e) => {
			const parentElement = e.target.parentNode.parentNode;
			const srcImgValue = parentElement.querySelector("img").src;
			const srcTitle =
				parentElement.querySelector(".history__title").textContent;
			const srcText =
				parentElement.querySelector(".history__text").textContent;

			historyModal.querySelector("img").src = srcImgValue;
			historyModal.querySelector(".history__title").textContent =
				srcTitle;
			historyModal.querySelector(".history__text").textContent = srcText;
			historyModal.showModal();
			document.body.classList.toggle("stop-scrolling");
		});
	}
});

historyModal.addEventListener("click", (e) => {
	if (e.target === historyModal) {
		historyModal.close();
		document.body.classList.toggle("stop-scrolling");
	}
});

histyoryModalCloseBtn.addEventListener("click", (e) => {
	historyModal.close();
	document.body.classList.toggle("stop-scrolling");
});

// SOLAR PLANETS SECTION DRAGGING FUNCTIONALITY

// get the solar__planets div
const solarPlanets = document.querySelector(".solar__planets");

// add scroll functionality
solarPlanets.style.overflowX = "scroll";

// add drag functionality
let isDragging = false;
let touchStartX = 0;
let scrollLeftStart = 0;

solarPlanets.addEventListener("mousedown", (e) => {
	isDragging = true;
	touchStartX = e.pageX - solarPlanets.offsetLeft;
	scrollLeftStart = solarPlanets.scrollLeft;
});

solarPlanets.addEventListener("mouseup", () => {
	isDragging = false;
});

solarPlanets.addEventListener("mousemove", (e) => {
	if (!isDragging) return;
	e.preventDefault();
	const touchMoveX = e.pageX - solarPlanets.offsetLeft;
	const distanceX = touchMoveX - touchStartX;
	solarPlanets.scrollLeft = scrollLeftStart - distanceX;
});

solarPlanets.addEventListener("touchstart", (e) => {
	isDragging = true;
	touchStartX = e.touches[0].pageX - solarPlanets.offsetLeft;
	scrollLeftStart = solarPlanets.scrollLeft;
});

solarPlanets.addEventListener("touchend", () => {
	isDragging = false;
});

solarPlanets.addEventListener("touchmove", (e) => {
	if (!isDragging) return;
	const touchMoveX = e.touches[0].pageX - solarPlanets.offsetLeft;
	const distanceX = touchMoveX - touchStartX;
	solarPlanets.scrollLeft = scrollLeftStart - distanceX;
});

//
const texts = document.querySelectorAll(".history__text");

texts.forEach((item) => {
	if (item.classList.contains("tales__text")) {
		item.textContent = historyTextObject.tales;
	} else if (item.classList.contains("writings__text")) {
		item.textContent = historyTextObject.writings;
	} else if (item.classList.contains("miths__text")) {
		item.textContent = historyTextObject.miths;
	}
});
