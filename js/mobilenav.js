document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const slideMenu = document.querySelector('.slide-menu');
    
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        slideMenu.classList.toggle('active');
    });
});