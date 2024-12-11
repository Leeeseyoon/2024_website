function createStars() {
    const eyewrap = document.querySelector('.eyewrap');
    const starsContainer = document.getElementById('stars');
    const stars = [];
    const numStars = 70;

    // 별들 초기화
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        starsContainer.appendChild(star);
    }
}

window.addEventListener('load', createStars);





/* document.querySelectorAll('.floating-square').forEach(square => {
    square.addEventListener('click', function() {
        // 클릭된 네모 조각에 active 클래스 토글
        this.classList.toggle('active');

        // eye-ball 색깔을 서서히 검은색으로 변경
        const eyeBall = document.querySelector('.eye-ball');
        eyeBall.style.transition = 'background-color 0.5s';
        eyeBall.style.backgroundColor = eyeBall.style.backgroundColor === 'black' ? '' : 'black';
    });
}); */


document.querySelectorAll('.floating-square').forEach(square => {
    // 각 네모마다 다른 랜덤한 애니메이션 적용
    const randomX = Math.random() * 20 - 10; // -10px에서 10px 사이
    const randomY = Math.random() * 20 - 10; // -10px에서 10px 사이
    
    square.style.animation = `float-random 5s ease-in-out infinite`;
    square.style.setProperty('--random-x', `${randomX}px`);
    square.style.setProperty('--random-y', `${randomY}px`);
});