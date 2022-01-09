$(function () {
    var rollHeader = 100;
    $(window).scroll(function () {
      var scroll = getCurrentScroll();
      if (scroll >= rollHeader) {
        $('nav').addClass('roll');
      }
      else {
        $('nav').removeClass('roll');
      }
    });
    function getCurrentScroll() {
      return window.pageYOffset || document.documentElement.scrollTop;
    }
});