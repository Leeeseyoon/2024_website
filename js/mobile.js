document.addEventListener('DOMContentLoaded', () => {
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

    const projects = [
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
    ];

    const ITEM_HEIGHT = 50;
    let currentIndex = 0;
    let startY = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;

    // 프로젝트 아이템 생성
    function initializeWheel() {
        // 클론된 항목을 포함한 총 항목 수
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
});
