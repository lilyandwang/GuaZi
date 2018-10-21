$(function(){
    $('.box3').click(function(){
        $.ajax({
                type: 'GET',
                url:"http://localhost:8080/proxy/localhost/phpnow/guazi/php/login.php",
                data:`phone=${$('#phone').val()}&password=${$('#password').val()}`
            })
            .then(function(res){
                console.log(res);
                window.location.href = "http://localhost:8080/";
                // window.open("http://localhost:8080/");
            })
        return false;
    })
})
