const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// 이미지 배열 수정
const imageUrls = [
    'images/works/김민경A.png',
    'images/works/김민경B.png',
    'images/works/김수아.jpg',
    'images/works/김승찬.jpg',
    'images/works/김준희.png',
    'images/works/김태호.png',
    'images/works/장천수.png',
    'images/works/류시은.png',
    'images/works/박가람.png',
    'images/works/심재정.png',
    'images/works/양성우.jpg',
    'images/works/우수지.jpg',
    'images/works/원세연.png',
    'images/works/유지수.jpg',
    'images/works/이세윤1.jpg',
    'images/works/임현준.png',
    'images/works/황세희.png',
    'images/works/윤비.png',
    'images/works/임율.jpg',
    'images/works/최훈석.png'
];

// 이미지 배열에서 랜덤하게 20개만 선택하는 함수
function getRandomImages(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// 이미지 객체 배열 생성 (20개만 선택)
const selectedImageUrls = getRandomImages(imageUrls, 20);
const images = selectedImageUrls.map(url => {
    const img = new Image();
    img.src = url;
    return img;
});

class Particle {
    constructor(x, y) {
        this.targetX = x;
        this.targetY = y;
        this.image = images[Math.floor(Math.random() * images.length)];
        this.cornerRadius = Math.random() * 12 + 4;
        this.size = Math.random() * 70 + 40;
        this.maxAlpha = Math.random() * 0.25 + 0.5;
        this.alpha = this.maxAlpha;
        this.isReversed = false;
        this.originalSpeed = Math.random() * 0.6 + 0.4;
        this.reverseSpeed = Math.random() * 0.4 + 0.3;
        this.active = false;
        
        this.setOutsidePosition();
        this.speed = this.originalSpeed;
        
        this.delay = Math.random() * 2000;
        this.setInitialDelay();
    }

    setOutsidePosition() {
        const side = Math.floor(Math.random() * 4);
        switch(side) {
            case 0:
                this.x = Math.random() * canvas.width;
                this.y = -20;
                break;
            case 1:
                this.x = canvas.width + 20;
                this.y = Math.random() * canvas.height;
                break;
            case 2:
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + 20;
                break;
            case 3:
                this.x = -20;
                this.y = Math.random() * canvas.height;
                break;
        }
    }

    setInitialDelay() {
        setTimeout(() => {
            this.active = true;
        }, this.delay);
    }

    reset() {
        if (!this.isReversed) {
            this.setOutsidePosition();
        } else {
            this.x = this.targetX;
            this.y = this.targetY;
            this.active = false;
            
            const side = Math.floor(Math.random() * 4);
            switch(side) {
                case 0:
                    this.reverseTargetX = Math.random() * canvas.width;
                    this.reverseTargetY = -20;
                    break;
                case 1:
                    this.reverseTargetX = canvas.width + 20;
                    this.reverseTargetY = Math.random() * canvas.height;
                    break;
                case 2:
                    this.reverseTargetX = Math.random() * canvas.width;
                    this.reverseTargetY = canvas.height + 20;
                    break;
                case 3:
                    this.reverseTargetX = -20;
                    this.reverseTargetY = Math.random() * canvas.height;
                    break;
            }

            this.delay = Math.random() * 2000;
            this.setInitialDelay();
        }
        
        this.speed = this.isReversed ? this.reverseSpeed : this.originalSpeed;
        this.alpha = this.maxAlpha;
    }

    update() {
        if (!this.active) return;

        let dx, dy;
        if (!this.isReversed) {
            dx = this.targetX - this.x;
            dy = this.targetY - this.y;
        } else {
            dx = this.reverseTargetX - this.x;
            dy = this.reverseTargetY - this.y;
        }
        
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speedFactor = Math.max(0.004, Math.min(0.025, distance / 1000));
        
        this.x += dx * this.speed * speedFactor;
        this.y += dy * this.speed * speedFactor;

        const edgeDistance = Math.min(
            this.x,
            this.y,
            canvas.width - this.x,
            canvas.height - this.y
        );

        if (!this.isReversed && distance < 150) {
            this.alpha -= 0.03;
        } else if (this.isReversed && edgeDistance < 100) {
            this.alpha -= 0.06;
        }

        if (this.alpha <= 0) {
            this.reset();
            this.alpha = this.maxAlpha;
        }
    }

    draw() {
        if (!this.active) return;
        
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        ctx.beginPath();
        ctx.moveTo(this.x - this.size/2 + this.cornerRadius, this.y - this.size/2);
        ctx.lineTo(this.x + this.size/2 - this.cornerRadius, this.y - this.size/2);
        ctx.arcTo(this.x + this.size/2, this.y - this.size/2, this.x + this.size/2, this.y - this.size/2 + this.cornerRadius, this.cornerRadius);
        ctx.lineTo(this.x + this.size/2, this.y + this.size/2 - this.cornerRadius);
        ctx.arcTo(this.x + this.size/2, this.y + this.size/2, this.x + this.size/2 - this.cornerRadius, this.y + this.size/2, this.cornerRadius);
        ctx.lineTo(this.x - this.size/2 + this.cornerRadius, this.y + this.size/2);
        ctx.arcTo(this.x - this.size/2, this.y + this.size/2, this.x - this.size/2, this.y + this.size/2 - this.cornerRadius, this.cornerRadius);
        ctx.lineTo(this.x - this.size/2, this.y - this.size/2 + this.cornerRadius);
        ctx.arcTo(this.x - this.size/2, this.y - this.size/2, this.x - this.size/2 + this.cornerRadius, this.y - this.size/2, this.cornerRadius);
        ctx.closePath();
        ctx.clip();
        
        ctx.drawImage(
            this.image,
            this.x - this.size/2,
            this.y - this.size/2,
            this.size,
            this.size
        );
        
        ctx.restore();
    }
}

const particles = [];
const centerX = (canvas.width / 2) + (canvas.width * 0.2);
const centerY = canvas.height / 2;

function init() {
    for(let i = 0; i < 80; i++) {
        particles.push(new Particle(centerX, centerY));
    }
}

let animationFrameId = null;  // requestAnimationFrame의 ID를 저장할 변수 추가

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    animationFrameId = requestAnimationFrame(animate);
}

// 페이지 가시성 변경 처리
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 페이지가 숨겨질 때 애니메이션 중지
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    } else {
        // 페이지가 다시 보일 때 애니메이션 재시작
        if (!animationFrameId) {
            animate();
        }
    }
});

// 이미지 로드 후 애니메이션 시작 부분 수정
Promise.all(images.map(img => {
    return new Promise((resolve) => {
        if (img.complete) {
            resolve();
        } else {
            img.onload = resolve;
        }
    });
})).then(() => {
    init();
    animate();
});

// 클릭 이벤트 처리
canvas.addEventListener('click', () => {
    particles.forEach(particle => {
        particle.isReversed = !particle.isReversed;
        particle.reset();
    });
});
