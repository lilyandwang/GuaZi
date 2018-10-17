$(function() {
    $('.head1-nav1>a').click(function(){
        $(this).toggleClass('active3');
        $(this).siblings().removeClass('active3');
    })
})