document.querySelectorAll('.view-profile-button').forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left; // 버튼 내에서의 마우스 X 좌표
        const y = e.clientY - rect.top;  // 버튼 내에서의 마우스 Y 좌표
        
        const ripple = button.querySelector('::before');
        // ripple 위치를 마우스 커서 위치로 설정
        button.style.setProperty('--ripple-x', x + 'px');
        button.style.setProperty('--ripple-y', y + 'px');
    });
});