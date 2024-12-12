ScrollTrigger.create({
  trigger: ".since-section",
  start: "top center",
  onEnter: () => {
    // 카운터 애니메이션
    document.querySelectorAll(".counter").forEach((counter) => {
      const target = parseInt(counter.dataset.target);
      gsap.to(counter, {
        innerText: target,
        duration: 0.7,
        snap: { innerText: 1 },
        ease: "power1.out",
        onUpdate: function () {
          // 여기에 숫자 포맷팅 코드를 추가
          counter.textContent = parseInt(counter.textContent).toLocaleString(
            "ko-KR"
          );
        },
      });
    });

    // 텍스트 하이라이트 애니메이션 - 회색에서 흰색으로
    gsap.to(".text-highlight", {
      color: "#ffffff",
      duration: 0.5,
      delay: 0.5,
      ease: "none",
    });
  },
  onLeaveBack: () => {
    gsap.to(".text-highlight", {
      color: "#666",
      duration: 0.5,
      ease: "none",
    });
  },
});

/* gsap.to('.solution-image', {
    scrollTrigger: {
        trigger: '.solution-image-wrapper',
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
    },
    x: 0,
    opacity: 1,
    duration: 0.2,
    ease: 'power3.out'
}); */

// ... 기존 코드 유지 ...

// white-deaging-section 애니메이션
gsap.to(".white-deaging-section", {
  scrollTrigger: {
    trigger: ".white-deaging-section",
    start: "top center",
    end: "bottom center",
    toggleActions: "play none none reverse",
  },
  backgroundColor: "#ffffff",
  opacity: 1,
  duration: 0.8,
});

// 이미지와 텍스트 애니메이션을 함께 처리
gsap.utils.toArray(".slide-image").forEach((image, i) => {
  const text = document.querySelectorAll(".fade-text")[i];

  // 초기 상태 설정
  gsap.set(image, {
    y: "50vh",
    opacity: 0,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".white-deaging-section",
      start: `center+=${i * 25}% center`,
      end: `top+=${i * 25 + 100}% center`,
      scrub: 3,
      toggleActions: "play none none reverse",
    },
  });

  // 현재 이미지 애니메이션
  tl.to(image, {
    y: 0,
    opacity: 1,
    duration: 2.5,
  });

  // 이미지 사라지는 애니메이션
  if (i < gsap.utils.toArray(".slide-image").length - 1) {
    tl.to(
      image,
      {
        y: "-50vh",
        opacity: 0,
        duration: 3,
      },
      2
    );
  } else {
    // 마지막 이미지
    tl.to(
      image,
      {
        y: "-50vh",
        opacity: 0,
        duration: 3,
      },
      2
    );
  }

  // 텍스트 애니메이션
  tl.to(
    text,
    {
      color: "#000",
      opacity: 1,
      duration: 2,
    },
    0
  );
});

// 텍스트 페이드인 애니메이션
gsap.utils.toArray(".fade-text").forEach((text, i) => {
  gsap.fromTo(
    text,
    {
      color: "#cccccc",
      opacity: 0.7,
    },
    {
      color: "#000",
      opacity: 1,
      duration: 2.5,
      scrollTrigger: {
        trigger: ".white-deaging-section",
        start: `center+=${i * 25}% center`,
        end: `top+=${i * 25 + 100}% center`,
        scrub: 3,
        toggleActions: "play none none reverse",
      },
    }
  );
});

// 전체 섹션 고정
ScrollTrigger.create({
  trigger: ".white-deaging-section",
  start: "top top",
  end: "+=100%",
  pin: true,
  pinSpacing: true,
});
