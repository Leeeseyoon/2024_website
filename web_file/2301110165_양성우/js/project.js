/* project */
// 프로젝트 카드 설명을 처리하는 함수
/* function projectShowDescription(imgElement) {
    const description = imgElement.closest('.project_card').querySelector('.project_description');
    description.style.display = 'block'; // 설명 창 보이기
    setTimeout(() => {
        description.style.bottom = '0'; // 아래에서 올라오는 애니메이션
        description.style.opacity = '1'; // 부드럽게 나타나도록 설정
    }, 10);
}

function projectHideDescription(imgElement) {
    const description = imgElement.closest('.project_card').querySelector('.project_description');
    description.style.bottom = '-40px'; // 아래로 내려가기
    description.style.opacity = '0'; // 부드럽게 사라지도록 설정
    setTimeout(() => {
        description.style.display = 'none'; // 숨김
    }, 300); // 애니메이션 시간과 동일하게 설정
} */


/*  */
const section_2 = document.getElementById("horizontal");
const box_items = gsap.utils.toArray(".horizontal__item");

// 미디어 쿼리 설정
const mediaQuery = window.matchMedia("(max-width: 768px)");

function handleScrollAnimation() {
    // 초기화 시 애니메이션 비활성화
    gsap.killTweensOf(box_items); // 애니메이션 중지

    if (window.innerWidth > 1910) { // 화면 크기가 1920px 초과일 때만 작동
        // 기존 애니메이션을 적용
        gsap.to(box_items, {
            xPercent: -50 * (box_items.length - 1),
            ease: "sine.out",
            scrollTrigger: {
                trigger: section_2,
                pin: true,
                scrub: 3,
                snap: 1 / (box_items.length - 1),
                end: "+=" + (section_2.offsetWidth * 0.8)
            }
        });

        // 스타일 초기화
        section_2.style.display = 'flex'; 
        section_2.style.overflow = 'hidden'; 
    } else {
        // 작은 화면에서는 애니메이션 비활성화
        gsap.killTweensOf(box_items);
        
        // 스크롤 트리거 제거
        ScrollTrigger.getAll().forEach(trigger => {
            trigger.kill(); // 모든 ScrollTrigger 비활성화
        });

        // 세로 방향으로 나열
        section_2.style.display = 'flex'; // 블록 요소로 설정
        section_2.style.overflow = 'visible'; // 세로 스크롤 활성화
    }
}

// 초기 호출
handleScrollAnimation();

// 리사이즈 이벤트 리스너 추가
window.addEventListener("resize", handleScrollAnimation);

// 미디어 쿼리 변경 이벤트 리스너 추가
mediaQuery.addEventListener("change", handleScrollAnimation);














