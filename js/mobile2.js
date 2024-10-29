document.addEventListener("DOMContentLoaded", function () {
    const scrollbar = document.getElementById('scrollbar-container');
    const lines = document.querySelectorAll('.scroll-line');
    const projectImage = document.getElementById('project-image'); // 이미지 요소
    const projectTitle = document.getElementById('project-title'); // 제목 요소
    const projectName = document.getElementById('project-name'); // 이름 요소
    let isDragging = false;
    let currentIndex = Math.floor(lines.length / 2); // 중앙 선 인덱스

    // 이미지 제목과 이름 배열
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

    // 초기 중앙 선 활성화 및 이미지 설정
    lines[currentIndex].classList.add('active');
    updateImage(currentIndex); // 초기 이미지 설정
    updateText(currentIndex); // 초기 텍스트 설정

    // 이미지 업데이트 함수
    function updateImage(index) {
        projectImage.src = `images/img${index + 1}.jpg`; // 이미지 파일 경로
    }

    // 텍스트 업데이트 함수
    function updateText(index) {
        projectTitle.textContent = titles[index]; // 제목 업데이트
        projectName.textContent = names[index]; // 이름 업데이트
    }

    // 선 길이 조정 및 위치 조정 함수
    function setActiveLine(index) {
        lines.forEach((line, i) => {
            line.classList.remove('active');
            line.style.height = "30px"; // 기본 선 길이
            line.style.opacity = "0.5"; // 기본 투명도 설정
        });

        lines[index].classList.add('active'); // 중앙 선을 항상 길게 유지
        lines[index].style.height = "50px"; // 중앙 선 길이 늘리기
        lines[index].style.opacity = "1"; // 중앙 선의 투명도 설정
    }

    // 드래그 시작
    function startDrag(e) {
        isDragging = true;
        dragMove(e);
    }

    // 드래그 종료
    function endDrag() {
        isDragging = false;
    }

    // 드래그 이동
    function dragMove(e) {
        if (!isDragging) return;

        const rect = scrollbar.getBoundingClientRect();
        const mouseX = e.clientX - rect.left; // 마우스 위치의 X 좌표
        const lineWidth = rect.width / lines.length; // 각 선의 너비

        // 현재 마우스 위치에 따른 인덱스 계산
        const newIndex = Math.floor(mouseX / lineWidth);

        // 인덱스 범위 조정
        if (newIndex < 0 || newIndex >= lines.length) return;

        // 중앙 인덱스를 업데이트하고 선의 위치를 조정
        if (newIndex !== currentIndex) {
            currentIndex = newIndex; // 중앙 인덱스 업데이트
            setActiveLine(currentIndex); // 중앙 선 업데이트
            updateImage(currentIndex); // 이미지 업데이트
            updateText(currentIndex); // 텍스트 업데이트
        }
    }

    // 이벤트 리스너 추가
    scrollbar.addEventListener('mousedown', startDrag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('mousemove', dragMove);
    
    // 터치 이벤트 추가 (모바일)
    scrollbar.addEventListener('touchstart', startDrag);
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchmove', dragMove);
});





















