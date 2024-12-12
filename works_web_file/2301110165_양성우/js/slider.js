document.addEventListener('DOMContentLoaded', function() {
    const eventSlider = document.querySelector('.event-slider');
    const slides = document.querySelectorAll('.event-slide');
    let currentSlide = 0;
    const totalSlides = slides.length;
    const isMobile = window.innerWidth <= 768; // 모바일 여부 확인

    // 슬라이드 복제
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        eventSlider.appendChild(clone);
    });

    // 슬라이드 너비를 설정
    slides.forEach(slide => {
        slide.style.width = isMobile ? '100%' : '50%'; // 모바일에서는 100%, 그 외에는 50%
    });

    // 슬라이드 이동 함수
    function moveSlide() {
        currentSlide++;
        eventSlider.style.transition = 'transform 0.5s ease-in-out';
        // 모바일에서는 100%, 그 외에는 50%만큼 이동
        const movePercentage = isMobile ? 100 : 50;
        eventSlider.style.transform = `translateX(-${currentSlide * movePercentage}%)`;

        // 마지막 슬라이드에 도달했을 때
        if (currentSlide >= totalSlides) {
            setTimeout(() => {
                eventSlider.style.transition = 'none';
                currentSlide = 0;
                eventSlider.style.transform = `translateX(0)`;
            }, 500);
        }
    }

    // 3초마다 슬라이드 이동
    setInterval(moveSlide, 3000);
});


