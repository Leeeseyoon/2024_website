let slideIndex = 0;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");

// 초기 슬라이드 표시
showSlides();

function showSlides() {
    // 모든 슬라이드 숨기기
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // 다음 슬라이드 인덱스 계산
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // 현재 슬라이드와 닷 표시
    slides[slideIndex - 1].style.opacity = "1";
    dots[slideIndex - 1].className += " active";

    // 3초마다 자동 전환
    setTimeout(showSlides, 3000);
}

// 수동 제어 함수
function changeSlide(n) {
    // 모든 슬라이드 숨기기
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slideIndex += n;
    
    // 범위 체크
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }

    // 선택된 슬라이드와 닷 표시
    slides[slideIndex - 1].style.opacity = "1";
    dots[slideIndex - 1].className += " active";
}

function currentSlide(n) {
    // 모든 슬라이드 숨기기
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slideIndex = n;
    
    // 선택된 슬라이드와 닷 표시
    slides[slideIndex - 1].style.opacity = "1";
    dots[slideIndex - 1].className += " active";
}

// 스크롤 애니메이션
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.bottom-slogan, .second-content');
    const triggerBottom = window.innerHeight * 0.8;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('active');
        } else {
            element.classList.remove('active'); // 화면 위로 올라가면 애니메이션 초기화 (선택사항)
        }
    });
}

// 스크롤 이벤트 리스너
window.addEventListener('scroll', handleScrollAnimation);
// 초기 로드 시에도 체크
window.addEventListener('load', handleScrollAnimation);

// 기존 스크롤 애니메이션 함수에 추가
function handleScrollAnimation() {
    const scrollTexts = document.querySelectorAll('.scroll-text, .bottom-slogan');
    const triggerBottom = window.innerHeight * 0.8;

    scrollTexts.forEach(text => {
        const textTop = text.getBoundingClientRect().top;

        if (textTop < triggerBottom) {
            text.classList.add('active');
        } else {
            text.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.product-track');
    const cards = track.querySelectorAll('.product-card');
    
    // 원본 카드들을 복제하여 끊김 없는 스크롤 구현
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });
});

