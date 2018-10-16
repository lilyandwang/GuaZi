$(function() {
    $('.wrap3-top-nav').children('li').on('click',function(e) {
        $(this).find('a').addClass('active1');
        $(this).siblings().find('a').removeClass('active1');
        var li_data = $(this).attr('data-id');
       
        $(".tab").css('display','none');
        
        $('.tab[data-id="' + li_data + '"]').css('display','block');
	})
})