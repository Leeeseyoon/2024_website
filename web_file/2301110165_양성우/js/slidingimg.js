/* document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slide-image');
    let currentIndex = 0;
    
    function showNextImage() {
        // 모든 이미지 숨기기
        images.forEach(img => img.style.opacity = 0);
        
        // 현재 이미지 보이기
        images[currentIndex].style.opacity = 1;
        
        // 다음 이미지 인덱스 계산
        currentIndex = (currentIndex + 1) % images.length;
        
        // 3초 후에 다음 이미지 표시
        setTimeout(showNextImage, 3000);
    }
    
    // 애니메이션 시작
    showNextImage();
}); */