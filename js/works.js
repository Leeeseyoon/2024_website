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

// 스크롤 이벤트에 쓰로틀링 적용
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 스크롤 핸들러 수정
const throttledScrollHandler = throttle(function() {
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

// 이벤트 리스너 수정
window.addEventListener('scroll', throttledScrollHandler, { passive: true });

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
            }, 800); // transition ��간과 동일하게 설정
        }, 50);
    });
});

// CSS 수정을 위한 스타일 추가

// 이미지 지연 로딩을 위한 함수
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    const image = new Image();
                    image.onload = () => {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    };
                    image.src = img.dataset.src;
                }
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });

    document.querySelectorAll('.image-item[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// 초기 로딩 최적화
function initializeWithDelay() {
    // 초기 위치를 미리 설정
    textItems.forEach((item, index) => {
        const relativePosition = index - currentIndex;
        const position = relativePosition * ITEM_SPACING;
        
        item.style.transform = `translate(-50%, ${position}px)`;
        item.style.opacity = '0';
        item.style.visibility = index === currentIndex ? 'visible' : 'hidden';
        
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
        container.style.opacity = '0';
        container.style.visibility = index === currentIndex ? 'visible' : 'hidden';
    });

    // 약간의 지연 후 활성 항목만 표시
    setTimeout(() => {
        textItems[currentIndex].style.opacity = '1';
        imageContainers[currentIndex].style.opacity = '1';
        
        // 추가 지연 후 나머지 항목 표시
        setTimeout(() => {
            textItems.forEach(item => {
                item.style.visibility = 'visible';
            });
            imageContainers.forEach(container => {
                container.style.visibility = 'visible';
            });
            setInitialPositions();
            lazyLoadImages();
        }, 500);
    }, 100);
}

// 카테고리 필터링 기능 추가
function initializeCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성화된 버튼 스타일 변경
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.dataset.category;
            
            // 아이템 필터링 및 첫 번째 항목 활성화
            filterItems(selectedCategory, textItems, imageContainers);
        });
    });
}

function filterItems(category, textItems, imageContainers) {
    let visibleItems = [];
    let visibleContainers = [];

    // 아이템 필터링
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

    // 스크롤 높이 계산
    const totalVisibleItems = visibleItems.length;
    const itemSpacing = window.innerHeight * 0.2;
    const minHeight = window.innerHeight * 2;
    const totalHeight = Math.max(minHeight, totalVisibleItems * itemSpacing + window.innerHeight);
    document.body.style.height = `${totalHeight}px`;

    // 카테고리 변경 시 첫 번째 항목 활성화
    if (visibleItems.length > 0) {
        const firstVisibleIndex = visibleItems[0].originalIndex;
        currentIndex = firstVisibleIndex;
        
        // 스크롤 위치를 첫 번째 항목으로 이동
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // 첫 번째 항목 활성화
        updateItems(firstVisibleIndex);
    }

    // 스크롤 이벤트 리스너 갱신
    window.removeEventListener('scroll', scrollHandler);
    window.addEventListener('scroll', scrollHandler);
}

// 스크롤 핸들러 수정
function scrollHandler() {
    const scrollPosition = window.scrollY;
    const itemHeight = window.innerHeight * 0.2;
    const visibleItems = Array.from(textItems)
        .filter(item => !item.classList.contains('hidden'))
        .map((item, index) => ({
            item,
            originalIndex: Array.from(textItems).indexOf(item)
        }));

    const newVisibleIndex = Math.floor(scrollPosition / itemHeight);
    
    if (newVisibleIndex >= 0 && newVisibleIndex < visibleItems.length) {
        const newOriginalIndex = visibleItems[newVisibleIndex].originalIndex;
        if (newOriginalIndex !== currentIndex) {
            updateItems(newOriginalIndex);
        }
    }
}

// 초기 스크롤 이벤트 리스너 제거
window.removeEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const itemHeight = window.innerHeight * 0.15;
    const newIndex = Math.round(scrollPosition / itemHeight);
    
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < textItems.length) {
        updateItems(newIndex);
    }
});

// 새로운 스크롤 이벤트 리스너 등록
window.addEventListener('scroll', scrollHandler);

// 기존 초기화 함수에 카테고리 초기화 추가
document.addEventListener('DOMContentLoaded', () => {
    initializeWithDelay();
    initializeCategories();
});
