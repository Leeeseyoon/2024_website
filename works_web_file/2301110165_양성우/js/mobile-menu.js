document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.mobile-sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    const mobileNav = document.querySelector('.mobile-nav');
    const navCenter = document.querySelector('.nav-center');
    
    // nav-center의 내용을 모바일 사이드바로 복제
    if (navCenter && mobileNav) {
        // nav-center의 내용을 복제
        const navContent = navCenter.innerHTML;
        mobileNav.innerHTML = navContent;

        // 모바일에서는 'SKIN CARE'와 'MAKE UP' 드롭다운 메뉴 제거
        const skinCareLink = mobileNav.querySelector('.nav-item:nth-child(3)');
        const makeupLink = mobileNav.querySelector('.nav-item:nth-child(4)');
        
        if (skinCareLink) {
            skinCareLink.innerHTML = '<a href="#">SKIN CARE</a>';
        }
        if (makeupLink) {
            makeupLink.innerHTML = '<a href="#">MAKE UP</a>';
        }

        // BRAND 드롭다운 메뉴만 처리
        const dropdowns = mobileNav.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            // BRAND 메뉴에 대해서만 드롭다운 기능 유지
            if (dropdown.querySelector('a').textContent === 'BRAND') {
                const link = dropdown.querySelector('a');
                const menu = dropdown.querySelector('.dropdown-menu');
                
                link.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    // brand.html로 이동
                    window.location.href = 'brand.html';
                });
            }
        });
    }

    // 햄버거 메뉴 토글
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // 닫기 버튼
    sidebarClose.addEventListener('click', function() {
        hamburger.classList.remove('active');
        sidebar.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // 사이드바 외부 클릭시 닫기
    document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}); 