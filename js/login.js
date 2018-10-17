// var btn = document.querySelector(".box3");
// var number = document.querySelector(".number");;
// var pwd =document.querySelector(".pwd");;
// console.log(box4,box1Input,box2Input)
// 登录提交信息
// btn.onclick = function(){
//     var url = "http://localhost:8080/proxy/localhost/phpnow/guazi/php/login.php";
//     ajaxPost(url,`phone=${$('.number').val()}&password=${$('.pwd').val()}`)
//     .then(function(res){
//     //    window.open("http://localhost:8080/");
//      window.location.href = "http://localhost:8080/";

//     })
$('.box3').click(function(){
    $.ajax({
            type: 'GET',
            url:"http://localhost:8080/proxy/localhost/phpnow/guazi/php/login.php",
            data:`phone=${$('#phone').val()}&password=${$('#password').val()}`,
        })
        .then(function(res){
            // console.log(res);
            window.location.href = "http://localhost:8080/";
        })
})
    

