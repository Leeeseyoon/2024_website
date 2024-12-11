// debounce 함수 정의
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const archivesContents = document.querySelectorAll(".archives-content");

    archivesContents.forEach(content => {
        const projectImage = content.querySelector('.project-image');
        const imageDisplay = content.nextElementSibling;
        
        // PC 환경에서만 마우스 이벤트 적용
        if (window.innerWidth > 768) {
            // mousemove 이벤트
            content.addEventListener("mousemove", debounce(function(event) {
                const offsetX = 40;
                const offsetY = 40;
                
                if (projectImage) {
                    projectImage.style.left = `${event.clientX + offsetX}px`;
                    projectImage.style.top = `${event.clientY + offsetY}px`;
                }
            }, 10));

            // mouseenter 이벤트
            content.addEventListener("mouseenter", function() {
                if (!imageDisplay.classList.contains('show')) {
                    if (projectImage) {
                        projectImage.style.display = 'block';
                        projectImage.style.opacity = 1;
                        projectImage.style.position = 'fixed';
                    }
                }
            });

            // mouseleave 이벤트
            content.addEventListener("mouseleave", function() {
                if (projectImage) {
                    projectImage.style.opacity = 0;
                }
            });
        }

        // 모든 환경에서 클릭 이벤트 적용
        content.addEventListener('click', () => {
            const images = JSON.parse(content.getAttribute('data-images'));
            const description = content.getAttribute('data-description');
            
            imageDisplay.innerHTML = '';
            
            // 이미지와 설명을 감싸는 컨테이너 생성
            const contentContainer = document.createElement('div');
            contentContainer.style.display = 'flex';
            contentContainer.style.alignItems = 'center';
            contentContainer.style.gap = '2rem';
            contentContainer.style.padding = '2rem';
            contentContainer.style.flexDirection = window.innerWidth < 768 ? 'column' : 'row';
            
            // 이미지 컨테이너
            const imageContainer = document.createElement('div');
            imageContainer.style.flex = '1';
            images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = "Project Image";
                img.style.width = '100%';
                img.style.height = 'auto';
                img.style.maxWidth = '400px';
                imageContainer.appendChild(img);
            });
            
            // 설명 컨테이너
            if (description) {
                const descriptionElement = document.createElement('div');
                descriptionElement.className = 'project-description';
                
                // 특별한 구분자를 HTML로 변환
                const formattedText = description
                    .replace(/\*([^*]+)\*/g, '<strong>$1</strong>')
                    .replace(/\|\|/g, '<br>');
                    
                descriptionElement.innerHTML = formattedText;
                
                contentContainer.appendChild(imageContainer);
                contentContainer.appendChild(descriptionElement);
            } else {
                contentContainer.appendChild(imageContainer);
            }
            
            imageDisplay.appendChild(contentContainer);

            if (imageDisplay.classList.contains('show')) {
                imageDisplay.classList.remove('show');
                imageDisplay.style.height = '0';
            } else {
                imageDisplay.classList.add('show');
                imageDisplay.style.height = '400px';
            }
        });

        // 모든 환경에서 imageDisplay 클릭 이벤트 적용
        imageDisplay.addEventListener('click', () => {
            if (imageDisplay.classList.contains('show')) {
                imageDisplay.classList.remove('show');
                imageDisplay.style.height = '0';
            }
        });
    });
});
























