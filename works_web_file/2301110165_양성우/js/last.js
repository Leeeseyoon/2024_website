/* gsap.registerPlugin(ScrollTrigger);

const storeSection = document.querySelector(".store_con"); // store_con 섹션 선택
const lastSection = document.querySelector(".last_section");
const storeImage = document.querySelector(".store-image");

// 초기 상태 설정
gsap.set(storeImage, { clipPath: "inset(0% 100% 0% 0%)" }); // 초기 clip-path 설정 (양쪽에서 닫힌 상태)

// 스크롤 트리거 애니메이션 설정
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: lastSection, // last_section을 트리거로 설정
        start: "top top", // 섹션의 상단이 뷰포트의 상단에 도달할 때 시작
        end: "+=1000", // 스크롤 거리 조정 (필요에 따라 조정)
        pin: true, // 고정 설정
        scrub: 1, // 스크롤과 애니메이션 동기화
        onUpdate: (self) => {
            const progress = self.progress; // 스크롤 진행 상황 가져오기
            const insetValue = 100 * (1 - progress); // inset 값 계산 (스크롤 비율에 따라)

            // 모바일 화면인지 확인
            const isMobile = window.matchMedia("(max-width: 768px)").matches;

            // 모바일에서는 더 빠르게 열리도록 설정
            const adjustedInsetValue = isMobile ? insetValue * 0.25 : insetValue; // 모바일일 경우 80%로 조정

            // clip-path 값 업데이트
            gsap.set(storeImage, { clipPath: `inset(0% ${adjustedInsetValue}% 0% ${adjustedInsetValue}%)` });
        }
    }
});

// 이미지가 완전히 열릴 때까지 스크롤을 멈추는 설정
tl.to({}, {
    duration: 1, // 이미지가 열리는 동안 대기
    onComplete: () => {
        // 이미지가 완전히 열린 후 스크롤을 허용
        ScrollTrigger.getById("scrollTriggerId").kill(); // 트리거 종료
    }
}); */




