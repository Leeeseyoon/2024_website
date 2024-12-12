/* gsap.registerPlugin(ScrollTrigger);

const images = document.querySelectorAll('.product-image');

images.forEach(img => {
    gsap.to(img, {
        borderRadius: "0%", // 스크롤 시 직사각형으로 변경
        scrollTrigger: {
            trigger: img,
            start: "top 85%", // 이미지가 화면의 85% 지점에 도달할 때
            end: "top 55%", // 이미지가 화면의 55% 지점에 도달할 때
            scrub: true, // 스크롤에 따라 부드럽게 변형
            // markers: true // 디버깅용으로 마커 표시 (필요시 주석 해제)
            onUpdate: self => {
                const progress = self.progress.toFixed(2); // 0.00 ~ 1.00으로 변환
                const radius = `${100 - progress * 100}px`; // 100%에서 0%로 변경
                gsap.set(img, { borderRadius: radius }); // borderRadius 설정
            }
        }
    });
}); */