document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.bf-slider-container');
    const slides = document.querySelectorAll('.bf-slider .bf-slide');
    const prevBtn = document.querySelector('.bf-slider-prev');
    const nextBtn = document.querySelector('.bf-slider-next');
    
    let currentIndex = 0;
    
    function updateSlider() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }
    
    // 버튼 이벤트 리스너
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
}); 