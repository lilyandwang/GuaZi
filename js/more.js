$(function() {
    $('.wrap3-top-nav').children('li').on('click',function(e) {
        $(this).css('border-bottom','2px solid #22ac38');
        $(this).siblings().css('border-bottom','')
        var li_data = $(this).attr('data-id');
       
        $(".tab").css('display','none');
        
        $('.tab[data-id="' + li_data + '"]').css('display','block');
	})
})