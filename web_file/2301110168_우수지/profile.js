document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.game_w'); // 각 슬라이드 요소 선택
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.previous');
    let currentIndex = 0; // 현재 슬라이드 인덱스 초기화

    // 슬라이드 전환 업데이트 함수
    function updateSlide() {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(-${currentIndex * 100}%)`; // 슬라이드 이동
        });

        // 첫 슬라이드일 때 previous 버튼 숨기기, 마지막 슬라이드일 때 next 버튼 숨기기
        prevButton.style.display = currentIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentIndex === slides.length - 1 ? 'none' : 'block';
    }

    // next 버튼 클릭 시 다음 슬라이드로 이동
    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlide();
        }
    });

    // previous 버튼 클릭 시 이전 슬라이드로 이동
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide();
        }
    });

    // 초기 슬라이드 상태 업데이트
    updateSlide();
});

document.addEventListener("DOMContentLoaded", function () {
    const b_B = document.querySelector(".b_B");

    // B 버튼 클릭 시 뒤로가기 기능
    b_B.addEventListener("click", function (event) {
        event.preventDefault(); // 기본 동작 방지
        window.history.back(); // 뒤로가기
    });
});