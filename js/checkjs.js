var username = document.getElementById("username");
var password = document.getElementById("password");
var login_btn = document.getElementsByClassName("login-btn")[0];
var reg_btn = document.querySelector(".reg-btn");
var errorMess = document.getElementById("error-show");
var mess=null;

//隐藏错误信息
function reset(){
	errorMess.className="error-show";//添加隐藏错误信息域类名
}

//显示错误信息
function message(mess){
	errorMess.className="";//清空隐藏错误信息域类名，显示错误信息
	errorMess.innerHTML = mess;
}
//读取cookie
if(getCookie("uname")){
	username.value=getCookie("uname");
}

//登录校验
function logshowError() {
	//正则匹配
	var validString = /^[a-zA-Z\d]\w{2,9}[a-zA-Z\d]$/;//4~11位字符
	var validEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	var validPhone = /^(13[0-9]|15[0|3|6|8|9])\d{8}$/;
	var validPass = /^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{8,20}$/;//同时包含字母数字特殊符号，且长度在10-20
	
	//表单验证
	if(username.value==""){
		mess="请输入用户名。";
		message(mess);
		return false;
	}else if(!(validString.test(username.value) || validEmail.test(username.value) || validPhone.test(username.value))){
		mess="用户名或密码错误。";
		message(mess);
		return false;
	}else if(password.value==""){
		mess="请输入密码。";
		message(mess);
		return false;
	}else if(!validPass.test(password.value)){
		mess="用户名或密码错误。";
		message(mess);
		return false;
	}else{
		//设置cookie
		var auto_login = document.getElementById("auto-login");
		if(auto_login.checked == true){//添加cookie
			var time = 1000*60*60;//1000*60*60*24*30  30天后过期
			setCookie("uname",username.value,time);
		} else {//清空cookie
			delCookie("uname");
		}
		
		//进行数据库表单校验
		window.location.assign("./index.html");
	}
}

//注册校验
function regshowError() {
	//正则
	var validString = /^[a-zA-Z\d]\w{2,9}[a-zA-Z\d]$/;//4~11位字符
	var validEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
	var validPhone = /^(13[0-9]|15[0|3|6|8|9])\d{8}$/;
	var validPass = /^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{8,20}$/;//同时包含字母数字特殊符号，且长度在10-20
	var repassword = document.getElementById("repassword");//确认密码
	var email = document.getElementById("email");//邮箱验证
	//表单验证
	if(username.value===""){
		mess="请输入用户名。";
		message(mess);
		return false;
	} else if(!(validString.test(username.value) || validPhone.test(username.value))){
		mess="请输入4-11位英文字母或数字或者您的手机号作为您的用户名。";
		message(mess);
		return false;
	} else if(password.value===""){
		mess="请输入密码。";
		message(mess);
		return false;
	}  else if(!validPass.test(password.value)){
		mess="请输入10-20位、同时包含[字母][数字]和[特殊符号]的密码。";
		message(mess);
		return false;
	} else if(repassword.value===""){
		mess="请再次输入密码。";
		message(mess);
		return false;
	} else if(password.value!=repassword.value){
		mess="两次密码输入不一致。";
		message(mess);
		return false;
	} else if(validEmail.value===""){
		mess="请输入邮箱。";
		message(mess);
		return false;
	} else if(!validEmail.test(email.value)){
		mess="请输入正确的邮箱。";
		message(mess);
		return false;
	} else{
		
		//进行服务器表单校验
		window.location.assign("./index.html");
	}
}

//添加cookie
function setCookie(name,value,time){ 
	var nowDate = new Date();
	nowDate.setTime(nowDate.getTime()+time); 
    document.cookie = name + "="+ encodeURI(value) + ";expires=" + nowDate.toGMTString(); 
}
//获取cookie
function getCookie(name) { 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
    	return decodeURI(arr[2]); 
    }
    else {
    	return null; 
    }
} 
//删除cookie
function delCookie(name) { 
    var nowDate = new Date(); 
    nowDate.setTime(nowDate.getTime() - 1); 
    var cancal=getCookie(name); 
    if(cancal!=null) 
        document.cookie= name + "="+cancal+";expires="+nowDate.toGMTString(); 
} 

//触发键盘事件，隐藏错误提示
enventUtil.addHandler(document,"keypress",reset);
enventUtil.addHandler(document,"keyup",reset);
enventUtil.addHandler(document,"keydonw",reset);