(function () {
    const link = document.querySelectorAll('nav > .hover-this');
    const cursor = document.querySelector('.custom_cursor');

    const animateit = function (e) {
        const span = this.querySelector('span');
        const {offsetX: x, offsetY: y} = e;
        const {offsetWidth: width, offsetHeight: height} = this,
        
        move = 25;
        xMove = x / width * (move * 2) - move,
        yMove = y / height * (move * 2) - move;

        span.style.transform = `translate(${xMove}px, ${yMove}px)`;

        if (e.type === 'mousemove') span.style.transform = '';
    };

    const editCursor = e => {
        const { clientX: x, clientY: y } = e;
        cursor.style.left =  x + `px`;
        cursor.style.top = y +`px`;
    };

    const cursorScaleUp = function() {
        cursor.style.transform = 'scale(4)';
        cursor.style.transition = 'transform 0.3s ease';
        cursor.style.mixBlendMode = 'difference';
    };
    
    const cursorScaleDown = function() {
        cursor.style.transform = 'scale(1)';
        cursor.style.mixBlendMode = 'normal';
    };

    const infoTitle = document.querySelectorAll('.info_title h2, .identity_title, .tab_title h2, .tab_img img,');

    link.forEach(b => b.addEventListener('mousemove', animateit));
    link.forEach(b => b.addEventListener('mouseleave', editCursor));
    window.addEventListener('mousemove', editCursor);
    
    infoTitle.forEach(title => {
        title.addEventListener('mouseenter', cursorScaleUp);
        title.addEventListener('mouseleave', cursorScaleDown);
    });

    // 커스텀 커서 관련 코드
    document.addEventListener('DOMContentLoaded', function() {
        const cursor = document.querySelector('.custom_cursor');
        
        document.addEventListener('mousemove', function(e) {
            requestAnimationFrame(() => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
        });

        // 카테고리 버튼에 대한 커서 효과
        const categoryButtons = document.querySelectorAll('.category-btn');
        const textItems = document.querySelectorAll('.text-item');
        
        categoryButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.transition = 'transform 0.3s ease';
                cursor.style.mixBlendMode = 'difference';
            });
            
            button.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.transition = 'transform 0.3s ease';
                cursor.style.mixBlendMode = 'normal';
            });
        });

        // text-item에 대한 커서 효과 추가
        textItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.transition = 'transform 0.3s ease';
                cursor.style.mixBlendMode = 'difference';
            });
            
            item.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.transition = 'transform 0.3s ease';
                cursor.style.mixBlendMode = 'normal';
            });
        });
    });
})();