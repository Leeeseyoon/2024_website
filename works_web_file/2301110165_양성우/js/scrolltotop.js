document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // 스크롤이 200px 이상 내려갔을 때 버튼 표시
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 200) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // 버튼 클릭 시 맨 위로 부드럽게 스크롤
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});