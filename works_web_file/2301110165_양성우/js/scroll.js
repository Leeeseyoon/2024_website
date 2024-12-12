gsap.registerPlugin(ScrollTrigger);

const skinMakeupSection = document.querySelector(".skin_makeup"); // skin_makeup 섹션 선택
const skinCon = document.querySelector(".skin_con");
const makeupCon = document.querySelector(".makeup_con"); // makeup_con 선택
const makeupCon2 = document.querySelector(".makeup_con2"); // makeup_con2 선택
const skinWrap = document.querySelector(".skin_wrap"); // skin_wrap 선택
const skinCon2 = document.querySelector(".skin_con2"); // skin_con2 선택
const skinImage = document.querySelector(".skin_image"); // skin_image 선택
const makeupImage = document.querySelector(".makeup_image"); // makeup_image 선택
const boxes = gsap.utils.toArray(".cleansing-box");

// 초기 상태로 makeup_con의 불투명도를 0으로 설정
gsap.set(makeupCon, { opacity: 0 });
gsap.set(makeupCon2, { opacity: 0 }); // makeup_con2의 초기 불투명도 설정
gsap.set(skinWrap, { opacity: 1 });
gsap.set(skinCon2, { opacity: 1 });
gsap.set(skinCon, { clipPath: "inset(0% 0% 0% 0%)" }); // 초기 clip-path 설정
gsap.set(makeupImage, { clipPath: "inset(50% 50% 50% 50%)" }); // makeup_image의 초기 clip-path 설정

gsap.to(skinCon, {
    ease: "none",
    scrollTrigger: {
        trigger: skinMakeupSection, // 섹션 전체를 트리거로 설정
        start: "top top", // 컨테이너의 상단이 뷰포트의 상단에 도달할 때 시작
        end: "+=1000", // 스크롤 거리 조정 (조금만 내릴 수 있도록 설정)
        pin: true, // 고정 설정
        scrub: 1, // 스크롤과 애니메이션 동기화
        onUpdate: (self) => {
            const progress = self.progress;

            // skinImage의 clip-path을 위아래로 닫히게 설정
            const insetValue = 100 * progress; // inset 값 계산
            gsap.set(skinCon, { clipPath: `inset(${insetValue}% 0% ${insetValue}% 0%)` }); // clip-path 설정

            // skin_wrap과 skin_con2의 불투명도 조정
            const fadeOutProgress = 1 - progress; // 페이드 아웃 효과
            gsap.set(skinWrap, { opacity: fadeOutProgress });
            gsap.set(skinCon2, { opacity: fadeOutProgress });

            // makeup_con의 불투명도 조정
            gsap.set(makeupCon, { opacity: progress }); // 불투명도 설정

            // makeup_con2의 불투명도 조정
            gsap.set(makeupCon2, { opacity: progress }); // makeup_con2의 불투명도 설정

            // makeupImage의 clip-path을 중앙부터 열리게 설정
            gsap.set(makeupImage, {
                clipPath: `inset(${50 * (1 - progress)}% 0% ${50 * (1 - progress)}% 0%)`
            });
        },
        onLeave: () => {
            // skinCon이 완전히 사라진 후 makeupCon을 보이게 설정
            gsap.set(makeupCon, { opacity: 1 });
            gsap.set(makeupCon2, { opacity: 1 }); // makeup_con2를 완전히 나타나게 설정
        },
        onEnterBack: () => {
            // 스크롤을 다시 위로 올릴 때 makeup_con을 숨김
            gsap.set(makeupCon, { opacity: 0 });
            gsap.set(makeupCon2, { opacity: 0 });
        }
    }
});

// 각 박스의 위치를 원래대로 유지
boxes.forEach(box => {
    gsap.set(box, { yPercent: 0 }); // 박스의 yPercent를 0으로 설정
});




