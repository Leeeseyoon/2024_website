document.addEventListener('DOMContentLoaded', () => {
    const eyeBall = document.querySelector('.eye-ball');
    const eyeWrap = document.querySelector('.eye-wrap2');

    window.addEventListener('mousemove', (event) => {
        // PC 크기 기준점 설정 (예: 1024px)
        const MIN_PC_WIDTH = 1024;
        
        // 현재 화면 너비가 PC 크기보다 작으면 동작하지 않음
        if (window.innerWidth < MIN_PC_WIDTH) {
            eyeBall.style.transform = 'translate(0px, 0px)';
            return;
        }

        const eyeWrapRect = eyeWrap.getBoundingClientRect();
        
        // 눈 컨테이너의 중심점 계산
        const eyeCenterX = eyeWrapRect.left + (eyeWrapRect.width / 2);
        const eyeCenterY = eyeWrapRect.top + (eyeWrapRect.height / 2);
        
        // 마우스와 눈 중심점 사이의 거리 계산
        const deltaX = event.clientX - eyeCenterX;
        const deltaY = event.clientY - eyeCenterY;
        
        // 눈동자의 최대 이동 반경 (왼쪽은 더 크게 설정)
        const maxRadiusRight = eyeWrapRect.width * 0.35;
        const maxRadiusLeft = eyeWrapRect.width * 0.55;  // 왼쪽 반경을 55%로 증가
        
        // 수직 방향 최대 반경 설정
        const maxRadiusVertical = eyeWrapRect.height * 0.3; // 수직 방향은 30%로 제한
        
        // 현재 거리 계산
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // 비율 계산하여 위치 조정
        let moveX = deltaX;
        let moveY = deltaY;
        
        // 왼쪽과 오른쪽의 최대 반경을 다르게 적용
        const maxRadius = deltaX < 0 ? maxRadiusLeft : maxRadiusRight;
        
        if (distance > maxRadius) {
            const ratio = maxRadius / distance;
            moveX *= ratio;
            moveY *= ratio;
        }
        
        // 수직 방향 제한 추가
        moveY = Math.max(Math.min(moveY, maxRadiusVertical), -maxRadiusVertical);
        
        // 눈동자 위치 업데이트
        eyeBall.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});















    

    