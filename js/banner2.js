$(function() {
	$('.top-buy').on('click', function() {
        $(".wrap2-sellCar").css('display','none');
        $(".wrap2-buyCar").css('display','block');
        $(".top-buy").addClass('active');    
    })
    $('.top-sell').on('click', function() {
        $(".wrap2-sellCar").css('display','block');
        $(".wrap2-buyCar").css('display','none');
        $(".top-sell").addClass('active')
	})
})