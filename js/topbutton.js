const $topBtns = document.querySelectorAll(".moveTopBtn");

$topBtns.forEach(($btn) => {
    $btn.onmouseover = () => {
        $btn.querySelector('.default-img').style.display = 'none'; // 기본 이미지 숨기기
        $btn.querySelector('.hover-img').style.display = 'block'; // 호버 이미지 보이기
    };

    $btn.onmouseout = () => {
        $btn.querySelector('.default-img').style.display = 'block'; // 기본 이미지 보이기
        $btn.querySelector('.hover-img').style.display = 'none'; // 호버 이미지 숨기기
    };

    $btn.onclick = () => {
        // 스크롤 애니메이션 시작
        window.scrollTo({ top: 0, behavior: "smooth" });

        // 스크롤 애니메이션이 끝난 후 원래 상태로 돌아오도록 설정
        setTimeout(() => {
            $btn.querySelector('.default-img').style.display = 'block'; // 기본 이미지 보이기
            $btn.querySelector('.hover-img').style.display = 'none'; // 호버 이미지 숨기기
        }, 500); // 스크롤 애니메이션 시간과 일치하도록 설정 (0.5초)
    };
});