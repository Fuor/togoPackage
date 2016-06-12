window.onload = function() {
	function focus() {
		myFocus.set({
			id : 'focus',// 焦点图盒子ID
			pattern : 'mF_fancy',// 风格应用的名称
			time : 3,// 切换时间间隔(秒)
			trigger : 'click',// 触发切换模式:'click'(点击)/'mouseover'(悬停)
			width : 810,// 设置图片区域宽度(像素)
			height : 313,// 设置图片区域高度(像素)
			txtHeight : '0'// 文字层高度设置(像素),'default'为默认高度，0为隐藏
		});
	}
	focus();

	/* 搜索框检查 */
	var seachBox = document.querySelector("#seachBox");
	var seachInput = seachBox.querySelectorAll("input");
	var seachSpan = seachBox.querySelectorAll("span");

	function checkSearch() {
		var space = /\S+(?:\s+\S+)*/;
		if (space.test(seachInput[0].value)) {
			window.open("https://www.baidu.com/s?wd=" + seachInput[0].value);
		}
	}
	enventUtil.addHandler(seachSpan[0], "click", checkSearch);

	/* 显示下拉菜单 */
	var navList = document.querySelector(".top-navbar-nav-list");
	// alert(navList);
	var dropdownbar = document.querySelector(".navbar-allnavs-box");

	enventUtil.addHandler(navList, "mouseover", showDropdown);
	enventUtil.addHandler(navList, "mouseout", hideDropdown);

	function showDropdown() {
		dropdownbar.className = "navbar-allnavs-box";
	}
	function hideDropdown() {
		var url = window.location.href;
		var index = url.indexOf("index.html") < 0;
		if (index) {
			dropdownbar.className += " list-dropdownbar";// 添加隐藏类list-dropdownbar
		}
	}

	/* 二级分类显示 */
	var navBox = document.querySelectorAll(".navbar-allnavs");
	var secondNav = document.querySelectorAll(".wrap-box-second");

	// 绑定事件
	for ( var i = 0; i < navBox.length; i++) {
		/*
		 * navBox[i].onmouseover=function(){ var that=this; that.className+="
		 * changeBg"; //alert(that); }
		 */
		navBox[i].index = i;
		enventUtil.addHandler(navBox[i], "mouseover", mouseover);
		enventUtil.addHandler(navBox[i], "mouseout", mouseout);
	}
	// 显示二级菜单
	function showsecondNav(seNav) {
		var that = this;
		for ( var m = 0; m < navBox.length; m++) {
			if (secondNav[m] == that) {
				change(navBox[m]);
			}
		}
		dropdownbar.className = "navbar-allnavs-box";
		that.className = "wrap-box-second";
		enventUtil.addHandler(that, "mouseout", hiddesecondNav);
	}
	// 隐藏二级菜单
	function hiddesecondNav(seNav) {
		var that = this;
		for ( var o = 0; o < navBox.length; o++) {
			if (secondNav[o] == that) {
				rechange(navBox[o]);
			}
		}
		// dropdownbar.className+= " list-dropdownbar";
		hideDropdown();
		that.className += " box-second-states";
	}
	// 鼠标移入一级菜单
	function mouseover(navBox) {
		var that = this;
		if (that.className === "navbar-allnavs") {
			change(that);
		}
	}
	// 改变背景
	function change(that) {
		that.className += " changeBg";
		// alert(that.className);
		secondNav[that.index].className = "wrap-box-second";
		var navA = that.querySelectorAll("a");
		for ( var n = 0; n < navA.length; n++) {
			if (navA[n].className !== "spacial") {
				navA[n].style.color = "#000";
			}
		}
	}
	// 鼠标移出一级菜单
	function mouseout(navBox) {
		status = true;
		var that = this;
		enventUtil
				.addHandler(secondNav[that.index], "mouseover", showsecondNav);
		rechange(that);
	}
	// 还原背景
	function rechange(that) {
		var navA = that.querySelectorAll("a");
		that.className = "navbar-allnavs";
		secondNav[that.index].className += " box-second-states";
		for ( var n = 0; n < navA.length; n++) {
			if (navA[n].className !== "spacial") {
				navA[n].style.color = "#FFF";
			}
		}
	}

	/* 固定栏提示 */
	var rightBar = document.querySelector("#rightbar");
	var span = rightBar.querySelectorAll("span");

	function showMess(span) {
		// alert(this);return false;
		var spanClass = this.className;
		if (spanClass != "service active" || spanClass != "contact active") {
			this.className += " active";
			var parent = this.parentNode;
			parent.getElementsByTagName("i")[0].className = "active";
		}
	}
	function hiddeMess(span) {
		var spanClass = this.className;
		var parent = this.parentNode;
		if (spanClass = "service active") {
			this.className = "service";
			parent.getElementsByTagName("i")[0].className = "";
		} else if (spanClass = "contact active") {
			this.className = "contact";
			parent.getElementsByTagName("i")[0].className = "";
		}
		parent.getElementsByTagName("i")[0].className = "";
	}
	for ( var p = 0; p < span.length; p++) {
		enventUtil.addHandler(span[p], "mouseover", showMess);
		enventUtil.addHandler(span[p], "mouseout", hiddeMess);
	}

	// 回到顶部
	var btn = document.querySelector("#gotoTop");
	var timer = null;
	var onscroll = true;

	// 手动滚动滚动条时触发事件
	window.onscroll = function() {
		// 显示/隐藏返回顶部按钮
		// 滚动距离
		var oTop = document.documentElement.scrollTop
				|| document.body.scrollTop;
		// 可视窗口高度
		var clientHeight = document.documentElement.clientHeight;
		//var btn = document.getElementById("gotoTop");
		if (oTop >= clientHeight) {
			btn.style.display = "block";
		} else {
			btn.style.display = "none";
		}
		// 滑动鼠标滚珠，停止回到顶部
		if (!onscroll) {
			clearInterval(timer);
		}
		onscroll = false;
	}
	// 返回顶部方法
	function goTop(element) {
		timer = setInterval(function() {
			var oTop = document.documentElement.scrollTop
					|| document.body.scrollTop;
			var speed = Math.floor(-oTop / 3);
			if (oTop > 0) {
				document.documentElement.scrollTop = document.body.scrollTop = oTop
						+ speed;
				onscroll = true;
			} else {
				clearInterval(timer);
			}
		}, 40);
	}
	enventUtil.addHandler(btn, "click", goTop);
	

	/* 图片动画 */
	// 取得图片
	function getPic(liClass) {
		var Picli = document.querySelectorAll(liClass);
		var Pic = new Array();
		for ( var i = 0, l = Picli.length; i < l; i++) {
			// 循环取出每个li标签中的img
			Pic.push(Picli[i].querySelector("img"));
		}
		return Pic;
	}

	// 大图动画
	function bpMovedonw(bgPic) {
		this.style.paddingTop = "5px";
		this.style.opacity = "0.6";
	}
	function bpMoveup(bgPic) {
		this.style.paddingTop = "";
		this.style.opacity = "1";
	}
	// 小图动画
	function smMoveright(smPic) {
		this.style.paddingLeft = "5px";
	}
	function smMoveleft(smPic) {
		this.style.paddingLeft = "";
	}

	var bigClass = ".bigitem-pic";
	var bgPic = getPic(bigClass);
	var smallClass = ".item-small-pic";
	var smPic = getPic(smallClass);
	// alert(res);return false;
	for ( var i = 0, l = bgPic.length; i < l; i++) {
		enventUtil.addHandler(bgPic[i], "mouseover", bpMovedonw);
		enventUtil.addHandler(bgPic[i], "mouseout", bpMoveup);
	}
	for ( var i = 0, l = smPic.length; i < l; i++) {
		enventUtil.addHandler(smPic[i], "mouseover", smMoveright);
		enventUtil.addHandler(smPic[i], "mouseout", smMoveleft);
	}
}

// 购物车
var middle_car = document.querySelector(".top-middle-car");
var cart_box = document.querySelector(".top-middle-car-item");
function showCart() {
	cart_box.className = "top-middle-car-item";
	enventUtil.addHandler(middle_car, "mouseout", hideCart);
}
function hideCart() {
	cart_box.className += " hide";
}
enventUtil.addHandler(middle_car, "mouseover", showCart);


// 详情页HTML代码转义方法
function HtmlDecode(str) {
	str = str.replace(/&amp;/g, '&');
	str = str.replace(/&lt;/g, '<');
	str = str.replace(/&gt;/g, '>');
	str = str.replace(/&quot;/g, "''");
	str = str.replace(/&#039;/g, "'");
	return str;
}

// 详情页Tab切换
function tab() {
	var discribe = document.querySelector(".discribe");
	var reviws = document.querySelector(".reviws");
	// alert(this.className.indexOf("discribe-menu"));
	if (this.className.indexOf("discribe-menu") > -1) {
		this.className = "discribe-menu active1";
		reviws_menu.className = "reviws-menu";
		reviws.className = "reviws hide";
		discribe.className = "discribe";
	} else {
		this.className = "reviws-menu active2";
		discribe_menu.className = "discribe-menu";
		discribe.className = "discribe hide";
		reviws.className = "reviws";
	}
}
