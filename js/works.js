// 모바일 기기 감지 함수
function isMobile() {
    return window.innerWidth <= 768;
}

// 초기 설정 및 변수 선언
const textItems = document.querySelectorAll('.text-item');
const imageContainers = document.querySelectorAll('.image-container');
let currentIndex = 2;
const ITEM_SPACING = 100;

// body 높이 계산 함수 수정
function updateBodyHeight() {
    if (isMobile()) {
        // 모바일에서는 컨텐츠의 실제 높이를 사용
        const contentHeight = Math.max(
            ...Array.from(textItems).map(item => item.offsetTop + item.offsetHeight),
            ...Array.from(imageContainers).map(container => container.offsetTop + container.offsetHeight)
        );
        
        // 모바일에서는 실제 컨텐츠 높이에 여유 공간을 더 추가
        const extraSpace = window.innerHeight * 0.5; // 50% 추가 여유 공간
        document.body.style.height = 'auto'; // 자동 높이로 설정
        document.body.style.minHeight = `${Math.max(contentHeight + extraSpace, window.innerHeight)}px`;
        return;
    }
    
    // PC 버전의 기존 코드 유지
    const visibleItems = Array.from(textItems).filter(item => !item.classList.contains('hidden'));
    const totalItems = visibleItems.length;
    const heightMultiplier = 50;
    document.body.style.height = `${heightMultiplier * window.innerHeight * 0.2}px`;
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
        } else {
            item.style.color = 'rgba(255, 255, 255, 0.3)';
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
            item.classList.add('active');
        } else {
            item.style.color = 'rgba(255, 255, 255, 0.3)';
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

// 클릭 이벤트 핸들러 수정
/* textItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        if (isMobile()) return;
        if (item.classList.contains('hidden')) return;
        if (index === currentIndex) return;
        
        const visibleItems = Array.from(textItems).filter(item => !item.classList.contains('hidden'));
        const clickedItemIndex = visibleItems.indexOf(item);
        const targetIndex = index;
        
        // 클릭한 아이템과 현재 아이템 사이의 중간 인덱스들 계산
        const direction = targetIndex > currentIndex ? 1 : -1;
        const steps = Math.abs(targetIndex - currentIndex);
        const stepDelay = 100; // 각 단계별 딜레이
        
        // 중간 단계들을 거쳐가며 부드럽게 이동
        for(let i = 1; i <= steps; i++) {
            setTimeout(() => {
                const intermediateIndex = currentIndex + (direction * i);
                updateItems(intermediateIndex);
            }, i * stepDelay);
        }
        
        // 최종 스크롤 위치 계산 및 이동
        const targetScrollPosition = Math.max(0, clickedItemIndex * (window.innerHeight * 0.2));
        setTimeout(() => {
            window.scrollTo({
                top: targetScrollPosition,
                behavior: 'smooth'
            });
        }, steps * stepDelay);
    });
}); */

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

// 초기 로딩 최적화 수 수정
function initializeWithDelay() {
    if (isMobile()) {
        textItems.forEach(item => {
            item.style.transform = 'none';
            item.style.opacity = '1';
            item.style.visibility = 'visible';
            item.style.color = '#fff';
            item.style.position = 'relative'; // 추가
            item.style.top = 'auto'; // 추가
            item.style.left = 'auto'; // 추가
        });

        imageContainers.forEach(container => {
            container.style.transform = 'none';
            container.style.opacity = '1';
            container.style.visibility = 'visible';
            container.style.position = 'relative'; // 추가
            container.style.top = 'auto'; // 추가
        });
        
        updateBodyHeight(); // 모바일에서 높이 업데이트 추가
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
        } else {
            item.style.color = 'rgba(255, 255, 255, 0.3)';
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
                container.style.display = 'block';
            } else {
                container.classList.add('hidden');
                container.style.display = 'none';
            }
        });

        // 모바일에서는 컨텐츠에 맞게 자동으로 높이 조정
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
        ? (50 * window.innerHeight * 0.2) // 기존 40에서 50으로 증가
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
        updateBodyHeight(); // 초기 높이 설정
    }
    initializeCategories();
    
    currentIndex = 0;
    updateItems(currentIndex);
});

// 리사이즈 이벤트 수정
window.addEventListener('resize', () => {
    if (isMobile()) {
        window.removeEventListener('scroll', throttledScrollHandler);
        textItems.forEach(item => {
            item.style.transform = 'none';
            item.style.opacity = '1';
            item.style.visibility = 'visible';
            item.style.position = 'relative';
            item.style.top = 'auto';
            item.style.left = 'auto';
        });
        imageContainers.forEach(container => {
            container.style.transform = 'none';
            container.style.opacity = '1';
            container.style.visibility = 'visible';
            container.style.position = 'relative';
            container.style.top = 'auto';
        });
        updateBodyHeight();
    } else {
        // PC 모드로 전환 시 초기화
        textItems.forEach(item => {
            item.style.position = 'absolute';
            item.style.left = '50%';
            item.style.top = 'auto';
            item.style.visibility = 'visible';
        });
        
        imageContainers.forEach(container => {
            container.style.position = 'absolute';
            container.style.visibility = 'visible';
        });
        
        // 기존 레이아웃 복원
        updateBodyHeight();
        setInitialPositions();
        
        // 스크롤 이벤트 다시 연결
        window.removeEventListener('scroll', throttledScrollHandler);
        window.addEventListener('scroll', throttledScrollHandler, { passive: true });
        
        // 현재 인덱스 기준으로 아이템 업데이트
        requestAnimationFrame(() => {
            updateItems(currentIndex);
        });
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

