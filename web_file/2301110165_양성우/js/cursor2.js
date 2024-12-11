const textSection = document.querySelector('.text_section h2');
const cursor = document.querySelector('.custom-cursor');
const email = 'example@example.com'; // 복사할 이메일 주소

textSection.addEventListener('mouseenter', () => {
    cursor.style.transition = 'transform 0.2s ease'; // 부드러운 전환 추가
    cursor.style.transform = 'scale(4.5)'; // 커서 사이즈 증가
    cursor.style.mixBlendMode = ''; // 혼합 모드 적용
    cursor.textContent = 'Email'; // 커서 안에 'email' 텍스트 추가
    cursor.style.color = 'white'; // 글씨 색상을 흰색으로 설정
    cursor.style.fontSize = '3px'; // 글씨 크기를 작게 설정
    cursor.style.textAlign = 'center'; // 텍스트 가운데 정렬
    cursor.style.display = 'flex'; // 플렉스 박스 사용
    cursor.style.alignItems = 'center'; // 수직 가운데 정렬
    cursor.style.justifyContent = 'center'; // 수평 가운데 정렬
    cursor.style.mixBlendMode = ''
});

textSection.addEventListener('mouseleave', () => {
    cursor.style.transition = 'transform 0.2s ease'; // 부드러운 전환 추가
    cursor.style.transform = 'scale(1)'; // 원래 사이즈로 복원
    cursor.style.mixBlendMode = ''; // 혼합 모드 초기화
    cursor.textContent = ''; // 커서 텍스트 초기화
});

// 클릭 시 이메일 복사
textSection.addEventListener('click', () => {
    navigator.clipboard.writeText(email).then(() => {
        cursor.textContent = 'copied'; // 'copied' 텍스트 추가
        setTimeout(() => {
            cursor.textContent = 'email'; // 원래 텍스트로 복원
        }, 1000); // 1초 후에 원래 텍스트로 복원
        console.log('이메일이 클립보드에 복사되었습니다: ' + email);
    }).catch(err => {
        console.error('이메일 복사 실패: ', err);
    });
});