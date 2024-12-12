const modalOpenButton4 = document.getElementById('modalOpenButton4');
const modalOpenButton5 = document.getElementById('modalOpenButton5');
const modalOpenButton6 = document.getElementById('modalOpenButton6');
const modalCloseButton4 = document.getElementById('modalCloseButton4');
const modalCloseButton5 = document.getElementById('modalCloseButton5');
const modalCloseButton6 = document.getElementById('modalCloseButton6');
const modal4 = document.getElementById('modalContainer4');
const modal5 = document.getElementById('modalContainer5');
const modal6 = document.getElementById('modalContainer6');

// 모달을 숨기는 함수
const toggleModal = (modal) => {
    modal.classList.toggle('hidden');
};

// 버튼 클릭 시 모달 열기
modalOpenButton4.addEventListener('click', () => toggleModal(modal4));
modalOpenButton5.addEventListener('click', () => toggleModal(modal5));
modalOpenButton6.addEventListener('click', () => toggleModal(modal6));


// 닫기 버튼 클릭 시 모달 닫기
modalCloseButton4.addEventListener('click', () => toggleModal(modal4));
modalCloseButton5.addEventListener('click', () => toggleModal(modal5));
modalCloseButton6.addEventListener('click', () => toggleModal(modal6));

// 모달의 배경 클릭 시 닫기
window.addEventListener('click', function (event) {
    if (event.target === modal4) {
        toggleModal(modal4);
    } else if (event.target === modal5) {
        toggleModal(modal5);
    } else if (event.target === modal6) {
        toggleModal(modal6);
    } 
});

// 페이지 로드 시 모달이 열리지 않도록 하기 위해 기본적으로 'hidden' 클래스가 적용되어야 합니다.
// 따라서 HTML에서 'hidden' 클래스를 사용하여 모달을 숨겨둡니다.




