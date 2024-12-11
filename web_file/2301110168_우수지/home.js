document.addEventListener('DOMContentLoaded', () => {
    const listItems = document.querySelectorAll('.list ul li');
    let selectedIndex = 0; // 초기 선택된 항목 인덱스 설정

    // 초기 선택된 항목 강조 표시
    updateSelection();

    // 방향 버튼 이벤트 설정
    document.querySelector('.up').addEventListener('click', () => moveSelection(-1));
    document.querySelector('.down').addEventListener('click', () => moveSelection(1));
    document.querySelector('.left').addEventListener('click', () => moveSelection(-1));
    document.querySelector('.right').addEventListener('click', () => moveSelection(1));

    // A 버튼 클릭 시 현재 선택된 항목의 a 요소를 클릭
    document.querySelector('.b_A').addEventListener('click', () => {
        const link = listItems[selectedIndex].querySelector('a');
        if (link) {
            link.click(); // 선택된 항목의 링크 클릭
        }
    });

    // 선택된 리스트 항목 업데이트
    function updateSelection() {
        listItems.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('selected'); // 선택된 항목에 클래스 추가
            } else {
                item.classList.remove('selected'); // 선택되지 않은 항목 클래스 제거
            }
        });
    }

    // 선택 항목 이동 함수
    function moveSelection(direction) {
        selectedIndex += direction;

        // 리스트 인덱스 범위를 초과하지 않도록 제한
        if (selectedIndex < 0) {
            selectedIndex = listItems.length - 1;
        } else if (selectedIndex >= listItems.length) {
            selectedIndex = 0;
        }

        updateSelection();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const b_B = document.querySelector(".b_B");

    // B 버튼 클릭 시 뒤로가기 기능
    b_B.addEventListener("click", function (event) {
        event.preventDefault(); // 기본 동작 방지
        window.history.back(); // 뒤로가기
    });
});