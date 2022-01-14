// 메뉴 버튼 눌림 여부
var menuOn = false;

// 반응형 화면 크기
var windowWidth = window.matchMedia("screen and (max-width: 1017px)");

// 프로젝트 정보 배열
var arrProjects = new Array();

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
      $('nav').addClass('menuOn');
    } else {
      //$('nav ul').css({"display":"none"});
      $('nav ul').slideUp(500, function () {
        $('nav').removeClass('menuOn');
        //$('nav ul li').css({ "margin": "0 50px" });

        if (getCurrentScroll() >= 100) {
          $('nav').addClass('roll');
            
        } else {
          $('nav').removeClass('roll');
        }
      });

    }
  }
}


///////////////////////////////////////////////////////
// 프로젝트 json load
$.ajax({
  url: 'json/projects.json',
  success: function(json) {

    $.each(json, function(index, value){
      var html = '';
      html += '<h2>' + value.name + '</h2>';

      html += '<div class="modal-skill">';
      value.skill.forEach(function(i) {
        html += '<span>' + i + '</span>';
      })
      html += '</div>'; // modal-skill

      //video
      html += '<video controls="controls" src="' + value.video + '"></video>';
      // explain
      html += '<p><br>' + value.explain + '</p><br><br>';
      
      //github
      //html += '<a href="' + value.github + '">깃허브</a>';
      
      arrProjects.push(html);
      
    });

  },
  error: function(xhr) {
    console.log(xhr.status + ' ' + xhr.statusText);
  }

})



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
  // nav 메뉴 클릭시 스크롤 이동
  $('nav li').eq(0).on('click', function() {
    window.scroll({top: 0, behavior: 'smooth'});
  });

  $('nav li').eq(1).on('click', function() {
    document.getElementById('introduce').scrollIntoView({behavior: "smooth",  block: "center"});
  });

  $('nav li').eq(2).on('click', function() {
    document.getElementById('skills').scrollIntoView({behavior: "smooth", block: "center"});
  });

  $('nav li').eq(3).on('click', function() {
    document.getElementById('projects').scrollIntoView({behavior: "smooth", block: "center"});
  });


  ///////////////////////////////////////////////////////
  //nav menu button
  $('body').on('click', function(e) {
    if($(e.target).hasClass('menu')) {
      menuOn = !menuOn;
      menuOnClick();
      return false;
    }
    menuOn = false;
    menuOnClick();
  });
  
  

  ///////////////////////////////////////////////////////
  // scroll down 버튼
  $('#top button').on('click', function() {
    document.getElementById('introduce').scrollIntoView({behavior: "smooth", block: "center"});
  });

  

  ///////////////////////////////////////////////////////
  // project 상세 모달
  //////////////////////////////////////////////////////
  // 모달 보이기
  $('.project').on('click', function() {
    $('body').addClass('modalOn');
    var thisIndex = $(this).index();
    $('.modal-info').html(arrProjects[thisIndex]);

    // function
    $('#modal').show(300);

    // 슬라이드 준비
    $('.modal-img img').hide();
    $('.modal-img img').eq(0).show();
  });

  // 모달 감추기
  $('.x').on('click', function() {
    $('body').removeClass('modalOn');
    $('#modal').hide(300);
  });

});