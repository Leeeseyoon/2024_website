document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const progressBars = document.querySelectorAll(".progress-bar");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const nextBtns = document.querySelectorAll(".next-btn");
  let currentSlide = 0;
  let isTransitioning = false;
  let slideTimer;

  // 배경 이미지 설정
  slides[0].style.backgroundImage = "url('images/mainimg1.webp')";
  slides[1].style.backgroundImage = "url('images/mainimg2.jpg')";
  slides[2].style.backgroundImage = "url('images/mainimg3.webp')";

  function updateSlideIndicator() {
    slides.forEach((slide, index) => {
      const currentPage = slide.querySelector(".current-page");
      const nextPage = slide.querySelector(".next-page");
      if (currentPage) {
        currentPage.textContent = `0${index + 1}`;
      }
      if (nextPage) {
        nextPage.textContent = `0${index + 2 > slides.length ? 1 : index + 2}`;
      }
    });
  }

  function resetProgressBar() {
    progressBars.forEach((bar) => {
      bar.classList.remove("active");
    });
    clearTimeout(slideTimer);
  }

  function startProgressBar() {
    if (isTransitioning) return;

    resetProgressBar(); // 모든 프로그레스 바 초기화
    const currentBar = progressBars[currentSlide];
    currentBar.classList.add("active");

    // 프로그레스 바가 다 채워지면 다음 슬라이드로 전환
    slideTimer = setTimeout(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 4000);
  }

  function changeSlide(direction) {
    if (isTransitioning) return;
    isTransitioning = true;

    // 현재 슬라이드와 컨텐츠
    const currentSlideElement = slides[currentSlide];
    const currentContent = currentSlideElement.querySelector('.slide-content');
    
    // 컨텐츠 페이드 아웃
    currentContent.style.opacity = '0';
    
    // 다음 슬라이드 인덱스 계산
    const nextSlideIndex = direction === 'next' 
        ? (currentSlide + 1) % slides.length 
        : (currentSlide - 1 + slides.length) % slides.length;
    
    const nextSlideElement = slides[nextSlideIndex];
    const nextContent = nextSlideElement.querySelector('.slide-content');
    
    // 다음 슬라이드를 현재 슬라이드 위에 겹치도록 설정
    nextSlideElement.style.zIndex = '1';
    currentSlideElement.style.zIndex = '0';
    
    // 다음 슬라이드를 미리 보이게 설정하고 투명도만 0으로
    nextSlideElement.classList.add('active');
    nextSlideElement.style.opacity = '0';
    
    requestAnimationFrame(() => {
        // 다음 슬라이드 페이드 인
        nextSlideElement.style.opacity = '1';
        nextSlideElement.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            currentSlideElement.classList.remove('active');
            nextContent.style.opacity = '1';
            currentSlide = nextSlideIndex;
            isTransitioning = false;
            startProgressBar();
            updateSlideIndicator();
            
            // z-index 초기화
            nextSlideElement.style.zIndex = '';
            currentSlideElement.style.zIndex = '';
        }, 500);
    });
  }

  function nextSlide() {
    changeSlide("next");
  }

  function prevSlide() {
    changeSlide("prev");
  }

  // 모든 prev/next 버튼에 이벤트 리스너 추가
  prevBtns.forEach((btn) => {
    btn.addEventListener("click", prevSlide);
  });

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", nextSlide);
  });

  // 초기 설정
  updateSlideIndicator();
  slides[0].classList.add("active");
  slides[0].querySelector(".slide-content").style.opacity = "1";
  startProgressBar();
});
