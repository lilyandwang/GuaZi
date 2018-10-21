
$('input').eq(0).focus(function(){
	if($(this).val().length==0){
		$(this).parent().next("div").text("验证完后，你可以使用该手机登录和找回密码");
	}
})
$('input').eq(1).focus(function(){
	if($(this).val().length==0){
		$(this).parent().next("div").text("建议使用数字，字母和符号两种以上的组合，6-20个字符");
	}
})
$('input').eq(2).focus(function(){
	if($(this).val().length==0){
		$(this).parent().next("div").text("请再次输入密码");
	}
})

$('input').eq(3).focus(function(){	
	if($(this).val().length==0){
		$(this).parent().next().next("div").text("看不清？点击图片更换验证码");
	}
})

$('input').eq(1).blur(function(){
	if($(this).val().length==0){
		$(this).parent().next("div").text("");
		$(this).parent().next("div").css("color",'#ccc');
	}else if($(this).val().length>0 && $(this).val().length<6){
		$(this).parent().next("div").text("长度只能在6-20个字符之间");
		$(this).parent().next("div").css("color",'red');
	}else{
		$(this).parent().next("div").text("");
	}		
})
//确认密码失去焦点的时候
$('input').eq(2).blur(function(){
	if($(this).val().length==0){
		$(this).parent().next("div").text("");
		$(this).parent().next("div").css("color",'#ccc');
	}else if($(this).val()!=$('input').eq(1).val()){
		$(this).parent().next("div").text("两次密码不匹配");
		$(this).parent().next("div").css("color",'red');
	}else{
		$(this).parent().next("div").text("");
	}		
})
//手机号失去焦点的时候
$('input').eq(0).blur(function(){
	if($(this).val().length==0){
		$(this).parent().next("div").text("");
		$(this).parent().next("div").css("color",'#ccc');
	}else if($(this).val().substr(0)!=1&&$(this).val().length!=11){
		$(this).parent().next("div").text("手机号格式不正确");
		$(this).parent().next("div").css("color",'red');
	}else{
		$(this).parent().next("div").text("");
	}		
})
//	验证码
function code(){
	var str="qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPLKJHGFDSAZXCVBNM";
	var str1=0;
	for(var i=0; i<4;i++){
		str1+=str.charAt(Math.floor(Math.random()*62)) //charAt() 方法可返回指定位置的字符。Math.floor()就是简单的向下取整
	}
	str1=str1.substring(1)//substring() 方法用于提取字符串中介于两个指定下标之间的字符。substring(1)从下标为1的字符开始到结尾
	$("#code").text(str1);
}
code();
$("#code").click(code);	
//	验证码输入
$('input').eq(3).blur(function(){
	if($(this).val().length==0){
		$(this).parent().next().next("div").text("");
		$(this).parent().next().next("div").css("color",'#ccc');
	}else if($(this).val().toUpperCase()!=$("#code").text().toUpperCase()){
		$(this).parent().next().next("div").text("验证码不正确");
		$(this).parent().next().next("div").css("color",'red');
	}else{
		$(this).parent().next().next("div").text("");
	}		
})
//	点击注册时候的判断
$("#submit_btn").click(function(e){		
	for(var j=0 ;j<4;j++){
		if($('input').eq(j).val().length==0){				
			$('input').eq(j).focus();				
			if(j==4){
				$('input').eq(j).parent().next().next("div").text("请勾选协议");
				$('input').eq(j).parent().next().next("div").css("color",'red');
				e.preventDefault();
				return;
			}
			$('input').eq(j).parent().next(".tips").text("此处不能为空");
			$('input').eq(j).parent().next(".tips").css("color",'red');	
			e.preventDefault();
			return;
		}			 
	}
	//如果勾选了
	if($("#xieyi")[0].checked){	 
		$.ajax({
			type: 'GET',
			url:"http://localhost:8080/proxy/localhost/phpnow/guazi/php/register.php",
			data:`phone=${$('#phone').val()}&password=${$('#password').val()}`,
		 })
		 .then(function(res){
			console.log(res);
			window.location.href = "http://localhost:8080/login.html";
		})
	}else{						
		$("#xieyi").next().next().next(".tips").text("请勾选协议");
		$("#xieyi").next().next().next(".tips").css("color",'red');
		e.preventDefault();
		return;
	}
	return false;
})



