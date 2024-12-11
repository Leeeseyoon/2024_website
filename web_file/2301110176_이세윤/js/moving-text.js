document.addEventListener('DOMContentLoaded', function() {
    const movingText = document.querySelector('.moving-text');
    const toamto = document.querySelector('.toamto'); // .toamto 요소 선택
    let position = -movingText.offsetWidth; // 초기 위치를 화면 밖으로 설정

    // CSS 스타일 추가
    document.body.style.overflowX = 'hidden'; // 가로 스크롤 숨기기

    function moveText() {
        position += 10; // 이동 속도
        movingText.style.transform = `translateX(${position}px)`; // 위치 업데이트

        // 원래 위치에 도달하면 애니메이션 멈춤
        if (position >= -1) {
            return; // 애니메이션 종료
        }

        requestAnimationFrame(moveText); // 애니메이션 반복
    }

    // 파티클 생성 함수
    function createParticle(x, y) {
        const particle = document.createElement('div');
        document.body.appendChild(particle);
        
        // 랜덤 각도와 거리 계산
        const angle = Math.random() * Math.PI * 2;
        const velocity = 1 + Math.random() * 5;
        const size = Math.random() * 25 + 15; // 15px ~ 40px 범위로 수정
        
        // 파티클 스타일 설정
        particle.style.position = 'fixed';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = 'url("images/Tomato.png") center/contain no-repeat';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9';  // 버튼보다 낮은 z-index 설정
        
        let dx = Math.cos(angle) * velocity;
        let dy = Math.sin(angle) * velocity;
        let opacity = 1;
        
        // 파티클 애니메이션
        function animate() {
            dx *= 0.99;  // 감속
            dy += 0.1;   // 중력
            
            x += dx;
            y += dy;
            opacity -= 0.02;
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animate);
    }

    // 마우스 오버 이벤트 추가
    movingText.addEventListener('mouseover', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        for (let i = 0; i < 15; i++) {
            createParticle(x, y);
        }
        
        // 텍스트를 파티클처럼 변환
        movingText.style.transition = 'transform 0.5s ease';
        movingText.style.transform = 'scale(1.2)'; // 텍스트 크기 증가
        setTimeout(() => {
            movingText.style.transform = 'scale(1)'; // 원래 크기로 복원
        }, 500);
    });

    moveText(); // 애니메이션 시작

    // imgbox의 두 번째 이미지에 애니메이션 추가
    const tomatoImage = document.querySelector('.toamto img'); // 두 번째 이미지 선택
    // 스크롤 이벤트 추가
    let animationExecuted = false; // 애니메이션 실행 여부를 저장하는 변수

    window.addEventListener('scroll', () => {
        const aboutSection = document.getElementById('about'); // ID 선택
        const rect = aboutSection.getBoundingClientRect();
        
        console.log('About Section:', rect); // 디버깅 로그 추가

        // #about 섹션이 뷰포트에 들어오면 애니메이션 시작
        if (rect.top < window.innerHeight && rect.bottom > 0 && !animationExecuted) {
            animationExecuted = true; // 애니메이션 실행 플래그 설정
            toamto.style.animation = 'none'; // 애니메이션 초기화
            toamto.offsetHeight; // 강제로 리플로우 발생
            toamto.style.animation = 'spinAndDrop 2s forwards'; // 페이드 인과 애니메이션 적용
        } else if (rect.bottom < 0 || rect.top > window.innerHeight) {
            // #about 섹션이 뷰포트에서 나갔을 때 애니메이션 페이드 아웃
            toamto.style.animation = 'forwards'; // 페이드 아웃 애니메이션 적용
            animationExecuted = false; // 애니메이션 실행 플래그 초기화
        }
    });
});