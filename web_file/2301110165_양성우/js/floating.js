function setRandomPosition() {
    const floatingImages = document.querySelectorAll('.floating-image');
    
    floatingImages.forEach(image => {
        // -30px에서 30px 사이의 랜덤한 값 생성
        const randomX = (Math.random() - 0.5) * 40;
        const randomY = (Math.random() - 0.5) * 40;
        
        // CSS 변수 업데이트
        image.style.setProperty('--random-x', `${randomX}px`);
        image.style.setProperty('--random-y', `${randomY}px`);
    });
}

// 5초마다 새로운 랜덤 위치 설정
setInterval(setRandomPosition, 5000);

// 초기 실행
setRandomPosition();



