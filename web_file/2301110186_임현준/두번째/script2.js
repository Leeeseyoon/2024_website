document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll(".menu ul li a");

    // 각 메뉴 항목에 대한 클릭 이벤트 추가
    menuItems.forEach(function(item) {
        item.addEventListener("click", function(event) {
            // 모든 메뉴 항목의 활성화 상태를 해제
            menuItems.forEach(function(menuItem) {
                menuItem.classList.remove("active");
            });
            
            // 클릭된 메뉴 항목에만 active 클래스 추가
            event.target.classList.add("active");
        });
    });
});

// 스크롤 맨 위로 올라가는 버튼을 보여주거나 숨깁니다.
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollToTopBtn").style.display = "block";
    } else {
        document.getElementById("scrollToTopBtn").style.display = "none";
    }
}

// 맨 위로 스크롤하는 함수
function topFunction() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE 및 Opera
}

// 맨 위로 스크롤하는 함수
function topFunction() {
    // 현재 스크롤 위치
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

    // 매 10ms마다 20px씩 스크롤을 위로 이동하는 애니메이션을 생성
    if (currentScroll > 0) {
        window.requestAnimationFrame(topFunction);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
    }
}

