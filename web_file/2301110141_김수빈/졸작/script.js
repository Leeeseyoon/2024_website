$(document).ready(function() {
    // 디버깅을 위한 콘솔 로그
    console.log('Script loaded');
    
    // 화면 흔들림 효과 추가 (2.5초 후 실행)
    //setTimeout(() => $('.bg-inner').addClass('screen-shake'), 1000);//
    
    // 마우스 움직임 효과 함수
    function handleMouseMove(event) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        const moveX = ((mouseX - width / 2) / width) * -15;
        const moveY = ((mouseY - height / 2) / height) * -5;
        
        $('.pcup1-wrapper').css({
            'transform': `translate(${moveX}px, ${moveY}px)`,
            'transition': 'transform 0.1s ease-out'
        });
    }
    
    // 마우스 이벤트 리스너 추가
    $(document).on('mousemove', handleMouseMove);
    
    // 모바일 터치 이벤트도 추가
    $(document).on('touchmove', function(e) {
        handleMouseMove(e.touches[0]);
    });

    // $(document).ready 안에 추가
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('.name-image').addClass('show');
                // 약간의 딜레이를 두고 순차적으로 실행
                setTimeout(() => $('.intro-image').addClass('show'), 200);
                setTimeout(() => $('.tools-image').addClass('show'), 400);
                setTimeout(() => $('.education-image').addClass('show'), 600);
            } else {
                $('.name-image, .intro-image, .tools-image, .education-image').removeClass('show');
            }
        });
    }, { threshold: 0.2 });

    // works 섹션 관찰 시작
    observer.observe(document.querySelector('#works'));


    // jQuery Easing 플러그인 추가 (없는 경우)
    $.easing.easeInOutQuint = function(x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    };

    // 페이지 로드 후 별 애니메이션 시작
    setTimeout(() => {
        $('.star').each(function(index) {
            const star = $(this);
            star.html('★');
            
            // 초기 위치 설정
            star.css({
                'left': '50%',
                'top': '50%',
                'transform': 'translate(-50%, -50%)'
            });
            
            // 각 별의 최종 위치
            const finalPositions = [
                { left: '30%', top: '30%' },
                { left: '70%', top: '35%' },
                { left: '25%', top: '65%' },
                { left: '75%', top: '60%' }
            ];
            
            setTimeout(() => {
                star.css({
                    'transition': 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    'opacity': '1',
                    'transform': `translate(-50%, -50%) rotate(${index % 2 ? 360 : -360}deg)`,
                    ...finalPositions[index]
                }).addClass('twinkling');
            }, index * 200);
        });
    }, 500);

    // 화면 크기 확인
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    console.log('Screen size:', screenWidth, 'x', screenHeight);

    // 오디오 요소 가져오기
    const audio = document.getElementById('background-music');

    // 음악 버튼 클릭 이벤트 리스너 추가
    $('.nav-btn.music').on('click', function() {
        if (audio.paused) {
            audio.play();  // 음악 재생
            $(this).addClass('active');  // 글로우 효과 추가
        } else {
            audio.pause();  // 음악 일시 정지
            $(this).removeClass('active');  // 글로우 효과 제거
        }
    });
        // 네비게이션 버튼 클릭 시 스크롤 이동
        $('.nav-btn').on('click', function() {
            const target = $(this).data('target');
            if (target) {
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 800); // 800ms 동안 부드럽게 스크롤
            }
        });
    
        // jQuery Easing 플러그인 추가 (없는 경우)
        $.easing.easeInOutQuint = function(x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        };

    // 모달 관련 코드 추가
    $(document).ready(function() {
        const imageData = {
            illust: [
                {
                    src: './images/일러스트-버드리.jpg',
                    title: '버드리 리디자인',
                    desc: '유명 가수 버드리의 캐릭터를 리디자인 했습니다. 버드리의 특징인 점과 이목구비를 살려 재밌는 느낌으로 디자인했습니다.',
                    additionalInfo: {
                        period: '2024.09.08 - 2024.09.19',
                        tools: '포토샵'
                    }
                },
                {
                    src: './images/일러스트-낮과밤.jpg',
                    title: '낮과 밤',
                    desc: '일러스트레이션 과제로 작업한 낮과 밤 일러스트입니다. 기하학적 표현과 다양한 소재를 이용하여 몽환적인 느낌을 표현했습니다.',
                    additionalInfo: {
                        period: '2024.10.06 - 2024.10.18',
                        tools: '포토샵'
                    }
                },
                {
                    src: './images/일러스트-초록.jpg',
                    title: '여름의 푸름',
                    desc: '제가 생각한 여름을 담아보았습니다. 물의 청량함과 잉어를 장식하여 푸르른 느낌을 표현했습니다.',
                    additionalInfo: {
                        period: '2024.10.28 - 2024.11.06',
                        tools: '포토샵'
                    }
                },
                {
                    src: './images/일러스트-파워퍼프걸.jpg',
                    title: '파워종돌이',
                    desc: '좋아하는 캐릭터인 파워퍼프걸의 블로섬과 종돌이를 그렸습니다. 종돌이를 왜 넣었냐구요? 귀엽잖아요!',
                    additionalInfo: {
                        period: '2024.11.13 - 2024.11.14',
                        tools: '포토샵'
                    }
                }
            ],
            poster: [
                {
                    src: './images/포스터-폴리더록.jpg',
                    title: '폴리더록',
                    desc: '대학교 밴드부 활동을 위해 만든 포스터입니다. 일본 만화 봇치더록의 캐릭터를 이용하여 더욱 재밌게 만들어보았습니다.',
                    additionalInfo: {
                        period: '2023.03.16 - 2023.03.17',
                        tools: '포토샵'
                    }
                },
                {
                    src: './images/포스터-폴리의 아이.png',
                    title: '폴리의 아이',
                    desc: '대학교 밴드부 활동을 위해 만든 두번째 포스터입니다. 일본 만화 최애의 아이의 캐릭터를 사용하여 실제 만화책 느낌이 나도록 제작했습니다.',
                    additionalInfo: {
                        period: '2024.03.02 - 2024.03.04',
                        tools: '포토샵'
                    }
                },
                {
                    src: './images/포스터-경찰청.jpg',
                    title: '청소년 온라인 도박 예방 포스터',
                    desc: '청주청원경찰서와 함께한 청소년 도박 예방 포스터입니다.',
                    additionalInfo: {
                        period: '2024.09.28 - 2024.10.01',
                        tools: '포토샵'
                    }
                }
                // 추가 이미지와 설명...
            ],
            website: [
                {
                    src: './images/발로란트.png',
                    title: '발로란트 웹사이트 리디자인',
                    desc: `
                    <p>라이엇 게임즈의 발로란트 웹사이트를 리디자인 했습니다. 깔끔한 레이아웃과 화려한 메인이 포인트입니다.</p>
                    <p><span style="color: red;">※사이트 접속 시 보안 경고 문자가 뜨니 세부 정보 클릭 후 안전하지 않은 사이트 방문을 클릭해주세요.</span></p>
                `,
                    url: 'https://ksvk224.github.io/vvv/',
                    additionalInfo: {
                        period: '2024.10.20 - 2023.11.19',
                        tools: '포토샵, 비주얼 스튜디오 코드'
                    }
                }
            ],
            detail: [
                {
                    src: './images/상세페이지-메리몽드.png',
                    title: '메리몽드 쿠션 상세페이지 리디자인',
                    desc: '메리몽드의 해피 유어데이 쿠션 상세페이지를 리디자인 하였습니다. 사랑스러운 이미지를 강조했습니다.',
                    additionalInfo: {
                        period: '2023.10.28 - 2023.11.6',
                        tools: '포토샵'
                    }
                },
            ],
            illustration: [  
                {
                    title: '동아리 활동',
                    src: './images/사진-공연.jpg',
                    desc: '2023.05.31, 동아리 첫 공연.'
                },
                {
                    title: '동아리 활동',
                    src: './images/사진-동아리.jpg',
                    desc: '2023.09.20, 밴드 연습 사진.'
                },
                {
                    title: '버스킹',
                    src: './images/사진-가야금.jpg',
                    desc: '2024.04.09, 첫 개인 버스킹.'
                },
                {
                    title: '버스킹',
                    src: './images/사진-버스킹.jpg',
                    desc: '2024.05.12, 부원과 함께한 두번째 버스킹.'
                }
                
            ]
            
        };

        let currentImageIndex = 0;
        let currentCategory = '';
        let isZoomed = false;

        // 이미지 클릭 시 해당 카테고리의 모달 열기
        $('.about-img').click(function() {
            currentCategory = $(this).data('category');
            currentImageIndex = 0;
            $(`#${currentCategory}-modal`).show();
            showImage(currentCategory, currentImageIndex);
        });

        // 모달 닫기
        $('.close-btn').click(function() {
            $('.modal-container').hide();
            resetZoom();
        });

        // 배경 클릭 시 모달 닫기
        $('.modal-container').click(function(e) {
            if ($(e.target).hasClass('modal-container')) {
                $('.modal-container').hide();
                resetZoom();
            }
        });

        // 이전 이미지
        $('.prev').click(function() {
            const categoryImages = imageData[currentCategory];
            currentImageIndex = (currentImageIndex - 1 + categoryImages.length) % categoryImages.length;
            showImage(currentCategory, currentImageIndex);
            resetZoom();
        });

        // 다음 이미지
        $('.next').click(function() {
            const categoryImages = imageData[currentCategory];
            currentImageIndex = (currentImageIndex + 1) % categoryImages.length;
            showImage(currentCategory, currentImageIndex);
            resetZoom();
        });

        // 이미지 줌 토글
        $('.modal-image').click(function(e) {
            e.stopPropagation();
            if (!isZoomed) {
                $(this).addClass('zoomed');
                $(this).css({
                    'transform': 'scale(2)',
                    'cursor': 'zoom-out'
                });
            } else {
                resetZoom();
            }
            isZoomed = !isZoomed;
        });

        // 이미지 표시 함수 수정
        function showImage(category, index) {
            const $modalImage = $(`#${category}-modal .modal-image`);
            const $modalDesc = $(`#${category}-modal .modal-description`);
            const imageInfo = imageData[category][index];
            
            $modalImage.attr('src', imageInfo.src);
            
            // 설명 영역 HTML
            $modalDesc.html(`
                <h2 class="modal-title">${imageInfo.title || category.toUpperCase()}</h2>
                <div class="modal-desc-text">${imageInfo.desc}</div>
                ${category === 'website' && imageInfo.url ? `
                    <div class="modal-link">
                        <a href="${imageInfo.url}" target="_blank">발로란트 웹사이트 방문하기</a>
                    </div>
                ` : ''}
                ${imageInfo.additionalInfo ? `
                    <div class="modal-info">
                        <p>제작 기간: ${imageInfo.additionalInfo.period || '-'}</p>
                        <p>사용 툴: ${imageInfo.additionalInfo.tools || '-'}</p>
                    </div>
                ` : ''}
            `);
        }

        // 줌 리셋 함수
        function resetZoom() {
            $('.modal-image').removeClass('zoomed');
            $('.modal-image').css({
                'transform': 'none',
                'cursor': 'zoom-in'
            });
            isZoomed = false;
        }

        // 키보드 이벤트
        $(document).keydown(function(e) {
            if ($('.modal-container').is(':visible')) {
                switch(e.keyCode) {
                    case 37: // 왼쪽 화살표
                        $('.prev:visible').click();
                        break;
                    case 39: // 오른쪽 화살표
                        $('.next:visible').click();
                        break;
                    case 27: // ESC
                        $('.close-btn').click();
                        break;
                }
            }
        });
    });

    $(window).scroll(function() {
        let scrollPosition = $(window).scrollTop();
        let windowHeight = $(window).height();
        
        // 모든 about-img에 대해 체크
        $('.about-img').each(function() {
            let elementPosition = $(this).offset().top;
            if (scrollPosition > elementPosition - windowHeight + 100) {
                $(this).addClass('animate');
            } else {
                $(this).removeClass('animate'); // 스크롤 올릴 때 다시 사라짐
            }
        });
    });

    // 커스텀 커서 추가
    $('body').append('<img src="./images/다운로드.png" class="custom-cursor">');
    
    // 커서 움직임
    $(document).mousemove(function(e) {
        $('.custom-cursor').css({
            left: e.clientX,
            top: e.clientY
        });
    });
    
    // 링크나 버튼 위에서 커서 변경
    $('a, button, .about-img, .nav-btn').hover(
        function() {
            $('.custom-cursor').addClass('hover');
        },
        function() {
            $('.custom-cursor').removeClass('hover');
        }
    );

    $(document).ready(function() {
        $(window).scroll(function() {
            const scrollPosition = $(window).scrollTop();
            const windowHeight = $(window).height();
            const elementPosition = $('.popup-image').offset().top;

            if (scrollPosition > elementPosition - windowHeight + 100) {
                $('.popup-image').addClass('show');
            } else {
                $('.popup-image').removeClass('show');
            }
        });
    });
    $(document).ready(function() {
        $(window).scroll(function() {
            const scrollPosition = $(window).scrollTop();
            const windowHeight = $(window).height();
            const elementPosition = $('.icon-image').offset().top;
    
            if (scrollPosition > elementPosition - windowHeight + 100) {
                $('.icon-image').addClass('show');
                
                // 페이드인 후 0.5초 뒤에 둥둥 뜨는 효과 추가
                setTimeout(function() {
                    $('.icon-image').addClass('float');
                }, 500);
            } else {
                $('.icon-image').removeClass('show float');
            }
        });
    });
    $(document).ready(function() {
        // 스크롤 애니메이션과 모달 기능을 하나의 블록으로 통합
        let currentCategory;  // 변수 선언 추가
        let currentImageIndex;  // 변수 선언 추가
    
        // 스크롤 애니메이션
        $(window).scroll(function() {
            const scrollPosition = $(window).scrollTop();
            const windowHeight = $(window).height();
            const elementPosition = $('.illustration-area img').offset().top;
    
            if (scrollPosition > elementPosition - windowHeight + 100) {
                $('.illustration-area img').addClass('show');
                setTimeout(function() {
                    $('.illustration-area img').addClass('float');
                }, 1000);
            } else {
                $('.illustration-area img').removeClass('show float');
            }
        });
    
        // 모달 기능
        $('.illustration-area img').on('click', function(e) {
            e.preventDefault();
            const category = $(this).data('category');
            console.log('Image clicked, category:', category); // 디버깅용
            
            if (category) {
                currentCategory = category;
                currentImageIndex = 0;
                $(`#${category}-modal`).show();
                showImage(category, currentImageIndex);
            }
        });
    });
emailjs.init("NhVEnSSJ1KcX4y9xi");

// 폼 제출 이벤트 처리
document.getElementById('email-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 전송 중임을 표시
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = '전송중...';
    submitBtn.disabled = true;

    // EmailJS로 메일 전송
    emailjs.sendForm('service_yotuip8', 'template_eqm7w9j', this)
        .then(function() {
            alert('메일이 성공적으로 전송되었습니다!');
            document.getElementById('email-form').reset();
            submitBtn.textContent = '보내기';
            submitBtn.disabled = false;
        }, function(error) {
            alert('메일 전송에 실패했습니다. 다시 시도해주세요.');
            console.error('EmailJS error:', error);
            submitBtn.textContent = '보내기';
            submitBtn.disabled = false;
        });
});





}); // $(document).ready() 닫는 괄호

