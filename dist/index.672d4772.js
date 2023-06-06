const newsletterForm = document.querySelector(".footer-newsletter__form");
const footerYearInfo = document.querySelectorAll(".year");
const hamburgerBtn = document.querySelector(".hamburger");
const gridRows = document.querySelector(".grid-rows");
const ctaButtonMobile = document.querySelector(".cta-button-mobile");
const mobileNavigation = document.querySelector(".nav-mobile");
const allMobileNavElements = document.querySelectorAll(".nav__list--mobile .nav__link");
const mobileCopyright = document.querySelector(".footer-newsletter__copyright--mobile");
const desktopCopyright = document.querySelector(".footer-newsletter__copyright--desktop");
const listenerEvents = [
    "keyup",
    "click"
];
getScreenWidth();
getYear();
function getYear() {
    const userRegion = navigator.language;
    const dateTimeFormatter = new Intl.DateTimeFormat(userRegion, {
        year: "numeric"
    });
    const currentYear = new Date().getFullYear();
    const formattedYear = dateTimeFormatter.format(new Date(currentYear, 0, 1));
    footerYearInfo.forEach((element)=>{
        element.textContent = formattedYear;
    });
}
function getScreenWidth() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 500) {
        mobileCopyright.setAttribute("aria-hidden", false);
        desktopCopyright.setAttribute("aria-hidden", true);
    }
}
function checkAttribute(attributeValue) {
    return attributeValue === "false";
}
function setAttribute(element, attributeName, attributeValue) {
    element.setAttribute(attributeName, attributeValue);
}
function toggleScrollbarVisibility() {
    document.body.classList.toggle("scrollbar-hidden");
}
function toggleNavigation() {
    const mobileNavigationAttributeValue = mobileNavigation.getAttribute("aria-expanded");
    hamburgerBtn.classList.toggle("is-active");
    gridRows.classList.toggle("active");
    ctaButtonMobile.classList.toggle("active");
    mobileNavigation.classList.toggle("active");
    toggleScrollbarVisibility();
    checkAttribute(mobileNavigationAttributeValue) ? setAttribute(mobileNavigation, "aria-expanded", true) : setAttribute(mobileNavigation, "aria-expanded", false);
}
function checkNavigationCondition(conditions) {
    return conditions.every((condition)=>condition);
}
function disableNavigation(event) {
    const conditions = {
        conditionKey: event.key === "Escape",
        conditionActiveGrid: gridRows.matches(".active"),
        conditionActiveHamburger: !event.target.matches(".hamburger")
    };
    const keyEventConditions = checkNavigationCondition([
        conditions.conditionKey,
        conditions.conditionActiveGrid
    ]);
    const clickEventConditions = checkNavigationCondition([
        conditions.conditionActiveHamburger,
        conditions.conditionActiveGrid
    ]);
    if (event.target === gridRows) return;
    if (keyEventConditions || clickEventConditions) toggleNavigation();
}
listenerEvents.forEach((listenerEvent)=>document.addEventListener(listenerEvent, (event)=>disableNavigation(event)));
hamburgerBtn.addEventListener("click", toggleNavigation);
allMobileNavElements.forEach((element)=>element.addEventListener("click", toggleNavigation));
newsletterForm.addEventListener("submit", (event)=>{
    event.preventDefault();
});
/// ////////////////////////////////////
//
function carousel() {
    let currentSlide = 1;
    let autoPlayInterval;
    const carouselButtons = document.querySelectorAll(".carousel__btn");
    const allCarouselSections = document.querySelectorAll(".carousel-section");
    const carouselDots = document.querySelectorAll(".carousel__dots");
    const maxSlides = allCarouselSections.length;
    const AUTO_PLAY_TIMEOUT = 12;
    function getDot(currentSlideDot) {
        const carouselDotsCopy = [
            ...carouselDots
        ];
        carouselDotsCopy.forEach((dot)=>dot.classList.remove("active"));
        document.querySelector(`.carousel__dots[data-slide="${currentSlideDot}"]`).classList.add("active");
    }
    getDot(currentSlide);
    function moveSlider(slideNumber) {
        const allCarouselSectionsCopy = [
            ...allCarouselSections
        ];
        allCarouselSectionsCopy.forEach((carouselSection)=>{
            const { slide  } = carouselSection.dataset;
            currentSlide = slideNumber || currentSlide;
            carouselSection.style.transform = `translate(${slide * 100 - currentSlide * 100}%, -${100 * slide - 100}%)`;
        });
    }
    function autoPlaySlider() {
        autoPlayInterval = setInterval(()=>{
            currentSlide += 1;
            if (currentSlide > maxSlides) currentSlide = 1;
            moveSlider(currentSlide);
            getDot(currentSlide);
        }, AUTO_PLAY_TIMEOUT * 1000);
    }
    function disactiveDots() {
        const carouselDotsCopy = [
            ...carouselDots
        ];
        carouselDotsCopy.forEach((carouselDot)=>carouselDot.classList.remove("active"));
    }
    autoPlaySlider();
    function turnToLeft() {
        currentSlide -= 1;
        if (currentSlide === 0) currentSlide = maxSlides;
        clearTimeout(autoPlayInterval);
        autoPlaySlider();
    }
    function turnToRight() {
        currentSlide += 1;
        if (currentSlide > maxSlides) currentSlide = 1;
        clearTimeout(autoPlayInterval);
        autoPlaySlider();
    }
    function slider(button) {
        const { direction  } = button.dataset;
        disactiveDots();
        direction === "left" ? turnToLeft() : turnToRight();
        getDot(currentSlide);
        moveSlider();
    }
    carouselButtons.forEach((button)=>button.addEventListener("click", ()=>{
            slider(button);
        }));
    function activeDots(event) {
        const currentTarget = event.target;
        disactiveDots();
        currentTarget.classList.add("active");
        const { slide  } = currentTarget.dataset;
        moveSlider(+slide);
        clearTimeout(autoPlayInterval);
        autoPlaySlider();
    }
    carouselDots.forEach((carouselDot)=>carouselDot.addEventListener("click", (event)=>{
            activeDots(event);
        }));
}
const startCarousel = carousel;
startCarousel();

//# sourceMappingURL=index.672d4772.js.map
