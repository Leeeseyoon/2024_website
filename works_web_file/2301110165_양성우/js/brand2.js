/* gsap.registerPlugin(ScrollTrigger);

gsap.to(".brand-story-section", {
    scrollTrigger: {
        trigger: ".brand-story-section",
        start: "top top", // 섹션이 화면 상단에 닿았을 때
        end: "+=500", // 500px 스크롤 후
        pin: false, // 섹션 고정 해제
        scrub: true, // 부드러운 애니메이션
    },
    height: "40vh", // 최종 높이를 40vh로 설정
    ease: "none"
}); */




/* function splitText(element) {
    const text = element.textContent;
    element.textContent = '';
    
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)'; // 시작 위치를 아래로 설정
        span.style.display = 'inline-block'; // transform이 적용되도록 inline-block으로 변경
        span.style.transition = 'opacity 0.5s ease, transform 0.5s ease'; // transition 속성 추가
        span.style.transitionDelay = `${i * 50}ms`; // 딜레이 시간 조정
        element.appendChild(span);
    });
}

function animateText() {
    const textElements = document.querySelectorAll('.animate-text');
    
    textElements.forEach(element => {
        splitText(element);
        
        // br 태그 처리
        const brTags = element.getElementsByTagName('br');
        Array.from(brTags).forEach(br => {
            const span = document.createElement('span');
            span.appendChild(br);
            element.appendChild(span);
        });
        
        // 애니메이션 시작
        setTimeout(() => {
            element.querySelectorAll('span').forEach(span => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)'; // 최종 위치로 이동
            });
        }, 100);
    });
} */