$(function() {
    $('.head1-city').on('mouseover',function(){
        $('.head1-city').addClass('active');
        $('.head1-city-hide').css('display','block');
    }).on('mouseout',function(){
        $('.head1-city').removeClass('active');
        $('.head1-city-hide').css('display','none');
    });
    $('.head1-city-hide').on('mouseover',function(){
        $('.head1-city').addClass('active');
        $('.head1-city-hide').css('display','block');
    }).on('mouseout',function(){
        $('.head1-city').removeClass('active');
        $('.head1-city-hide').css('display','none');
    });
})
