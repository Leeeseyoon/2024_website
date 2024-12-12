let list = document.querySelectorAll('.carousel .list .item');
let carousel = document.querySelector('.carousel');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let mockup = document.querySelector('.mockup');

let count = list.length;
let active = 0;
let leftMockup = 0;
let left_each_item = 100 / (list.length - 1);

next.onclick = () => {
    active = active >= count - 1 ? 0 : active + 1; // 다음 아이템으로 이동
    leftMockup = leftMockup + left_each_item; // mockup 위치 조정
    carousel.classList.remove('right'); // 오른쪽 전환 효과 제거
    changeCarousel(); // 캐러셀 변경 함수 호출
}

prev.onclick = () => {
    active = active <= 0 ? count - 1 : active - 1; // 이전 아이템으로 이동
    leftMockup = leftMockup - left_each_item; // mockup 위치 조정
    carousel.classList.add('right'); // 오른쪽 전환 효과 추가
    changeCarousel(); // 캐러셀 변경 함수 호출
}

function changeCarousel() {
    // 현재 hidden 클래스를 가진 아이템을 찾아서 제거
    let hidden_old = document.querySelector('.item.hidden');
    if (hidden_old) hidden_old.classList.remove('hidden');

    // 현재 active 클래스를 가진 아이템을 찾아서 hidden 클래스로 변경
    let active_old = document.querySelector('.item.active');
    active_old.classList.remove('active');
    active_old.classList.add('hidden');

    // 새로운 active 클래스를 가진 아이템 추가
    list[active].classList.add('active');

    // mockup 배경 변경
    mockup.style.setProperty('--left', leftMockup + '%');

    // 자동 전환 기능
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { next.click() }, 3000);
}



