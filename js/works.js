// 모바일 체크 함수
function isMobile() {
    return window.innerWidth <= 480;
}

// 초기 설정 및 변수 선언
const textItems = document.querySelectorAll('.text-item');
const imageContainers = document.querySelectorAll('.image-container');
let currentIndex = 2;
const ITEM_SPACING = 100;

// body의 높이를 동적으로 조정 (모바일 아닐 때만)
if (!isMobile()) {
    document.body.style.height = `${40 * window.innerHeight * 0.2}px`;
}

// 중앙 영역 범위 정의
const CENTER_ZONE = {
    top: window.innerHeight * 0.4,
    bottom: window.innerHeight * 0.6
};

// 초기 위치 설정 함수
function setInitialPositions() {
    if (isMobile()) return;
    
    textItems.forEach((item, index) => {
        const relativePosition = index - currentIndex;
        const position = relativePosition * ITEM_SPACING;
        
        item.style.transform = `translate(-50%, ${position}px)`;
        
        if (Math.abs(relativePosition) <= 2) {
            item.style.opacity = '1';
        } else {
            item.style.opacity = '0';
        }

        if (index === currentIndex) {
            item.classList.add('active');
            item.style.color = '#fff';
            item.style.webkitTextStroke = '0';
        } else {
            item.style.color = 'transparent';
            item.style.webkitTextStroke = '1px rgba(255, 255, 255, 0.3)';
        }
    });

    imageContainers.forEach((container, index) => {
        const relativePosition = index - currentIndex;
        const position = relativePosition * ITEM_SPACING;
        container.style.transform = `translateY(${position}px) scale(${index === currentIndex ? 1 : 0.4})`;
        container.style.opacity = index === currentIndex ? '1' : '0';
    });
}

// 아이템 업데이트 함수
function updateItems(newIndex) {
    if (isMobile()) return;
    
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= textItems.length) newIndex = textItems.length - 1;
    
    // ... 나머지 updateItems 코드는 동일 ...
}

// 스크롤 핸들러
const throttledScrollHandler = throttle(function() {
    if (isMobile()) return;
    
    const scrollPosition = window.scrollY;
    const itemHeight = window.innerHeight * 0.2;
    const visibleItems = Array.from(textItems)
        .filter(item => !item.classList.contains('hidden'));
    
    const newVisibleIndex = Math.floor(scrollPosition / itemHeight);
    
    if (newVisibleIndex >= 0 && newVisibleIndex < visibleItems.length) {
        requestAnimationFrame(() => {
            const newOriginalIndex = Array.from(textItems).indexOf(visibleItems[newVisibleIndex]);
            if (newOriginalIndex !== currentIndex) {
                updateItems(newOriginalIndex);
            }
        });
    }
}, 100);

// 카테고리 필터링
function filterItems(category, textItems, imageContainers) {
    let visibleItems = [];
    let visibleContainers = [];

    textItems.forEach((item, index) => {
        if (category === 'all' || item.dataset.category === category) {
            item.classList.remove('hidden');
            visibleItems.push({ item, originalIndex: index });
        } else {
            item.classList.add('hidden');
        }
    });

    imageContainers.forEach((container, index) => {
        if (category === 'all' || container.dataset.category === category) {
            container.classList.remove('hidden');
            visibleContainers.push({ container, originalIndex: index });
        } else {
            container.classList.add('hidden');
        }
    });

    if (!isMobile()) {
        const totalVisibleItems = visibleItems.length;
        const itemSpacing = window.innerHeight * 0.2;
        const totalHeight = (totalVisibleItems + 1) * itemSpacing + window.innerHeight;
        document.body.style.height = `${totalHeight}px`;
    }

    if (visibleItems.length > 0) {
        const firstVisibleIndex = visibleItems[0].originalIndex;
        currentIndex = firstVisibleIndex;
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        updateItems(firstVisibleIndex);
    }

    window.removeEventListener('scroll', throttledScrollHandler);
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    if (!isMobile()) {
        initializeWithDelay();
    }
    initializeCategories();
});

// 나머지 함수들은 그대로 유지...