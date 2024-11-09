const textItems = document.querySelectorAll('.text-item');
const imageContainers = document.querySelectorAll('.image-container');
let currentIndex = 2;
const ITEM_SPACING = 100;

// body의 높이를 40개 항목에 맞게 조정
document.body.style.height = `${40 * window.innerHeight * 0.2}px`;

// 중앙 영역 범위 정의
const CENTER_ZONE = {
    top: window.innerHeight * 0.4,    // 화면 높이의 40% 지점
    bottom: window.innerHeight * 0.6   // 화면 높이의 60% 지점
};

function setInitialPositions() {
    textItems.forEach((item, index) => {
        const relativePosition = index - currentIndex;
        const position = relativePosition * ITEM_SPACING;
        
        // translate(-50%, ...)를 추가하여 처음부터 중앙 정렬
        item.style.transform = `translate(-50%, ${position}px)`;
        
        if (Math.abs(relativePosition) <= 2) {
            item.style.opacity = '1';
        } else {
            item.style.opacity = '0';
        }

        if (index === currentIndex) {
            item.classList.add('active');
            item.style.color = '#fff'; // 초기 활성화된 텍스트도 흰색으로
            item.style.webkitTextStroke = '0';
        } else {
            item.style.color = 'transparent';
            item.style.webkitTextStroke = '1px rgba(255, 255, 255, 0.3)';
        }
    });

    // 이미지 컨테이너 초기 위치 설정
    imageContainers.forEach((container, index) => {
        const relativePosition = index - currentIndex;
        const position = relativePosition * ITEM_SPACING;
        container.style.transform = `translateY(${position}px) scale(${index === currentIndex ? 1 : 0.4})`;
        container.style.opacity = index === currentIndex ? '1' : '0';
    });
}

function updateItems(newIndex) {
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= textItems.length) newIndex = textItems.length - 1;
    
    // 이전 활성화 항목 비활성화
    textItems[currentIndex].classList.remove('active');
    imageContainers[currentIndex]?.classList.remove('active');
    
    // 모든 이미지 컨테이너 초기화
    imageContainers.forEach(container => {
        container.classList.remove('active', 'adjacent', 'prev', 'next');
        container.style.opacity = '0';
        container.style.transform = `translateY(0) scale(0.8)`;
    });
    
    textItems.forEach((item, index) => {
        const relativePosition = index - newIndex;
        const position = relativePosition * ITEM_SPACING;
        
        // 텍스트 아이템 업데이트
        if (Math.abs(relativePosition) <= 3) {
            item.style.opacity = '1';
        } else {
            item.style.opacity = '0';
        }
        
        if (index === newIndex) {
            // 활성화된 텍스트는 흰색으로 설정
            item.style.color = '#fff';
            item.style.webkitTextStroke = '0';
            item.classList.add('active');
        } else {
            // 비활성화된 텍스트는 기존 스타일 유지
            item.style.color = 'transparent';
            item.style.webkitTextStroke = '1px rgba(255, 255, 255, 0.3)';
            item.classList.remove('active');
        }
        
        item.style.transform = `translate(-50%, ${position}px)`;
        
        // 이미지 컨테이너 업데이트
        const container = imageContainers[index];
        if (container) {
            if (index === newIndex) {
                container.classList.add('active');
                container.style.opacity = '1';
                container.style.transform = `translateY(${position}px) scale(1)`;
            } else if (index === newIndex - 1) {
                container.classList.add('adjacent', 'prev');
                container.style.opacity = '0.2';
                container.style.transform = `translateY(${position}px) scale(0.8)`;
            } else if (index === newIndex + 1) {
                container.classList.add('adjacent', 'next');
                container.style.opacity = '0.2';
                container.style.transform = `translateY(${position}px) scale(0.8)`;
            }
        }
    });
    
    currentIndex = newIndex;
}

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const itemHeight = window.innerHeight * 0.15;
    const newIndex = Math.round(scrollPosition / itemHeight);
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < textItems.length) {
        updateItems(newIndex);
    }
});

// 초기 설정
setInitialPositions();

// 클릭 이벤트 핸들러 수정
textItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (index === currentIndex) return;
        
        const targetScrollPosition = Math.max(0, index * (window.innerHeight * 0.15));
        
        // 클릭된 항목에 transition 클래스 추가
        item.classList.add('transitioning');
        
        // 현재 활성 항목에도 transition 클래스 추가
        textItems[currentIndex].classList.add('transitioning');
        
        // updateItems 호출 전에 약간의 지연
        setTimeout(() => {
            updateItems(index);
            
            // 부드러운 스크롤 적용
            window.scrollTo({
                top: targetScrollPosition,
                behavior: 'smooth'
            });
            
            // transition 클래스 제거
            setTimeout(() => {
                item.classList.remove('transitioning');
                textItems[currentIndex].classList.remove('transitioning');
            }, 800); // transition 시간과 동일하게 설정
        }, 50);
    });
});

// CSS 수정을 위한 스타일 추가
