   // 버튼 요소 가져오기
   const scrollToTopBtn = document.getElementById("scrollToTopBtn");

   // 스크롤 이벤트 리스너
   window.onscroll = function() {
       if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
           scrollToTopBtn.style.display = "block"; // 버튼 표시
       } else {
           scrollToTopBtn.style.display = "none"; // 버튼 숨김
       }
   };

   // 버튼 클릭 시 맨 위로 스크롤
   scrollToTopBtn.addEventListener("click", function() {
       window.scrollTo({ top: 0, behavior: 'smooth' });
   });
   