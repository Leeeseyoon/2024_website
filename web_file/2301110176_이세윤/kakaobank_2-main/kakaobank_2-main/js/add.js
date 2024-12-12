var swiper = new Swiper(".swiper", {
    grabCursor: true,
    centeredSlides: true,
    speed: 400,
    spaceBetween: 900,
    slidesPerView: "auto",
    effect: "coverflow",
    loop: true,
    coverflowEffect: {
        rotate: 0,
        stretch: 150,
        depth: 200,
        modifier: 1,
        slideShadows: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    mousewheel: {
        invert: false,
        thresholdDelta: 50,
        sensitivity: 1,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

})



// 각 swiper-slide 클릭 시 해당 슬라이드로 이동
const slides = document.querySelectorAll('.swiper-slide');
slides.forEach((slide, index) => {
    slide.addEventListener('click', (event) => {
        event.stopPropagation(); // 클릭 이벤트 전파 중지
        swiper.slideTo(index); // 해당 슬라이드로 이동
    });
    
});
