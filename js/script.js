import { interiors } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector(".cursor");
    const gallery = document.querySelector(".gallery");
    const numberOfItems = 40; // interiors 배열의 길이로 설정
    const radius = 1200; // 두 번째 코드의 반경 사용
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / numberOfItems;
    const centerThreshold = 200;

    let lastIndex = -1; // 마지막 인덱스 추적

    // cursor 스타일 설정
    cursor.style.position = "fixed";
    cursor.style.left = "55%";
    cursor.style.top = "40%";
    cursor.style.transform = "translate(-50%, -50%)";
    cursor.style.pointerEvents = "none";

    // Create gallery items
    for (let i = 0; i < numberOfItems; i++) {
        const item = document.createElement("div");
        item.className = "item";
        item.dataset.id = interiors[i].id; // 데이터 ID 추가

        // 클릭 이벤트 추가
        item.addEventListener('click', function () {
            const clickedId = parseInt(this.dataset.id);
            const targetIndex = interiors.findIndex(item => item.id === clickedId);
            const targetAngle = targetIndex * angleIncrement;
            const targetScrollPosition = targetAngle / 0.00035;

            window.scrollTo({
                top: targetScrollPosition,
                behavior: 'smooth'
            });

            lastIndex = targetIndex; // 클릭한 아이템을 현재 중앙에 위치한 아이템으로 설정
        });

        // 마우스 엔터 및 리브 이벤트 추가
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('centered')) {
                gsap.to(this, {
                    color: '#fff',
                    opacity: 0.8,
                    duration: 0.2
                });
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('centered')) {
                gsap.to(this, {
                    color: '#ccc',
                    opacity: 0.5,
                    duration: 0.2
                });
            }
        });

        const p = document.createElement("p");
        const nameSpan = document.createElement("span");
        const stuSpan = document.createElement("span");
        
        nameSpan.textContent = interiors[i].name;
        stuSpan.textContent = interiors[i].stu;
        
        nameSpan.style.fontSize = "20px"; // name 폰트 크기
        stuSpan.style.fontSize = "16px";  // stu 폰트 크기
        
        p.appendChild(nameSpan);
        p.appendChild(stuSpan);
        item.appendChild(p);

        gallery.appendChild(item);

        const angle = i * angleIncrement;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        gsap.set(item, {
            x: x + "px",
            y: y + "px",
            rotation: (angle * 180) / Math.PI,
            opacity: 0.5
        });
    }

    function updatePosition() {
        const scrollAmount = window.scrollY * 0.00035;
        const viewportHeight = window.innerHeight;
        const centerY = viewportHeight / 2;
        const threshold = 50; // 중앙 판단 범위

        let closestItem = null;
        let closestDistance = Infinity;
        let closestIndex = -1;

        const itemAngle = (2 * Math.PI) / numberOfItems;
        const currentPosition = scrollAmount % (2 * Math.PI);
        
        document.querySelectorAll(".item").forEach(function (item, index) {
            const angle = index * angleIncrement + scrollAmount;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            // 위치 업데이트
            gsap.to(item, {
                duration: 0.05,
                x: x + "px",
                y: y + "px",
                rotation: (angle * 180) / Math.PI,
                ease: "none"
            });

            const itemRect = item.getBoundingClientRect();
            const itemCenterY = itemRect.top + (itemRect.height / 2);
            const distanceFromCenter = Math.abs(itemCenterY - centerY);

            if (distanceFromCenter < closestDistance) {
                closestDistance = distanceFromCenter;
                closestItem = item;
                closestIndex = index;
            }
        });

        // 스크롤 스냅 로직 추가
        let scrollTimeout;
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const targetIndex = Math.round(currentPosition / itemAngle);
            const targetScrollPosition = (targetIndex * itemAngle) / 0.00035; // scrollAmount 비율에 맞춰 조정

            window.scrollTo({
                top: targetScrollPosition,
                behavior: 'smooth'
            });
        }, 150);

        // 이전 활성 항목 비활성화 및 새로운 항목 활성화
        if (closestIndex !== lastIndex) {
            // 이전 활성 항목 있었다면 비활성화
            if (lastIndex !== -1) {
                const prevItem = document.querySelectorAll(".item")[lastIndex];
                if (prevItem) {
                    gsap.to(prevItem, {
                        duration: 0.3,
                        color: "#ccc",
                        opacity: 0.5,
                        scale: 1
                    });
                }
            }

            // 새로운 항목이 중앙 근처에 있을 때 활성화 (조건 완화)
            if (closestItem) {
                const itemRect = closestItem.getBoundingClientRect();
                const itemCenterY = itemRect.top + (itemRect.height / 2);
                const viewportCenterY = window.innerHeight / 2;
                const distanceFromCenter = Math.abs(itemCenterY - viewportCenterY);

                if (distanceFromCenter < centerThreshold) {
                    lastIndex = closestIndex;
                    gsap.to(closestItem, {
                        duration: 0.3,
                        color: "#fff",
                        opacity: 1,
                        scale: 1.2
                    });
                    showImageAndText(closestIndex);
                } else {
                    lastIndex = -1;
                }
            }
        }
    }

    // 이미지와 텍스트를 숨기는 함수 추가
    function hideImageAndText() {
        const existingContainer = cursor.querySelector('.img-container');
        
        if (existingContainer) {
            gsap.to(existingContainer, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    existingContainer.remove();
                }
            });
        }
    }

    // 최적화된 이미지 표시 함수
    function showImageAndText(index) {
        if (index === -1) return;
        
        const existingContainer = cursor.querySelector('.img-container');
        
        // 이전 컨테이너가 있다면 먼저 제거
        if (existingContainer) {
            existingContainer.remove();
        }

        // 새 컨테이너 생성
        const imgContainer = document.createElement("div");
        imgContainer.className = 'img-container';
        imgContainer.style.cssText = `
            width: 760px;
            height: 570px;
            display: flex;
            position: relative;
            pointer-events: none;
            opacity: 0;
            object-fit: cover;
        `;

        const img = document.createElement("img");
        img.src = `./assets/img${interiors[index].id}.jpg`; // ID 기반 이미지 경로
        img.style.cssText = `
            width: 760px;
            height: 570px;
            object-fit: cover;
        `;

        const newText = document.createElement("p");
        newText.textContent = `${interiors[index].name} ${interiors[index].stu}`;
        newText.style.cssText = `
            color: #fff;
            position: absolute;
            right: 0%;
            bottom: -10%;
            margin: 0 0 0 20px;
            font-size: 20px;
            white-space: nowrap;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 5px 10px;
            margin-left: 300%;
        `;

        imgContainer.appendChild(img);
        imgContainer.appendChild(newText);
        cursor.appendChild(imgContainer);

        // 페이드 인 애니메이션
        gsap.to(imgContainer, {
            opacity: 1,
            duration: 0.3
        });
    }

    // 스크롤 이벤트 최적화
    let ticking = false;
    document.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updatePosition();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 초기 위치 업데이트
    updatePosition();
});









