$(function(){
  var TIMER;//定义全局变量
  $(window).scroll( function() {
      clearTimeout(TIMER);//必须要有这句
      if( $(document).scrollTop() > 500 ){
          TIMER = setTimeout(function(){
              $(".totop").css('display','block');console.log($(document).scrollTop());
          },100);
      }else{
          TIMER = setTimeout(function(){
              $(".totop").css('display','none');
          },100);
      }
  });
});