document.addEventListener('DOMContentLoaded', () => {
    const productBoxes = document.querySelectorAll('.product-box');
    const burgerImage = document.getElementById('burgerImage');
    const burgerTitle = document.querySelector('.burger-section h2');
    const burgerDescription = document.querySelector('.burger-section p');

    productBoxes.forEach(box => {
        box.addEventListener('click', (event) => {
            // Get the clicked product's ID
            const productId = event.currentTarget.id;
            let newSrc = '';
            let newTitle = '';
            let newDescription = '';

            switch (productId) {
                case 'product-1':
                    newSrc = '꿩/더블데리.png';
                    newTitle = '더블데리버거';
                    newDescription = '두 장의 패티가 이루는 조화로운 맛에 <br>든든함까지 추가된 더블버거 시리즈 <br> <span class="price">4500원</span>';
                    break;
                case 'product-2':
                    newSrc = '꿩/불고기버거.png';
                    newTitle = '불고기버거';
                    newDescription = '두툼한 쇠고기패티와 <br> 한국적인 맛의 소스가 잘 조화된 <br> 롯데리아 대표 버거 <br> <span class="price">4700원</span>';
                    break;
                // Add more cases if there are more products
            }

            // Add fade-out class to current elements
            burgerImage.classList.add('fade-out');
            burgerTitle.classList.add('fade-out');
            burgerDescription.classList.add('fade-out');

            // Wait for the fade-out transition to complete
            setTimeout(() => {
                // Change the image source and text content
                burgerImage.src = newSrc;
                burgerTitle.innerHTML = newTitle;
                burgerDescription.innerHTML = newDescription;

                // Remove fade-out class and add fade-in class
                burgerImage.classList.remove('fade-out');
                burgerImage.classList.add('fade-in');
                burgerTitle.classList.remove('fade-out');
                burgerTitle.classList.add('fade-in');
                burgerDescription.classList.remove('fade-out');
                burgerDescription.classList.add('fade-in');

                // Remove fade-in class after animation completes
                setTimeout(() => {
                    burgerImage.classList.remove('fade-in');
                    burgerTitle.classList.remove('fade-in');
                    burgerDescription.classList.remove('fade-in');
                }, 300);
            }, 300);
        });
    });
});
