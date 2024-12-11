function setRandomPosition() {
    const floatingImages = document.querySelectorAll('.floating-img');
    
    floatingImages.forEach(image => {
        // -15px에서 15px 사이의 더 작은 랜덤한 값 생성
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        
        // CSS 변수 업데이트
        image.style.setProperty('--random-x', `${randomX}px`);
        image.style.setProperty('--random-y', `${randomY}px`);
    });
}

// 2초마다 새로운 랜덤 위치 설정
setInterval(setRandomPosition, 2000);

// 초기 실행
setRandomPosition();