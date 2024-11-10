// 모바일 기능을 초기화하는 함수
function initializeMobile() {
    console.log('Mobile JS loaded');
    
    if (window.innerWidth > 480) {
        console.log('Not mobile environment');
        return;
    }

    const projectList = document.querySelector('.project-list');
    if (!projectList) {
        console.error('Project list not found');
        return;
    }
    console.log('Project list found');

    // project-wheel 요소 생성 및 추가
    projectList.innerHTML = `
        <div class="selection-box"></div>
        <div class="project-wheel"></div>
    `;

    const projectWheel = document.querySelector('.project-wheel');
    if (!projectWheel) {
        console.error('Project wheel not found');
        return;
    }
    console.log('Project wheel found');

    // 카테고리별 프로젝트 데이터 분리
    const projectsData = {
        digital: [
            { title: 'Ready to play the GAME?', author: '김민경' },
            { title: 'I CREATE DESIGN MAGIC', author: '김민경' },
            { title: '제목 추가', author: '김수빈' },
            { title: '인터랙티브 포트폴리오', author: '김수아' },
            { title: '제목 추가', author: '김승찬' },
            { title: '제목 추가', author: '김준희' },
            { title: '제목 추가', author: '김태호' },
            { title: '제목 추가', author: '류시은' },
            { title: '제목 추가', author: '박가람' },
            { title: '제목 추가', author: '심재정' },
            { title: '제목 추가', author: '양성우' },
            { title: '제목 추가', author: '우수지' },
            { title: '제목 추가', author: '원세연' },
            { title: '제목 추가', author: '유지수' },
            { title: '제목 추가', author: '윤비' },
            { title: '제목 추가', author: '이세윤' },
            { title: '제목 추가', author: '이지우' },
            { title: '제목 추가', author: '임율' },
            { title: '제목 추가', author: '임현준' },
            { title: '제목 추가', author: '장천수' },
            { title: '제목 추가', author: '최은지' },
            { title: '제목 추가', author: '최훈석' },
            { title: '제목 추가', author: '황세희' }
        ],
        visual: [
            { title: 'ANAKNE(굿즈디자인)', author: '강찬우' },
            { title: '제주여행', author: '김승빈' },
            { title: '제목 추가', author: '김은서' },
            { title: '하이트 100주년', author: '박경호' },
            { title: 'Portfolio', author: '박윤민' },
            { title: '제목 추가', author: '손상현' },
            { title: 'Graphic Design', author: '송다은' },
            { title: '제목 추가', author: '송민서' },
            { title: '제목 추가', author: '오난영' },
            { title: 'portfolio', author: '윤혜원' },
            { title: 'portfolio', author: '이동현' },
            { title: '제목 추가', author: '이연지' },
            { title: '앨범리디자인', author: '이영은' },
            { title: '브랜드B.I디자인', author: '이재원' },
            { title: '월인석봉에디션', author: '임재형' },
            { title: '킹부각 (패키지 디자인)', author: '정회강' },
            { title: '바라의 하루', author: '최민주' },
            { title: '자수롭게(로고, 굿즈디자인)', author: '한병헌' },
            { title: 'PORTFOLIO', author: '허준우' }
        ]
    };

    let currentCategory = 'digital';
    let projects = projectsData[currentCategory];

    // 카테고리 변경 시 프로젝트 목록 업데이트 함수
    function updateProjectsList(category) {
        currentCategory = category;
        projects = projectsData[category];

        // 프로젝트 휠 업데이트
        projectWheel.innerHTML = ''; // 기존 항목 제거
        initializeWheel();
        
        // 프로젝트 카드 업데이트
        projectStack.innerHTML = ''; // 기존 카드 제거
        createProjectCards();
        
        // 현재 인덱스 초기화
        currentIndex = 0;
        currentTranslate = -ITEM_HEIGHT;
        updateWheel();
    }

    const ITEM_HEIGHT = 50;
    let currentIndex = 0;
    let startY = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;

    // 프로젝트 아이템 생성
    function initializeWheel() {
        // 클론된 항목을 포한 총 항목 수
        const totalItems = projects.length + 2; // 두 개의 복사본 추가
        
        // 클론된 항목 추가
        const firstClone = document.createElement('div');
        firstClone.className = 'project-item';
        firstClone.textContent = projects[projects.length - 1].title; // 마지막 항목 클론

        const lastClone = document.createElement('div');
        lastClone.className = 'project-item';
        lastClone.textContent = projects[0].title; // 첫 번째 항목 클론

        projectWheel.appendChild(firstClone); // 맨 앞에 클론 추가

        for (let i = 0; i < projects.length; i++) {
            const item = document.createElement('div');
            item.className = 'project-item';
            item.textContent = projects[i].title;
            projectWheel.appendChild(item);
        }

        projectWheel.appendChild(lastClone); // 맨 뒤에 클론 추가

        // 초기 위치 설정
        currentTranslate = -ITEM_HEIGHT; // 첫 번째 클론으로 시작
        projectWheel.style.transform = `translateY(${currentTranslate}px)`;
    }

    function updateWheel() {
        const items = document.querySelectorAll('.project-item');
        const centerOffset = (projectList.offsetHeight - ITEM_HEIGHT) / 2;

        // 무한 스크롤을 위한 위치 조정 (애니메이션 없이 즉시 이동)
        if (currentTranslate > ITEM_HEIGHT) {
            projectWheel.style.transition = 'none'; // 애니메이션 제거
            currentTranslate -= (projects.length + 1) * ITEM_HEIGHT;
        } else if (currentTranslate < -(projects.length + 1) * ITEM_HEIGHT) {
            projectWheel.style.transition = 'none'; // 애니메이션 제거
            currentTranslate += (projects.length + 1) * ITEM_HEIGHT;
        }

        const centerPosition = -currentTranslate + centerOffset;

        items.forEach((item, index) => {
            const itemPosition = index * ITEM_HEIGHT;
            const distance = Math.abs(itemPosition - centerPosition);
            
            item.classList.remove('active', 'nearby', 'far');

            const realIndex = (index - 1 + projects.length) % projects.length; // 실제 인덱스 계산
            if (index > 0 && index < items.length - 1) {
                item.textContent = projects[realIndex].title;
            }

            // 현재 위치에 따라 nearby 클래스 추가
            if (Math.abs(itemPosition - centerPosition) < ITEM_HEIGHT / 2) {
                item.classList.add('active');
                currentIndex = realIndex;
            } else if (
                (index === 1 && currentIndex === projects.length - 1) || // 마지막 항목 아래 드래그
                (index === projects.length + 1 && currentIndex === 0) || // 첫 번째 항목 위 드래그
                Math.abs(itemPosition - (centerPosition - ITEM_HEIGHT)) < ITEM_HEIGHT / 2 ||
                Math.abs(itemPosition - (centerPosition + ITEM_HEIGHT)) < ITEM_HEIGHT / 2
            ) {
                item.classList.add('nearby');
            } else {
                item.classList.add('far');
            }
        });

        projectWheel.style.transform = `translateY(${currentTranslate}px)`;
        
        // 강제 리플로우를 통해 transition 스타일 재설정
        projectWheel.offsetHeight;
        projectWheel.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';

        // 카드 업데이트 추가
        updateCards(currentIndex);
    }

    function handleTouchStart(e) {
        startY = e.touches[0].clientY;
        isDragging = true;
        prevTranslate = currentTranslate;
    }

    function handleTouchMove(e) {
        if (!isDragging) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        currentTranslate = prevTranslate + diff;

        requestAnimationFrame(updateWheel);
    }

    function handleTouchEnd() {
        isDragging = false;

        // 가장 가까운 항목으로 스냅
        const itemOffset = Math.round(currentTranslate / ITEM_HEIGHT) * ITEM_HEIGHT;

        // 경계 지점에서의 이동인지 확인
        const isAtBoundary = 
            currentTranslate > ITEM_HEIGHT || 
            currentTranslate < -(projects.length + 1) * ITEM_HEIGHT;

        if (!isAtBoundary) {
            projectWheel.style.transition = 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
        } else {
            projectWheel.style.transition = 'none';
        }

        currentTranslate = itemOffset;

        requestAnimationFrame(() => {
            updateWheel();
            if (!isAtBoundary) {
                setTimeout(() => {
                    projectWheel.style.transition = '';
                }, 300);
            }
        });
    }

    projectList.addEventListener('touchstart', handleTouchStart);
    projectList.addEventListener('touchmove', handleTouchMove);
    projectList.addEventListener('touchend', handleTouchEnd);

    // 초기화
    initializeWheel();
    updateWheel();

    // 프로젝트 스택 관련 코드 추가
    const projectStack = document.querySelector('.project-stack');
    
    function createProjectCards() {
        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-image"></div>
                <div class="project-info">
                    <p>${project.author}</p>
                </div>
            `;
            projectStack.appendChild(card);
        });

        // 첫 번째 카드를 활성화
        updateCards(0);
    }

    function updateCards(activeIndex) {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            card.classList.remove('active', 'next');
            
            if (index === activeIndex) {
                card.classList.add('active');
            } else if (index === (activeIndex + 1) % projects.length) {
                card.classList.add('next');
            }
        });
    }

    // 초기화 시 카드 생성 추가
    createProjectCards();

    // Grid View와 List View 버튼에 SVG 추가
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');

    if (gridViewBtn) {
        gridViewBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                <rect width="7" height="7" fill="currentColor" rx="1"/>
                <rect width="7" height="7" y="9" fill="currentColor" rx="1"/>
                <rect width="7" height="7" x="9" fill="currentColor" rx="1"/>
                <rect width="7" height="7" x="9" y="9" fill="currentColor" rx="1"/>
            </svg>
        `;
    }

    if (listViewBtn) {
        listViewBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
                <rect width="16" height="10" fill="currentColor" rx="1"/>
                <rect width="16" height="4" y="12" fill="currentColor" rx="1"/>
            </svg>
        `;
    }

    // 버튼 활성화/비활성화 기능 추가
    function setActiveView(viewType) {
        if (viewType === 'grid') {
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        } else {
            gridViewBtn.classList.remove('active');
            listViewBtn.classList.add('active');
        }
    }

    // 클릭 이벤트 리스너 추가
    gridViewBtn.addEventListener('click', () => setActiveView('grid'));
    listViewBtn.addEventListener('click', () => setActiveView('list'));

    // 초기 상태 설정 (그리드 뷰를 기본값으로)
    setActiveView('lis');

    // 카테고리 전환 기능 수정
    const categoryTexts = document.querySelectorAll('.category-text');
    
    categoryTexts.forEach(text => {
        text.addEventListener('click', () => {
            if (text.classList.contains('active')) return;
            
            categoryTexts.forEach(t => t.classList.remove('active'));
            text.classList.add('active');
            
            // 카테고리에 따라 프로젝트 목록 업데이트
            const category = text.textContent.toLowerCase();
            updateProjectsList(category);
        });
    });

    // 초기화 시 기본 카테고리(Digital) 데이터로 시작
    projects = projectsData.digital;
}

// DOMContentLoaded 이벤트에서 초기화
document.addEventListener('DOMContentLoaded', initializeMobile);

// resize 이벤트에서도 초기화
let resizeTimer;
window.addEventListener('resize', () => {
    // 디바운싱 적용
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        initializeMobile();
    }, 250); // 250ms 딜레이
});


// 뷰 전환 함수
function setActiveView(viewType) {
    const projectGridView = document.querySelector('.project-grid-view');
    const projectListView = document.querySelector('.project-list-view');
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');

    if (viewType === 'grid') {
        // 버튼 상태 변경
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
        
        // 뷰 전환
        projectGridView.style.display = 'grid';
        projectListView.style.display = 'none';
        
        // 그리드 뷰 초기화
        initializeGridView();
    } else {
        // 버튼 상태 변경
        gridViewBtn.classList.remove('active');
        listViewBtn.classList.add('active');
        
        // 뷰 전환
        projectGridView.style.display = 'none';
        projectListView.style.display = 'block';
        
        // 리스트 뷰 초기화
        initializeListView();
    }
}

// 리스트 뷰 초기화 함수
function initializeListView() {
    projectWheel.innerHTML = '';
    initializeWheel();
    projectStack.innerHTML = '';
    createProjectCards();
}

// 뷰 전환 버튼 이벤트 리스너
const gridViewBtn = document.querySelector('.grid-view');
const listViewBtn = document.querySelector('.list-view');

gridViewBtn.addEventListener('click', () => setActiveView('grid'));
listViewBtn.addEventListener('click', () => setActiveView('list'));


