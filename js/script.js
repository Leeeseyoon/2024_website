import { interiors } from "./data.js";

document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.querySelector(".cursor");
    const gallery = document.querySelector(".gallery");
    const numberOfItems = interiors.length; 
    const radius = 1100;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const angleIncrement = (2 * Math.PI) / numberOfItems;
    const centerThreshold = 40;

    let lastIndex = -1; // 마지막으로 중앙에 있었던 항목 인덱스

    // Create gallery items
    for (let i = 0; i < numberOfItems; i++) {
        const item = document.createElement("div");
        item.className = "item";
        const p = document.createElement("p");
        const stuSpan = document.createElement("span");

        p.textContent = interiors[i].name;
        stuSpan.textContent = interiors[i].stu;
        stuSpan.style.fontSize = "20px";
        stuSpan.style.color = "#fff";
        stuSpan.style.fontWeight = "300";
        stuSpan.style.marginLeft = "10px";

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

        p.style.fontSize = "30px";
    }

    // Update position and central item highlight
    function updatePosition() {
        const scrollAmount = window.scrollY * 0.00035;

        document.querySelectorAll(".item").forEach(function (item, index) {
            const angle = index * angleIncrement + scrollAmount;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            gsap.to(item, {
                duration: 0.05,
                x: x + "px",
                y: y + "px",
                rotation: (angle * 180) / Math.PI,
                ease: "elastic.out(1, 0.3)",
            });

            // Check if item is near center and highlight it
            const itemRect = item.getBoundingClientRect();
            const isCentered = Math.abs((itemRect.top + itemRect.height / 2) - centerY) < centerThreshold;

            if (isCentered) {
                if (lastIndex !== index) {
                    lastIndex = index; // 현재 인덱스를 마지막 인덱스로 업데이트

                    // Clear previous content if exists
                    cursor.innerHTML = '';

                    // Display image and text in the cursor
                    const imgContainer = document.createElement("div");
                    imgContainer.style.display = "flex";
                    imgContainer.style.alignItems = "flex-end";
                    imgContainer.style.pointerEvents = "none";
                    imgContainer.style.marginTop = "0px";
                    imgContainer.style.marginLeft = "940px";
                    imgContainer.style.width = "670px";

                    const imgSrc = `./assets/img${index + 1}.jpg`;
                    const img = document.createElement("img");
                    img.src = imgSrc;
                    img.style.width = "670px";
                    img.style.height = "480px";
                    img.style.marginTop = "230px";
                    img.style.objectFit = "cover"; 
                    img.style.marginLeft = "0px";

                    // 텍스트 위치 조정
                    const newText = document.createElement("p");
                    newText.textContent = `${interiors[index].name} | 이름`;
                    newText.style.width = "400px";
                    newText.style.fontSize = "25px";
                    newText.style.color = "#fff";
                    newText.style.position = "absolute"; // 절대 위치 설정
                    newText.style.bottom = "-90%"; // 이미지 하단에 위치
                    newText.style.left = "445%"; // 이미지의 오른쪽 끝에 위치

                    imgContainer.appendChild(img);
                    imgContainer.appendChild(newText);
                    cursor.appendChild(imgContainer);
                }

                // Highlight the centered item
                gsap.to(item, {
                    color: "#fff",
                    opacity: 1,
                    duration: 0.3,
                });
                gsap.to(item.querySelector('p'), {
                    fontSize: "40px",
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                gsap.to(item, {
                    color: "#ccc",
                    opacity: 0.5,
                    duration: 0.3,
                });
                gsap.to(item.querySelector('p'), {
                    fontSize: "30px",
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    }

    updatePosition();
    document.addEventListener("scroll", updatePosition);
});










