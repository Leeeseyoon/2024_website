(function () {
    const cursor = document.querySelector('.custom_cursor');
    
    // 메인 마우스 이동 이벤트를 단순화
    function moveCursor(e) {
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }

    // 페이지 로드 시점에 관계없이 마우스 이벤트 바로 적용
    document.addEventListener('mousemove', moveCursor);

    // 커서 크기 변경 함수
    function cursorScaleUp() {
        cursor.style.transform = 'scale(4) translate(-25%, -25%)';
        cursor.style.mixBlendMode = 'difference';
    }
    
    function cursorScaleDown() {
        cursor.style.transform = 'translate(-50%, -50%)';
        cursor.style.mixBlendMode = 'normal';
    }

    // 호버 효과가 필요한 요소들에 이벤트 추가
    const hoverElements = document.querySelectorAll('.info_title h2, .identity_title, .tab_title h2, .tab_img img, .category_btn');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', cursorScaleUp);
        element.addEventListener('mouseleave', cursorScaleDown);
    });
})();