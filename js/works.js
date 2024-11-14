// 모바일 기기 감지 함수
function isMobile() {
    return window.innerWidth <= 768;
}

// 초기 설정 및 변수 선언
const textItems = document.querySelectorAll('.text-item');
const imageContainers = document.querySelectorAll('.image-container');
let currentIndex = 2;
const ITEM_SPACING = 100;

// body의 높이를 동적으로 조정
document.body.style.height = isMobile() ? 'auto' : `${40 * window.innerHeight * 0.2}px`;

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
function updateItems(newIndex, filteredIndexMap = null) {
    if (isMobile()) return;
    
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= textItems.length) newIndex = textItems.length - 1;

    // 현재 활성화된 아이템들의 클래스 제거
    textItems[currentIndex]?.classList.remove('active');
    imageContainers[currentIndex]?.classList.remove('active');

    // 모든 컨테이너 초기화
    imageContainers.forEach(container => {
        container.classList.remove('active', 'adjacent', 'prev', 'next');
        container.style.opacity = '0';
        container.style.transform = `translateY(0) scale(0.8)`;
    });

    textItems.forEach((item, index) => {
        // 필터링된 인덱스 사용
        const mappedIndex = filteredIndexMap ? filteredIndexMap.get(index) : index;
        if (mappedIndex === undefined && filteredIndexMap) return;

        const relativePosition = mappedIndex - (filteredIndexMap ? filteredIndexMap.get(newIndex) : newIndex);
        const position = relativePosition * ITEM_SPACING;

        if (Math.abs(relativePosition) <= 3) {
            item.style.opacity = '1';
        } else {
            item.style.opacity = '0';
        }

        if (index === newIndex) {
            item.style.color = '#fff';
            item.style.webkitTextStroke = '0';
            item.classList.add('active');
        } else {
            item.style.color = 'transparent';
            item.style.webkitTextStroke = '1px rgba(255, 255, 255, 0.3)';
            item.classList.remove('active');
        }

        item.style.transform = `translate(-50%, ${position}px)`;

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

// 쓰로틀링 함수
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

// 이벤트 리스너 설정
if (!isMobile()) {
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
}

// 초기 설정 실행
setInitialPositions();

// 클릭 이벤트 핸들러 부분만 수정
textItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (isMobile()) return;
        if (index === currentIndex) return;
        
        const targetScrollPosition = Math.max(0, index * (window.innerHeight * 0.2));
        
        item.classList.add('transitioning');
        textItems[currentIndex].classList.add('transitioning');
        
        setTimeout(() => {
            updateItems(index);
            
            window.scrollTo({
                top: targetScrollPosition,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                item.classList.remove('transitioning');
                textItems[currentIndex].classList.remove('transitioning');
            }, 800);
        }, 50);
    });
});

// 이미지 지연 로딩
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
    if (isMobile()) {
        textItems.forEach(item => {
            item.style.transform = 'none';
            item.style.opacity = '1';
            item.style.visibility = 'visible';
            item.style.color = '#fff';
            item.style.webkitTextStroke = '0';
        });

        imageContainers.forEach(container => {
            container.style.transform = 'none';
            container.style.opacity = '1';
            container.style.visibility = 'visible';
        });
        return;
    }

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

    setTimeout(() => {
        textItems[currentIndex].style.opacity = '1';
        imageContainers[currentIndex].style.opacity = '1';
        
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

// 카테고리 필터링
function initializeCategories() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.dataset.category;
            filterItems(selectedCategory, textItems, imageContainers);
        });
    });
}

function filterItems(category, textItems, imageContainers) {
    if (isMobile()) {
        textItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });

        imageContainers.forEach(container => {
            if (category === 'all' || container.dataset.category === category) {
                container.classList.remove('hidden');
            } else {
                container.classList.add('hidden');
            }
        });
        
        document.body.style.height = 'auto';
        return;
    }

    let visibleItems = [];
    let visibleContainers = [];
    let filteredIndexMap = new Map();

    let newIndex = 0;
    textItems.forEach((item, originalIndex) => {
        if (category === 'all' || item.dataset.category === category) {
            item.classList.remove('hidden');
            visibleItems.push({ item, originalIndex });
            filteredIndexMap.set(originalIndex, newIndex);
            newIndex++;
        } else {
            item.classList.add('hidden');
        }
    });

    imageContainers.forEach((container, originalIndex) => {
        if (category === 'all' || container.dataset.category === category) {
            container.classList.remove('hidden');
            visibleContainers.push({ container, originalIndex });
        } else {
            container.classList.add('hidden');
        }
    });

    const totalVisibleItems = visibleItems.length;
    const itemSpacing = window.innerHeight * 0.2;
    const totalHeight = category === 'all' 
        ? (40 * window.innerHeight * 0.2)
        : ((totalVisibleItems + 1) * itemSpacing + window.innerHeight);
    document.body.style.height = `${totalHeight}px`;

    if (visibleItems.length > 0) {
        const firstVisibleIndex = visibleItems[0].originalIndex;
        currentIndex = firstVisibleIndex;
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        updateItems(firstVisibleIndex, filteredIndexMap);
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
    
    currentIndex = 0;
    updateItems(currentIndex);
});

// 리사이즈 이벤트
window.addEventListener('resize', () => {
    if (isMobile()) {
        window.removeEventListener('scroll', throttledScrollHandler);
        document.body.style.height = 'auto';
        textItems.forEach(item => {
            item.style.transform = 'none';
            item.style.opacity = '1';
            item.style.visibility = 'visible';
        });
        imageContainers.forEach(container => {
            container.style.transform = 'none';
            container.style.opacity = '1';
            container.style.visibility = 'visible';
        });
    } else {
        document.body.style.height = `${40 * window.innerHeight * 0.2}px`;
        window.addEventListener('scroll', throttledScrollHandler, { passive: true });
        setInitialPositions();
    }
});

// 커스텀 커서 관련 코드 추가
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.querySelector('.custom_cursor');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 링크나 버튼에 호버했을 때 커서 크기 변경
    const hoverElements = document.querySelectorAll('a, button, .text-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
});