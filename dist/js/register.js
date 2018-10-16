$('input').eq(0).focus(function(){
	if($(this).val().length==0){
		$(this).parent().next("div").text("支持中文，字母，数字，'-','_'的多种组合");
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
		$(this).parent().next("div").text("验证完后，你可以使用该手机登录和找回密码");
	}
})
$('input').eq(4).focus(function(){	
	if($(this).val().length==0){
		$(this).parent().next().next("div").text("看不清？点击图片更换验证码");
	}
})
	//用户名当失去焦点的时候
$('input').eq(0).blur(function(){
	if($(this).val().length==0){
		$(this).parent().next("div").text("");
		$(this).parent().next("div").css("color",'#ccc');
	}else if($(this).val().length>0 && $(this).val().length<4){
		$(this).parent().next("div").text("长度只能在4-20个字符之间");
		$(this).parent().next("div").css("color",'red');
	}else if($(this).val().length>=4&& !isNaN($(this).val())){
		$(this).parent().next("div").text("用户名不能为纯数字");
		$(this).parent().next("div").css("color",'red');
	}else{
		for(var m=0;m<stuList.length;m++){
			if($(this).val()==stuList[m].name){
				$(this).parent().next("div").text("该用户名已被注册");
				$(this).parent().next("div").css("color",'red');
				return;
			}				
		}
		$(this).parent().next("div").text("");
	}		
})
	//设置密码失去焦点的时候
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
$('input').eq(3).blur(function(){
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
$('input').eq(4).blur(function(){
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
	for(var j=0 ;j<5;j++){
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

	}else{						
		$("#xieyi").next().next().next(".tips").text("请勾选协议");
		$("#xieyi").next().next().next(".tips").css("color",'red');
		e.preventDefault();
		return;
	}
	
})




// window.onload = function(){
// 	var oUser = document.getElementById("username");
// 	var oPwd = document.getElementById("password");
// 	var input = document.getElementsByTagName("input");
// 	var span = document.querySelectorAll(".tip");
// 	var oBtn = document.getElementById("submit_btn");	
// 	var arr = [0,0,0,0,0,0,0];
// 	input[0].focus = function(){
// 		var str = this.value;
// 		if(str != ""){
// 			var reg = /^[a-z0-9]{6,12}$/i;
// 			if(reg.test(str)){
// 				span[0].style.display = "none";
// 				arr[0] = 1; 
// 			}else{
// 				span[0].innerText = "您输入的账号不合法";
// 				span[0].style.display = "inline-block";
// 				arr[0] = 2;
// 			}
// 		}				
// 	};
	
// 	input[1].onblur = function(){
// 		var str = this.value;
// 		if(str != ""){
// 			var reg = /^\w{6,18}$/;
// 			if(reg.test(str)){
// 				span[1].style.display = "none";
// 				arr[1] = 1; 
// 			}else{
// 				span[1].innerText = "您输入的密码不合法";
// 				span[1].style.display = "inline-block";
// 				arr[1] = 2; 
// 			}
// 		}
// 	};

// 	input[2].onblur = function(){
// 		var str = this.value;
// 		if(str != "")
// 		{
// 			var str1 = input[1].value;
// 			if(str === str1){
// 				span[2].style.display = "none";
// 				arr[2] = 1; 
// 			}else{
// 				span[2].innerText = "您输入的密码与上面不一致";
// 				span[2].style.display = "inline-block";
// 				arr[2] = 2; 
// 			}
// 		}
		
// 	};
	
// 	input[3].onblur = function(){
// 		var str = this.value;
// 		if(str != ""){
// 			var reg = /^\w+@(126|163|qq)\.(com|cn)$/;
// 			if(reg.test(str)){
// 				span[3].style.display = "none";
// 				arr[3] = 1; 
// 			}else{
// 				span[3].innerText = "您输入的邮箱格式不合法";
// 				span[3].style.display = "inline-block";
// 				arr[3] = 2; 
// 			}
// 		}
		
// 	};
	
// 	input[4].onblur = function(){
// 		var str = this.value;
// 		if(str != ""){
// 			var reg = /^\d{8,12}$/;
// 			if(reg.test(str)){
// 				span[4].style.display = "none";
// 				arr[4] = 1; 
// 			}else{
// 				span[4].innerText = "您输入的QQ号码格式不合法";
// 				span[4].style.display = "inline-block";
// 				arr[4]= 2; 
// 			}
// 		}
		
// 	};
	
// 	input[5].onblur = function(){
// 		var str = this.value;
// 		if(str != ""){
// 			var reg = /^(156|158|188)\d{8}$/;
// 			if(reg.test(str)){
// 				span[5].style.display = "none";
// 				arr[5] = 1; 
// 			}else{
// 				span[5].innerText = "您输入的手机号码格式不合法";
// 				span[5].style.display = "inline-block";
// 				arr[5] = 2; 
// 			}
// 		}
		
// 	};
	
// 	input[6].onblur = function(){
// 		var str = this.value;
// 		if(str != ""){
// 			var reg = /^(http:\/\/).{5,}(\.com)$/;
// 			if(reg.test(str)){
// 				span[6].style.display = "none";
// 				arr[6] = 1; 
// 			}else{
// 				span[6].innerText = "您输入的URL地址不合法";
// 				span[6].style.display = "inline-block";
// 				arr[6] = 2; 
// 			}
// 		}
		
// 	};
	
// 	oBtn.onclick = function(){
// 		var num = arr[0] * arr[1] * arr[2] * arr[3] * arr[4] * arr[5] * arr[6];
// 		if(num == 0){
// 			alert("您未输入完");
// 		}else if(num == 1){
// 			alert("验证成功");
// 		}else{
// 			alert("您输入不合法");
// 		}
		
// 		var url = "http://localhost/php-level2/myown/jd-register/php/register.php";
// 			ajaxPost(url,`username=${oUser.value}&password=${oPwd.value}&email=${input[3].value}&QQ=${input[4].value}&phone=${input[5].value}&person=${input[6].value}`)
// 			.then(function(res){
// 				console.log(res);
// 			})
// 		};
// }
