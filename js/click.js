document.addEventListener("DOMContentLoaded", function() {
    const visElement = document.querySelector('.vis');
    const digElement = document.querySelector('.dig');
    const singleViewButton = document.getElementById('single-view');
    const multipleViewButton = document.getElementById('multiple-view');

    visElement.addEventListener('click', function(event) {
        // 버튼 클릭 시에는 크기가 커지지 않도록
        if (!event.target.classList.contains('view-button')) {
            visElement.classList.add('large'); // 글씨 크기 증가
            digElement.classList.remove('large'); // dig 원래 크기로
        }
    });

    digElement.addEventListener('click', function(event) {
        // 버튼 클릭 시에는 크기가 커지지 않도록
        if (!event.target.classList.contains('view-button')) {
            digElement.classList.add('large'); // 글씨 크기 증가
            visElement.classList.remove('large'); // vis 원래 크기로
        }
    });

    // 바깥 공간 클릭 시 원래 크기로 되돌리기
    document.addEventListener('click', function(event) {
        // 클릭된 요소가 vis 또는 dig가 아닐 경우
        if (!visElement.contains(event.target) && !digElement.contains(event.target)) {
            visElement.classList.remove('large');
            digElement.classList.remove('large');
        }
    });

    // 버튼 클릭 시 이벤트 전파 방지
    singleViewButton.addEventListener('click', function(event) {
        event.stopPropagation(); // 클릭 이벤트 전파 방지
        // 여기서 버튼 클릭 시 추가 작업을 수행할 수 있습니다.
    });

    multipleViewButton.addEventListener('click', function(event) {
        event.stopPropagation(); // 클릭 이벤트 전파 방지
        // 여기서 버튼 클릭 시 추가 작업을 수행할 수 있습니다.
    });
});
