/* document.addEventListener("DOMContentLoaded", function () {
    const imagesContainer = document.getElementById('mobile-images');
    const scrollbar = document.getElementById('scrollbar');
    const projectTitle = document.getElementById('project-title');
    const projectName = document.getElementById('project-name');

    const totalImages = 40; // 총 이미지 수
    const images = [];
    const titles = [
        "제목 1", "제목 2", "제목 3", "제목 4", "제목 5",
        "제목 6", "제목 7", "제목 8", "제목 9", "제목 10",
        "제목 11", "제목 12", "제목 13", "제목 14", "제목 15",
        "제목 16", "제목 17", "제목 18", "제목 19", "제목 20",
        "제목 21", "제목 22", "제목 23", "제목 24", "제목 25",
        "제목 26", "제목 27", "제목 28", "제목 29", "제목 30",
        "제목 31", "제목 32", "제목 33", "제목 34", "제목 35",
        "제목 36", "제목 37", "제목 38", "제목 39", "제목 40"
    ];
    const names = [
        "이름 1", "이름 2", "이름 3", "이름 4", "이름 5",
        "이름 6", "이름 7", "이름 8", "이름 9", "이름 10",
        "이름 11", "이름 12", "이름 13", "이름 14", "이름 15",
        "이름 16", "이름 17", "이름 18", "이름 19", "이름 20",
        "이름 21", "이름 22", "이름 23", "이름 24", "이름 25",
        "이름 26", "이름 27", "이름 28", "이름 29", "이름 30",
        "이름 31", "이름 32", "이름 33", "이름 34", "이름 35",
        "이름 36", "이름 37", "이름 38", "이름 39", "이름 40"
    ];

    // 이미지 배열 생성 (예시 이미지 경로 사용)
    for (let i = 1; i <= totalImages; i++) {
        images.push(`images/img${i}.jpg`); // 경로 수정
    }

    // 이미지 추가
    images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `이미지`;
        img.onerror = () => console.error(`Failed to load image: ${src}`); // 로드 실패 시 로그
        imagesContainer.appendChild(img);
    });

    let currentIndex = 0;

    // 선 추가
    function createLines() {
        for (let i = 0; i < totalImages; i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            scrollbar.appendChild(line);
        }
    }

    function updateSlider() {
        imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        const lines = scrollbar.querySelectorAll('.line');
        lines.forEach((line, index) => {
            line.classList.remove('active-line');
            if (index === currentIndex) {
                line.classList.add('active-line'); // 현재 활성화된 선
            }
        });

        // 프로젝트 제목과 이름 업데이트
        projectTitle.textContent = titles[currentIndex];
        projectName.textContent = names[currentIndex];
    }

    // 드래그 기능 추가 (마우스 및 터치 이벤트)
    let isDragging = false;
    let startX;

    function startDrag(e) {
        isDragging = true;
        startX = e.pageX || e.touches[0].pageX; // 터치 이벤트에서 X좌표 가져오기
    }

    function endDrag() {
        isDragging = false;
    }

    function dragMove(e) {
        if (!isDragging) return;

        const x = (e.pageX || e.touches[0].pageX) - scrollbar.offsetLeft; // 터치 이벤트에서 X좌표 가져오기
        const scrollWidth = scrollbar.clientWidth;
        const percentage = (x / scrollWidth) * (totalImages - 1);
        currentIndex = Math.round(percentage);

        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex >= totalImages) currentIndex = totalImages - 1;

        updateSlider();
    }

    scrollbar.addEventListener('mousedown', startDrag);
    scrollbar.addEventListener('touchstart', startDrag); // 터치 시작 이벤트
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag); // 터치 종료 이벤트
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('touchmove', dragMove); // 터치 이동 이벤트

    createLines(); // 선 생성
    // 초기 슬라이드 업데이트
    updateSlider();
}); */




