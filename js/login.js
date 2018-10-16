var btn = document.querySelector(".box3");
var number = document.querySelector(".number");;
var pwd =document.querySelector(".pwd");;
// console.log(box4,box1Input,box2Input)
//登录提交信息
btn.onclick = function(){
    var url = "http://localhost/phpnow/jd/php/login.php";
    ajaxPost(url,`username=${number.value}&password=${pwd.value}`)
    .then(function(res){
       window.open("http://localhost:8080/");
    })
}