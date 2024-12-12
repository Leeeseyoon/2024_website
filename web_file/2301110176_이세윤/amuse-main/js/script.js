document.addEventListener('DOMContentLoaded', function() {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slider img');
    const totalSlides = slides.length;

    const showSlide = (index) => {
        const slider = document.querySelector('.slider');
        slider.style.transform = `translateX(${-index * 100}%)`;
    };

    document.getElementById('next').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    });

    document.getElementById('prev').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    });

    let startX, endX;

    const handleDragStart = (event) => {
        startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
    };

    const handleDragEnd = (event) => {
        endX = event.type === 'mouseup' ? event.clientX : event.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) { // 드래그 거리 임계값 설정
            if (diffX > 0) {
                currentIndex = (currentIndex + 1) % totalSlides;
            } else {
                currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            }
            showSlide(currentIndex);
        }
    };

    slides.forEach(slide => {
        slide.addEventListener('mousedown', handleDragStart);
        slide.addEventListener('mouseup', handleDragEnd);
        slide.addEventListener('touchstart', handleDragStart);
        slide.addEventListener('touchend', handleDragEnd);
    });

    // 초기 슬라이드 표시
    showSlide(currentIndex);
});
