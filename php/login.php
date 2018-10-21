<?php
    header("Content-Type:text/html;charset=utf-8;");

    $phone = @$_GET["phone"];
    $password = @$_GET["password"];

    if($phone == "" || $password == ""){
        die("参数不全");
    }

    $con = mysql_connect("localhost","root","123456");
    if(!$con){
     
        die("数据库连接失败");
    }
    mysql_select_db("userlist", $con);

    $result = mysql_query(
                "SELECT phone,password FROM 
                guazi WHERE phone='$phone'"
    );

    $password = md5($password);
    while($row = mysql_fetch_array($result)){
        if($row['password'] == $password){
            die("登陆成功");
        }
    }
    echo mysql_error();
    echo "账号或者密码不正确";
?>