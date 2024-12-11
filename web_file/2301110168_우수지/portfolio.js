// 각 버튼과 포트폴리오 창을 변수로 설정
const uImg = document.querySelector('.U_img');
const gImg = document.querySelector('.G_img');
const wImg = document.querySelector('.W_img');
const closeButtons = document.querySelectorAll('.close a');

const ulsanPort = document.querySelector('.ulsan');
const greenPort = document.querySelector('.green');
const wePort = document.querySelector('.we');

// 모든 포트폴리오 창 숨기기
function hideAllPorts() {
    ulsanPort.style.display = 'none';
    greenPort.style.display = 'none';
    wePort.style.display = 'none';
}

// 초기 상태: 포트폴리오 창 숨김
hideAllPorts();

// 각각의 버튼에 클릭 이벤트 설정
uImg.addEventListener('click', () => {
    hideAllPorts(); // 다른 창 숨기기
    ulsanPort.style.display = 'block'; // 울산 포트폴리오 보이기
});

gImg.addEventListener('click', () => {
    hideAllPorts(); // 다른 창 숨기기
    greenPort.style.display = 'block'; // 그린피스 포트폴리오 보이기
});

wImg.addEventListener('click', () => {
    hideAllPorts(); // 다른 창 숨기기
    wePort.style.display = 'block'; // 우리의식탁 포트폴리오 보이기
});

// 닫기 버튼에 클릭 이벤트 설정
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // 기본 동작 방지
        hideAllPorts(); // 모든 창 숨기기
    });
});

document.addEventListener("DOMContentLoaded", function () {
const b_B = document.querySelector(".b_B");

// B 버튼 클릭 시 뒤로가기 기능
b_B.addEventListener("click", function (event) {
    event.preventDefault(); // 기본 동작 방지
    window.history.back(); // 뒤로가기
});
});