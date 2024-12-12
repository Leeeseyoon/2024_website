// 모달 열기 버튼
const modalOpenButton1 = document.getElementById('modalOpenButton1');
const modalOpenButton2 = document.getElementById('modalOpenButton2');
const modalOpenButton3 = document.getElementById('modalOpenButton3');

// 모달 닫기 버튼
const modalCloseButton1 = document.getElementById('modalCloseButton1');
const modalCloseButton2 = document.getElementById('modalCloseButton2');

// 모달 컨테이너
const modal1 = document.getElementById('modalContainer1');
const modal2 = document.getElementById('modalContainer2');

// 슬라이드 관련 변수
let currentIndex1 = 0;
let currentIndex2 = 0;

// 모달 열기
modalOpenButton1.addEventListener('click', () => {
    modal1.classList.remove('hidden');
});

modalOpenButton2.addEventListener('click', () => {
    modal2.classList.remove('hidden');
});

// 모달 닫기
modalCloseButton1.addEventListener('click', () => {
    modal1.classList.add('hidden');
});

modalCloseButton2.addEventListener('click', () => {
    modal2.classList.add('hidden');
});

// 슬라이드 기능
const showImage = (slider, index) => {
    const images = slider.querySelectorAll('.image-slider img');
    const totalImages = images.length;
    index = (index + totalImages) % totalImages; // 인덱스를 순환 처리
    const offset = -index * 100; // 슬라이드 이동
    images.forEach((img) => {
        img.style.transform = `translateX(${offset}%)`;
    });
    return index; // 현재 인덱스를 반환
};

// 슬라이드 버튼 클릭 이벤트
document.getElementById('modalPrevButton1').addEventListener('click', () => {
    currentIndex1 = showImage(modal1, currentIndex1 - 1);
});

document.getElementById('modalNextButton1').addEventListener('click', () => {
    currentIndex1 = showImage(modal1, currentIndex1 + 1);
});

document.getElementById('modalPrevButton2').addEventListener('click', () => {
    currentIndex2 = showImage(modal2, currentIndex2 - 1);
});

document.getElementById('modalNextButton2').addEventListener('click', () => {
    currentIndex2 = showImage(modal2, currentIndex2 + 1);
});

// 모달의 배경 클릭 시 닫기
window.addEventListener('click', function (event) {
    if (event.target === modal1) {
        modal1.classList.add('hidden');
    } else if (event.target === modal2) {
        modal2.classList.add('hidden');
    }
});
