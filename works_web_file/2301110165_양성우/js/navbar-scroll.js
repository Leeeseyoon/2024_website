/* document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) { // 50px 이상 스크롤되면
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}); */



let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // 아래로 스크롤
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // 위로 스크롤
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});