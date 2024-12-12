document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    let isDropdownOpen = false;
    let currentOpenDropdown = null;
    
    // 초기 상태 설정
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
        dropdownMenu.style.pointerEvents = 'none';
        dropdownMenu.style.transition = 'opacity 0.3s ease'; // transition 속성 추가
    });
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        let timeoutId;

        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);    
            
            if (!isDropdownOpen) {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.pointerEvents = 'auto';
                isDropdownOpen = true;
                currentOpenDropdown = dropdownMenu;
            } else if (currentOpenDropdown !== dropdownMenu) {
                const oldContent = currentOpenDropdown.innerHTML;
                const newContent = dropdownMenu.innerHTML;
                currentOpenDropdown.innerHTML = newContent;
                dropdownMenu.innerHTML = oldContent;
                currentOpenDropdown = dropdownMenu;
            }
        });

        // nav-menu 영역을 벗어날 때만 드롭다운 닫기
        const navMenu = document.querySelector('.nav-menu');
        navMenu.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
                if (isDropdownOpen && currentOpenDropdown) {
                    // 페이드 아웃 효과로 변경
                    currentOpenDropdown.style.transition = 'opacity 0.3s ease';
                    currentOpenDropdown.style.opacity = '0';
                    currentOpenDropdown.style.visibility = 'hidden';
                    currentOpenDropdown.style.pointerEvents = 'none';
                    isDropdownOpen = false;
                    currentOpenDropdown = null;
                }
            }, 100);
        });
    });
});