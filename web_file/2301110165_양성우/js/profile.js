// 스크롤 트리거 관찰자 설정
// 스크롤 트리거 관찰자 설정
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // 요소가 50% 보일 때 트리거
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 300ms 딜레이 추가
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 300);
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// 모든 강조 텍스트 요소를 관찰
document.addEventListener('DOMContentLoaded', () => {
    const highlightElements = document.querySelectorAll('.highlight-text');
    highlightElements.forEach(element => {
        observer.observe(element);
    });
});


// 스크롤 감지 및 애니메이션 적용
function handleScroll() {
    const underlines = document.querySelectorAll('.underline3');
    
    underlines.forEach(underline => {
        const rect = underline.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        
        // 요소가 화면에 보이면 애니메이션 클래스 추가
        if (rect.top <= viewHeight * 0.85) { // 화면의 85% 지점에서 트리거
            underline.classList.add('animate');
        }
    });
}

// 스크롤 이벤트 리스너 등록
window.addEventListener('scroll', handleScroll);
// 초기 로드 시에도 체크
handleScroll();



// 스크롤 감지 및 애니메이션 적용
function handleScroll() {
    const underlines = document.querySelectorAll('.underline3');
    
    underlines.forEach(underline => {
        const rect = underline.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        
        // 요소가 화면에 보이면 애니메이션 클래스 추가
        if (rect.top <= viewHeight * 0.85) { // 화면의 85% 지점에서 트리거
            underline.classList.add('animate');
        } else { // 화면을 벗어나면 애니메이션 클래스 제거
            underline.classList.remove('animate');
        }
    });
}

// 스크롤 이벤트 리스너 등록
window.addEventListener('scroll', handleScroll);
// 초기 로드 시에도 체크
handleScroll();



// 기존 코드는 유지하고 아래 코드를 추가
function handleEducationAnimation() {
    const educationInfos = document.querySelectorAll('.education-info');
    const underlines = document.querySelectorAll('.underline3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 화면에 보일 때 애니메이션 추가
                if (entry.target.classList.contains('education-info')) {
                    entry.target.classList.add('animate');
                }
                const underline = entry.target.nextElementSibling;
                if (underline && underline.classList.contains('underline3')) {
                    underline.classList.add('animate');
                }
            } else {
                // 요소가 화면에서 벗어날 때 애니메이션 클래스 제거
                if (entry.target.classList.contains('education-info')) {
                    entry.target.classList.remove('animate');
                }
                const underline = entry.target.nextElementSibling;
                if (underline && underline.classList.contains('underline3')) {
                    underline.classList.remove('animate');
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px' // 뷰포트 경계에서 50px 안쪽에서 트리거
    });

    // 모든 education-info와 underline3 요소 관찰
    educationInfos.forEach(info => observer.observe(info));
    underlines.forEach(underline => observer.observe(underline));
}

// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', handleEducationAnimation);
