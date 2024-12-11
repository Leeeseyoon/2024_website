document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); // 기본 클릭 동작 방지
        const targetId = this.getAttribute('href'); // 클릭한 링크의 href 속성 값 가져오기
        const targetElement = document.querySelector(targetId); // 타겟 요소 선택

        if (targetElement) {
            // 부드러운 스크롤 애니메이션
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth' // 부드럽게 스크롤
            });
        }
    });
});