document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.showcase-slider');
    const items = document.querySelectorAll('.showcase-item');
    const prevBtn = document.querySelector('.showcase-arrow.prev');
    const nextBtn = document.querySelector('.showcase-arrow.next');
    const navBtns = document.querySelectorAll('.showcase-nav-btn');
    
    let currentIndex = 0;
    
    // 아이템의 전체 너비 계산 (마진/패딩/gap 포함)
    const getItemWidth = () => {
        const item = items[0];
        const style = window.getComputedStyle(item);
        const width = item.offsetWidth;
        const marginRight = parseInt(style.marginRight) || 0;
        const gap = 20; // showcase-slider의 gap 값
        
        return width + gap; // 전체 이동 거리
    };
    
    const itemWidth = getItemWidth();
    const itemsPerView = Math.floor(slider.offsetWidth / itemWidth);
    
    // 초기 HTML 저장
    const initialHTML = document.querySelector('.showcase-slider').innerHTML;
    
    // 슬라이더 이동 함수
    function moveSlider(index) {
        if (index < 0) {
            index = items.length - itemsPerView;
        } else if (index > items.length - itemsPerView) {
            index = 0;
        }
        currentIndex = index;
        
        // 부드러운 전환을 위한 CSS transition 추가
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    // 다음 슬라이드
    nextBtn.addEventListener('click', () => {
        moveSlider(currentIndex + 1);
    });
    
    // 이전 슬라이드
    prevBtn.addEventListener('click', () => {
        moveSlider(currentIndex - 1);
    });
    
    // 네비게이션 버튼 클릭 이벤트
    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // 활성화된 버튼 스타일 변경
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // BEST SELLER일 경우 초기 HTML 복원
            if (index === 0) {
                const slider = document.querySelector('.showcase-slider');
                slider.style.opacity = '0';
                setTimeout(() => {
                    slider.innerHTML = initialHTML;
                    slider.style.transform = 'translateX(0)';
                    slider.style.opacity = '1';
                    
                    // 슬라이더 관련 변수 재설정
                    const items = slider.querySelectorAll('.showcase-item');
                    currentIndex = 0;
                }, 300);
                return;
            }
            
            // 다른 카테고리의 경우 제품 데이터 로드
            loadProducts(index);
        });
    });

    // transition이 끝난 후 무한 슬라이드를 위한 위치 조정
    slider.addEventListener('transitionend', () => {
        if (currentIndex >= items.length - itemsPerView) {
            slider.style.transition = 'none';
            currentIndex = 0;
            slider.style.transform = `translateX(0)`;
        } else if (currentIndex < 0) {
            slider.style.transition = 'none';
            currentIndex = items.length - itemsPerView;
            slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        }
    });
});

// 제품 데이터 로드 함수
function loadProducts(categoryIndex) {
    const productCategories = {
        1: [ // SPECIAL SET
            {
                image: 'images/product11.png',
                name: '마이스터 포맨 네오필 2종 기획',
                features: '미백 | 브라이트닝 | 미백기능성',
                price: '₩89,000',
                rating: '4.9',
                reviews: '15'
            },
            {
                image: 'images/product8.png',
                name: '미라클 모이스처 핑크 베리어',
                features: '수분 | 탄력 | 미백기능성',
                price: '₩99,000',
                rating: '4.8',
                reviews: '12'
            },
            {
                image: 'images/product9.png',
                name: '더 퍼스트 제너츄어 Be My First 기획',
                features: '안티에이징 | 탄력 | 주름개선',
                price: '₩129,000',
                rating: '4.9',
                reviews: '8'
            },
            {
                image: 'images/product10.png',
                name: '프라임 어드밴서 디에이징 앰플 세럼 20ml',
                features: '수분 | 진정 | 기초케어',
                price: '₩79,000',
                rating: '4.7',
                reviews: '20'
            },
            {
                image: 'images/special3.png',
                name: '에이지 리커버리 3종 스페셜 기획',
                features: '주름케어 | 알파콜라겐 | 기초케어',
                price: '₩135,000',
                rating: '5.0',
                reviews: '18'
            }
        ],
        2: [ // SKINCARE
            {
                image: 'images/skincare1.png',
                name: 'MIRACLE AQUA CREAM',
                features: '수분공급 | 보습 | 진정효과',
                price: '₩55,000',
                rating: '4.8',
                reviews: '12'
            },
            {
                image: 'images/skincare2.png',
                name: '프라임 어드밴서 앰플 마스크 3-STEP 8매',
                features: '탄력 | 영양 | 안티에이징',
                price: '₩65,000',
                rating: '4.9',
                reviews: '18'
            },
            {
                image: 'images/skincare3.png',
                name: '핸드크림 트리오 세트',
                features: '진정 | pH밸런스 | 수분공급',
                price: '₩38,000',
                rating: '4.7',
                reviews: '25'
            },
            {
                image: 'images/skincare4.png',
                name: '익스트림 화이트 멜라토닝 다크스팟 앰플 에센스',
                features: '재생 | 영양 | 주름개선',
                price: '₩72,000',
                rating: '4.8',
                reviews: '15'
            },
            {
                image: 'images/skincare5.png',
                name: '에이지 리커버리 에센스 더블 에디션',
                features: '주름케어 | 영양 | 주름개선',
                price: '₩145,000',
                rating: '4.8',
                reviews: '15'
            }
        ],
        3: [ // MAKE UP
            {
                image: 'images/makeup1.png',
                name: '얼티밋 커버 프라이머 30ml',
                features: '커버력 | UV차단 | 미백기능성',
                price: '₩45,000',
                rating: '4.7',
                reviews: '20'
            },
            {
                image: 'images/makup3.png',
                name: '얼티밋 핏 톤업 진 쿠션 15g(본품)+15g(리필)',
                features: '벨벳 | 롱래스팅 | 보습',
                price: '₩32,000',
                rating: '4.8',
                reviews: '30'
            },
            {
                image: 'images/makup4.png',
                name: '얼티밋 핏 롱웨어 진 쿠션 라이프 스타일 에디션',
                features: '픽싱 | 보정 | 매트',
                price: '₩35,000',
                rating: '4.6',
                reviews: '22'
            },
            {
                image: 'images/makup5.png',
                name: '얼티밋 핏 톤업 진 쿠션 리필 15g(리필)',
                features: '볼륨 | 롱래스팅 | 컬링',
                price: '₩28,000',
                rating: '4.7',
                reviews: '28'
            },
            {
                image: 'images/makup6.png',
                name: '얼티밋 커버 리프팅 쿠션 플라워 에디션',
                features: '탄력커버 | 리프팅지속 | 컬링',
                price: '₩58,000',
                rating: '4.9',
                reviews: '28'
            }
        ]
    };

    const slider = document.querySelector('.showcase-slider');
    
    // 선택된 카테고리의 제품 데이터 가져오기
    const products = productCategories[categoryIndex] || [];
    
    // 새로운 제품 HTML 생성
    const productsHTML = products.map(product => `
        <div class="showcase-item">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-features">
                    ${product.features}
                </div>
                <p class="price">${product.price}</p>
                <div class="product-footer">
                    <div class="rating-container">
                        <span class="rating">${product.rating}</span>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <button class="cart-button">CART</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // 슬라이더 내용 업데이트
    slider.style.opacity = '0';
    setTimeout(() => {
        slider.innerHTML = productsHTML;
        slider.style.transform = 'translateX(0)';
        slider.style.opacity = '1';
    }, 300);
} 