/* document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 5 + 'px';
        cursor.style.top = e.clientY - 5 + 'px';
    });

    // 클릭 가능한 요소들 위에서 커서 상태 변경
    const clickableElements = document.querySelectorAll('a, button, input[type="submit"], input[type="button"], select, [role="button"]');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
});  */




/* 커스텀 커서 */
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    let isRotated = false; // 회전 상태를 추적하는 변수 추가

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // 커서 호버 시 스타일 변경
    document.querySelectorAll('.archives-content').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.transition = 'width 0.3s, height 0.3s'; // 크기 변화에 애니메이션 추가
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.background = '#2D2C2B';
            cursor.style.display = 'flex';
            cursor.style.justifyContent = 'center';
            cursor.style.alignItems = 'center';
            cursor.innerHTML = '<div style="width: 1px; height: 25px; background: #b4b4b4; position: absolute;"></div>' + 
                               '<div style="width: 25px; height: 1px; background: #b4b4b4; position: absolute;"></div>'; // + 모양을 선 2개로 변경
            cursor.style.color = 'white'; // 글자 색상
            cursor.style.fontSize = '35px'; // 글자 크기
            cursor.style.fontWeight = 'lighter'; // 글자 두께를 얇게 설정
            cursor.style.textAlign = 'center'; // 텍스트 정렬
            cursor.style.lineHeight = '0px'; // 세로 정렬을 위해 line-height 설정
            cursor.style.transform = 'translate(-50%, -50%)'; // 중앙 정렬을 위한 변환 추가 (위로 약간 이동)
        });

        item.addEventListener('mouseleave', () => {
            cursor.style.transition = 'width 0.3s, height 0.3s'; // 크기 변화에 애니메이션 추가
            cursor.style.width = '20px'; // 원래 크기로 복원
            cursor.style.height = '20px'; // 원래 크기로 복원
            cursor.innerHTML = ''; // 기호 제거
        });

        // 클릭 시 + 기호를 X로 회전
        item.addEventListener('click', () => {
            cursor.style.transition = 'transform 0.3s'; // 회전 애니메이션 추가
            if (!isRotated) {
                cursor.style.transform = 'translate(-50%, -60%) rotate(45deg)'; // +를 X로 회전
                isRotated = true; // 회전 상태를 X로 유지
            }
            // image-display 영역에서 X 모양 유지
            if (item.classList.contains('image-display')) {
                cursor.style.transform = 'translate(-50%, -60%) rotate(45deg)'; // X 모양 유지
            }
        });
    });
});



