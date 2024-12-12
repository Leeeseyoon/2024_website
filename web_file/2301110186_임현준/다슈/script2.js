document.addEventListener('DOMContentLoaded', function() {
    // 카테고리 링크들을 선택
    const categoryLinks = document.querySelectorAll('.category-nav a');
    // 모든 카테고리 섹션을 선택
    const categorySections = document.querySelectorAll('.category-section');

    // 초기 상태 설정 (전체 카테고리 표시)
    showCategory('all');

    // 각 카테고리 링크에 클릭 이벤트 추가
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 활성 클래스 제거
            categoryLinks.forEach(l => l.classList.remove('active'));
            // 클릭된 링크에 활성 클래스 추가
            this.classList.add('active');
            
            // 선택된 카테고리 표시
            const category = this.getAttribute('data-category');
            showCategory(category);
        });
    });

    // 카테고리 표시 함수
    function showCategory(category) {
        categorySections.forEach(section => {
            if (category === 'all') {
                section.style.display = 'block';
            } else {
                if (section.id === category) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            }
        });
    }
});

document.querySelectorAll('.category-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.dataset.category;
        
        // 모든 배너 콘텐츠 숨기기
        document.querySelectorAll('.banner-content').forEach(banner => {
            banner.classList.remove('active');
        });
        
        // 선택된 카테고리의 배너 보여주기
        const selectedBanner = document.querySelector(`.banner-content[data-category="${category}"]`);
        if (selectedBanner) {
            selectedBanner.classList.add('active');
        }
    });
});