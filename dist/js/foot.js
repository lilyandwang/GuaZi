$(document).ready(function(){
    $(".open").click(function(){
        $(this).addClass('active')
        $(this).parent().next().toggle();
    });
});