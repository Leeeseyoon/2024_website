const modalOpenButton1 = document.getElementById('modalOpenButton1');
const modalOpenButton2 = document.getElementById('modalOpenButton2');
const modalOpenButton3 = document.getElementById('modalOpenButton3');
const modalCloseButton1 = document.getElementById('modalCloseButton1');
const modalCloseButton2 = document.getElementById('modalCloseButton2');
const modalCloseButton3 = document.getElementById('modalCloseButton3');
const modal1 = document.getElementById('modalContainer1');
const modal2 = document.getElementById('modalContainer2');
const modal3 = document.getElementById('modalContainer3');

// 모달을 숨기는 함수
const toggleModal = (modal) => {
    if (modal) {
        modal.classList.toggle('hidden');
        // 모달이 열릴 때 현재 인덱스를 0으로 리셋
        if (!modal.classList.contains('hidden')) {
            const slider = modal.querySelector('.image-slider');
            if (slider) {
                const images = slider.querySelectorAll('.img');
                images.forEach((img, i) => {
                    img.style.display = i === 0 ? 'block' : 'none';
                });
            }
        }
    }
};

// 버튼 클릭 시 모달 열기
modalOpenButton1.addEventListener('click', () => toggleModal(modal1));
modalOpenButton2.addEventListener('click', () => toggleModal(modal2));
modalOpenButton3.addEventListener('click', () => toggleModal(modal3));


// 닫기 버튼 클릭 시 모달 닫기
modalCloseButton1.addEventListener('click', () => toggleModal(modal1));
modalCloseButton2.addEventListener('click', () => toggleModal(modal2));
modalCloseButton3.addEventListener('click', () => toggleModal(modal3));

// 모달의 배경 클릭 시 닫기
window.addEventListener('click', function (event) {
    if (event.target === modal1) {
        toggleModal(modal1);
    } else if (event.target === modal2) {
        toggleModal(modal2);
    } else if (event.target === modal3) {
        toggleModal(modal3);
    } 
});

// 페이지 로드 시 모달이 열리지 않도록 하기 위해 기본적으로 'hidden' 클래스가 적용되어야 합니다.
// 따라서 HTML에서 'hidden' 클래스를 사용하여 모달을 숨겨둡니다.

