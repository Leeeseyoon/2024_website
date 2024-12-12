document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.tech-menu li');
    
    // 페이지 로드 시 첫 번째 메뉴 아이템의 내용을 표시
    const firstMenuItem = menuItems[0];
    if (firstMenuItem) {
        const title = firstMenuItem.dataset.title;
        const image = firstMenuItem.dataset.image;
        const description = firstMenuItem.dataset.description;
        
        // 첫 번째 메뉴 아이템을 활성화
        firstMenuItem.querySelector('a').classList.add('active');
        
        // 초기 콘텐츠 설정 (페이드 효과 없이)
        const titleElement = document.querySelector('.coil-content h2');
        const descElement = document.getElementById('coil-description');
        const imageElement = document.getElementById('coil-image');
        
        titleElement.innerHTML = title + '';
        descElement.innerHTML = description;
        imageElement.src = image;
    }
    
    // 기존의 클릭 이벤트 리스너
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.dataset.title;
            const image = this.dataset.image;
            const description = this.dataset.description;
            
            menuItems.forEach(item => item.querySelector('a').classList.remove('active'));
            this.querySelector('a').classList.add('active');
            
            fadeContent(title, image, description);
        });
    });
});

function fadeContent(title, image, description) {
    const titleElement = document.querySelector('.coil-content h2');
    const descElement = document.getElementById('coil-description');
    const imageElement = document.getElementById('coil-image');
    
    // 페이드 아웃
    titleElement.style.opacity = '0';
    descElement.style.opacity = '0';
    imageElement.style.opacity = '0';
    
    // 0.3초 후에 내용을 변경하고 페이드 인
    setTimeout(() => {
        titleElement.innerHTML = title + '';
        descElement.innerHTML = description;
        imageElement.src = image;
        
        // 페이드 인
        titleElement.style.opacity = '1';
        descElement.style.opacity = '1';
        imageElement.style.opacity = '1';
    }, 300);
}
