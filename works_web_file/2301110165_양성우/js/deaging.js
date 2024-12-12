let currentIndex = 0;
const images = document.querySelectorAll('.img-container');

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.remove('active');
        if (i === index) {
            img.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollY / totalHeight;
    const newIndex = Math.floor(scrollPercentage * images.length);

    if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        showImage(currentIndex);
    }
});

// 초기 이미지 표시
showImage(currentIndex);
