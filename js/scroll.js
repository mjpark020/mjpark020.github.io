// 메뉴 버튼 눌림 여부
var menuOn = false;

// 반응형 화면 크기
var windowWidth = window.matchMedia("screen and (max-width: 1017px)");

// 현재 스크롤 위치
function getCurrentScroll() {
  return window.pageYOffset || document.documentElement.scrollTop;
}


// 메뉴 클릭 함수
function menuOnClick() {
  if(windowWidth.matches) {
    if (menuOn) {
      //$('nav ul').css({"display":"block"});
      $('nav ul').slideDown(500);
      $('nav').css({
        "height": "50px",
        "background-color": "#333"
      });
      $('nav ul li').css({ "margin": "0" });
    } else {
      //$('nav ul').css({"display":"none"});
      $('nav ul').slideUp(500, function () {
        $('nav ul li').css({ "margin": "0 50px" });

        if (getCurrentScroll() >= 100) {
          $('nav').css({
            "height": "50px",
            "background-color": "#333"
          });
        } else {
          $('nav').css({
            "height": "100px",
            "background-color": "transparent"
          });
        }
      });

    }
  }
}

// window.onload
$(function () {
  ///////////////////////////////////////////////////////
  // 상단바 조정
  var rollHeader = 100;
  $(window).scroll(function () {
    menuOn = false;
    menuOnClick();
    var scroll = getCurrentScroll();
    if (scroll >= rollHeader) {
      $('nav').addClass('roll');
    }
    else {
      $('nav').removeClass('roll');
    }
  });
  


  ///////////////////////////////////////////////////////
  // nav 메뉴 이동
  $('nav li').eq(0).on('click', function() {
    window.scroll({top: 0, behavior: 'smooth'});
  });

  $('nav li').eq(1).on('click', function() {
    document.getElementById('introduce').scrollIntoView({behavior: "smooth"});
  });

  $('nav li').eq(2).on('click', function() {
    document.getElementById('skills').scrollIntoView({behavior: "smooth"});
  });

  $('nav li').eq(3).on('click', function() {
    document.getElementById('projects').scrollIntoView({behavior: "smooth"});
  });


  ///////////////////////////////////////////////////////
  //nav menu button
  $('body').on('click', function(e) {
    if($(e.target).hasClass('menu')) {
      menuOn = !menuOn;
      console.log('menuOn: '+menuOn);
      menuOnClick();
      return false;
    }
    menuOn = false;
    menuOnClick();
    console.log('.menu를 제외한 body');
  });
  
  

  ///////////////////////////////////////////////////////
  // scroll down 버튼
  $('#top button').on('click', function() {
    document.getElementById('introduce').scrollIntoView({behavior: "smooth"});
  });

});