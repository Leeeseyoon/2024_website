window.onload = function() {
    // 페이지 최상단에서 시작하도록 설정
    window.scrollTo(0, 0);

/*     // ScrollMagic 설정
    const controller = new ScrollMagic.Controller();
    document.querySelectorAll("section").forEach((section) => {
        new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 0.3,
            duration: "100%"
        })
        .setPin(section)
        .addTo(controller);
    }); */

    // 타이핑 애니메이션 실행
    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line3 = document.getElementById("line3");

    typeText(line1, "2024", 100, () => {
        typeText(line2, "Design", 100, () => {
            typeText(line3, "Portfolio", 100);
        });
    });

    // profile 섹션 관찰 시작
    observeProfileSection();
};




// 타이핑 애니메이션 함수
function typeText(element, text, delay = 100, callback) {
    let charIndex = 0;
    element.style.visibility = "visible";
    element.textContent = "";

    const interval = setInterval(() => {
        element.textContent += text[charIndex];
        charIndex++;

        if (charIndex === text.length) {
            clearInterval(interval);
            if (callback) {
                element.style.borderRight = "none";
                callback();
            } else {
                element.classList.add("blinking-cursor");
            }
        }
    }, delay);
}

// 숫자 증가 애니메이션 함수
function animateCounters() {
    const counters = document.querySelectorAll('.num');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// 모달 열기 및 닫기 함수
function openModal(imageSrc) {
    document.getElementById("modal-image").src = imageSrc;
    document.getElementById("modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// 초기화 및 애니메이션 시작
window.onload = function() {
    // 타이핑 애니메이션 실행
    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line3 = document.getElementById("line3");

    typeText(line1, "2024", 100, () => {
        typeText(line2, "Design", 100, () => {
            typeText(line3, "Portfolio", 100);
        });
    });

    // 숫자 증가 애니메이션 실행
    animateCounters();
};

// 스크롤 및 클릭 이벤트 추가
const sections = document.querySelectorAll('section');
let currentSection = 0;
let isScrolling = false;
let isModalOpen = false; // 모달 열림 상태를 추적

function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
            isScrolling = false;
        }, 1200); // 1.2초 후 스크롤 가능
    }
}

let lastScrollTime = 0;

function handleScroll(event) {
    if (isModalOpen) return; // 모달이 열려 있을 때는 스크롤 무시

    const currentTime = new Date().getTime();
    const scrollThreshold = 50;

    if (currentTime - lastScrollTime < 1200 || isScrolling || Math.abs(event.deltaY) < scrollThreshold) return;

    lastScrollTime = currentTime;

    if (event.deltaY > 0) {
        currentSection++;
        if (currentSection >= sections.length) {
            currentSection = sections.length - 1;
        }
    } else {
        currentSection--;
        if (currentSection < 0) {
            currentSection = 0;
        }
    }

    scrollToSection(currentSection);
}

function handleClick() {
    if (isModalOpen) return; // 모달이 열려 있을 때는 클릭으로 이동 금지

    const currentTime = new Date().getTime();
    if (currentTime - lastScrollTime < 1200 || isScrolling) return;

    lastScrollTime = currentTime;

    currentSection++;
    if (currentSection >= sections.length) {
        currentSection = sections.length - 1;
    }

    scrollToSection(currentSection);
}

// 모달 열기 함수
function openModal(imageSrc, event) {
    if (event) event.preventDefault();
    isModalOpen = true; // 모달 열림 상태로 설정
    document.getElementById("modal-image").src = imageSrc;
    document.getElementById("modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// 모달 닫기 함수
function closeModal(event) {
    if (event) event.preventDefault();
    isModalOpen = false; // 모달 닫힘 상태로 설정
    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// 이벤트 리스너 추가
window.addEventListener('wheel', handleScroll);
window.addEventListener('click', handleClick);


// Contact 버튼 클릭 시 이미지 표시/숨기기 토글 함수
function toggleContactImage() {
    const contactImageContainer = document.getElementById("contactImageContainer");
    if (contactImageContainer.style.display === "block") {
        contactImageContainer.style.display = "none"; // 이미지 숨기기
    } else {
        contactImageContainer.style.display = "block"; // 이미지 표시
    }
}
