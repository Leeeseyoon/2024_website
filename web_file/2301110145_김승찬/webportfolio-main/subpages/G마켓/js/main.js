
$(document).ready(function() {
  $("#owl-example").owlCarousel({
      navigation: true, // Show next and prev buttons
      slideSpeed: 300,
      center: true,
      margin: 36,
      autowidth: false,
      paginationSpeed: 400,
      autoplay: true,
      items: 3,
      itemsDesktop: false,
      itemsDesktopSmall: false,
      itemsTablet: false,
      itemsMobile: false,
      loop: true,
      nav: true,
      dots:true,
      mouseDrag: false,
      navText: ["<img src='images/prev_button.png'>", "<img src='images/next_button.png'>"]
  });
});
$(document).ready(function() {
  $("#smilefresh_carousel").owlCarousel({
      navigation: true, // Show next and prev buttons
      slideSpeed: 300,
      center: true,
      autowidth: false,
      paginationSpeed: 400,
      autoplay: false,
      items: 1,
      itemsDesktop: false,
      itemsDesktopSmall: false,
      itemsTablet: false,
      itemsMobile: false,
      loop: true,
      nav: true,
      mouseDrag: true,
      navText: ["<img src='images/prev_button.png'>", "<img src='images/next_button.png'>"]
  });
});
$(document).ready(function() {
  $("#smiledelivery_carousel").owlCarousel({
      navigation: true, // Show next and prev buttons
      slideSpeed: 300,
      center: true,
      autowidth: false,
      paginationSpeed: 400,
      autoplay: false,
      items: 1,
      itemsDesktop: false,
      itemsDesktopSmall: false,
      itemsTablet: false,
      itemsMobile: false,
      loop: true,
      nav: true,
      mouseDrag: true,
      navText: ["<img src='images/prev_button.png'>", "<img src='images/next_button.png'>"]
  });
});
var swiper = new Swiper('#now-container', {
direction: 'vertical',
navigation: {
  nextEl: '.nextbutton',
  prevEl: '.prevbutton',
},
loop: true,
slidesPerView:5,
});
var swiper = new Swiper('#today-container', {
direction: 'vertical',
navigation: {
  nextEl: '.nextbutton2',
  prevEl: '.prevbutton2',
},
loop: true,
slidesPerView:5,
});
function openTab1(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent1");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks1");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
function openTab2(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent2");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks2");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
function openTab3(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent3");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks3");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
i=1;
function changeImage(el) {
    el.click=++i;
    el.src = ((el.click)%2 == 0) ? "images/heart.png" : "images/empty_heart.png";
}
document.getElementById("defaultOpen").click();
document.getElementById("defaultOpen2").click();