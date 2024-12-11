const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// canvas의 크기를 설정
canvas.height = 920;
canvas.width = window.innerWidth;

// canvas의 위치를 우측 하단으로 이동
canvas.style.position = 'absolute';
canvas.style.bottom = '0';
canvas.style.right = '0';

let particleArray = [];
let adjustX = 90;
let adjustY = 85;
const particleAttributes = {
	size: 2,
	color: '#7300006f',
	kerning: 4.2,
	returnLag: 10,
}

const mouse = {
	x: null,
	y: null,
	radius: 100
}

let textCoordinates; // 텍스트 좌표를 저장할 변수

/* 폰트 로드 함수 */
async function loadFont() {
	const font = new FontFace('SF_HambakSnow', 'url(https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/SF_HambakSnow.woff)'); // 폰트 파일 경로를 올바르게 설정하세요
	await font.load();
	document.fonts.add(font);
	drawText(); // 폰트가 로드된 후 텍스트를 그리는 함수 호출
}

/* 텍스트 그리기 함수 */
function drawText() {
	ctx.font = 'italic 87px SF_HambakSnow';
	ctx.fillText('Tomato', 30, 62);
	ctx.fillText('Puree', 90, 130);
	textCoordinates = ctx.getImageData(15, 0, 350, 4000); // 텍스트 좌표를 가져옴
	init(); // 파티클 초기화
}

window.addEventListener('mousemove', function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
});
window.addEventListener("touchmove", function (event) {
	let touch = event.touches[0];
	mouse.x = touch.clientX;
	mouse.y = touch.clientY;
});
window.addEventListener('resize', () => {
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	canvas.style.bottom = '0';
	canvas.style.right = '0';
});

class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = particleAttributes.size;
		this.baseX = this.x;
		this.baseY = this.y;
		this.density = (Math.random() * 30) + 1;
		this.initialSize = this.size;
		this.size = 0;
	}
	draw() {
		ctx.fillStyle = particleAttributes.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
	update() {
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy);
		let forceDirectionX = dx / distance;
		let forceDirectionY = dy / distance;
		let maxDistance = mouse.radius;
		let force = (maxDistance - distance) / maxDistance;
		let directionX = forceDirectionX * force * this.density;
		let directionY = forceDirectionY * force * this.density;

		if (distance < mouse.radius) {
			this.x -= directionX;
			this.y -= directionY;
		} else {
			if (this.x != this.baseX) {
				let dx = this.x - this.baseX;
				this.x -= dx / particleAttributes.returnLag;
			}
			if (this.y != this.baseY) {
				let dy = this.y - this.baseY;
				this.y -= dy / particleAttributes.returnLag;
			}
		}

		if (this.size < this.initialSize) {
			this.size += 0.1;
		}
	}
}

function init() {
	particleArray = [];
	for (let y = 0; y < textCoordinates.height; y++) {
		for (let x = 0; x < textCoordinates.width; x++) {
			if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
				let postionX = x + adjustX;
				let positionY = y + adjustY;
				particleArray.push(new Particle(postionX * particleAttributes.kerning, positionY * particleAttributes.kerning));
			}
		}
	}
}

loadFont(); // 폰트 로드 시작

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < particleArray.length; i++) {
		particleArray[i].draw();
		particleArray[i].update();
	}
	requestAnimationFrame(animate);
}

animate();