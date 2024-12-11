// GSAP 스크롤 트리거 애니메이션 설정
gsap.registerPlugin(ScrollTrigger);

// fade-up 애니메이션 설정 함수
function setupFadeUpAnimations(elements) {
    elements.forEach((element) => {
        // 기존 ScrollTrigger가 있다면 제거
        if (element.animation) {
            element.animation.kill();
        }

        // 새로운 애니메이션 설정
        element.animation = gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        });
    });
}

// 초기 애니메이션 설정
const fadeUpElements = document.querySelectorAll('.fade-up');
setupFadeUpAnimations(fadeUpElements);

// 탭 전환 시 애니메이션 재설정
document.querySelector('.category_wrap').addEventListener('click', (e) => {
    if (!e.target.classList.contains('category_btn')) return;
    
    // 약간의 지연 후 새로운 섹션의 애니메이션 재설정
    setTimeout(() => {
        const activeSection = document.querySelector('.sections:not(.invisible)');
        const newFadeUpElements = activeSection.querySelectorAll('.fade-up');
        
        // 모든 fade-up 요소를 초기 상태로 리셋
        newFadeUpElements.forEach(element => {
            gsap.set(element, { opacity: 0, y: 50 });
        });
        
        // 애니메이션 재설정
        setupFadeUpAnimations(newFadeUpElements);
    }, 300); // 탭 전환 애니메이션이 완료된 후 실행
});