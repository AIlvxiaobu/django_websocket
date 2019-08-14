// JavaScript Document
var mobile_phone = /^1(3[4-9]|5[021789]|8[78])\d{8}$/;  //移动手机号正则
//扩展JQUERY插件
(function($){

	//设置禁用或启用按钮,并在按钮右侧显示等待图标
	$.fn.disabled = function(s){
		/*s={flag:true|false, img:true|false}*/
		s = $.extend({flag:true,
					 img:false,
					 img2:false},s);

		var _self = this;
		var _id = _self.attr('data-loading-id');
        if(!_id) {
            var timestamp = new Date().getTime();
            _id = timestamp;
            _self.attr("data-loading-id", _id);
        }
		if(s.flag){
			if(s.img) {
				var loading_html = '<div id="'+_id+'_loading_img" style="background:url(/site_media/images/loading.gif) no-repeat center center; background-color:#000; filter:alpha(opacity=40);-moz-opacity: 0.40; opacity: 0.40; position:absolute; z-index:99; ';
				loading_html += 'width:'+$(_self).width()+'px;padding-right:'+$(_self).css("padding-right")+';padding-left:'+$(_self).css("padding-left")+'; height:'+$(_self).height()+'px; left:'+$(_self).offset().left+'px; top:'+$(_self).offset().top+'px;'
				loading_html += '"></div>';
				$("body").append(loading_html);
			}
			if(s.img2)
				$(_self).after("&nbsp;<img id='"+ _id +"_img2' src='/site_media/images/loading.gif' />");
			else
				$("#"+ _id +"_img2").remove();
			_self.attr('disabled', true);
		}else{
			$("#"+ _id +"_loading_img").remove();
			$("#"+ _id +"_img2").remove();
			_self.attr('disabled', false);
		}
	};


	//去除两侧空格
	$.trim = function (text) {
		return (text||"").replace(/^\s+|\s+$/g,"").replace(/^[　]+|[　]+$/g, "");
	}

	$.fn.setPosition = function(nBottomHeight) {
		var _self = this;
		var normalTop = parseInt(_self.css('top'))? parseInt(_self.css('top')) :0 ;
		var headHeight = _self.offset().top; //距离页面顶部高度
		var barHeidht = _self.outerHeight() + headHeight;
		nBottomHeight = !nBottomHeight || parseInt(nBottomHeight) ? parseInt(nBottomHeight) : 0;
		setPosition()
		$(window).scroll(setPosition);
		$(window).resize(setPosition);
		function setPosition() {
			var winHeight = $(window).height()-nBottomHeight;
			var scrollHeight = $(this).scrollTop();
			if (winHeight < barHeidht) {
				if (scrollHeight + winHeight > barHeidht) {
					_self.stop().animate({
						top: scrollHeight + winHeight - barHeidht + normalTop + 'px'
						},500);
				} else {
					_self.stop().animate({
						top:normalTop+'px'
						},500);
				};
			} else {
				_self.stop().animate({
						top:scrollHeight + normalTop+'px'
						},500);
			}
		}
	};

})(jQuery);


//设置禁用或启用按钮
function is_disabled(id, is_disable) {
	/*
	id:对象id
	is_disable:true启用;false:禁用
	is_disable参数如果不传默认为true
	author:xw
	date:2009-4-13
	*/

	var img_display = '';
	if (arguments.length == 1) {
		is_disable = true;
	}
	if(typeof($("#"+id+"_img").attr("id")) == "undefined") {
		$("#"+id).after("&nbsp;<img id='"+id+"_img' src='/site_media/images/loading.gif' />");
	}
	if (!is_disable){
		img_display = 'none';
	}
	$('#'+id).attr('disabled', is_disable);
	$('#'+id+'_img').css('display', img_display);
}

function isCheckEmail(email) {
	/*
	 *验证邮箱格式是否正确, 正确：true， 错误：false
	 *author:
	 *date:2009-5-5
	**/
	//var e = /^([a-zA-Z0-9_-])+[@]{1}(\S)+[.]{1}(\w)+/;
	var e =  /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	if (e.test(email)) {
		return true;
	}
	return false;
}

//返回加载等待html
function GetLodingHtml(margin) {
	/*
	margin:上下距离， 默认：50px
	*/
	var margin_num = 50;
	if (typeof(margin) !== 'undefined') {
		margin_num = parseInt(margin);
	}
	var html = '<div style="margin:'+margin_num+'px 0;">';
    html += '<div class="loading-img">正在加载数据，请稍后...</div>';
    html += '</div>';
	return html;
}

//删除字符串两边空格
function del_blank(s)
{
	//使用正则表达式先截取前面的空格，在截取后面的空格
	return s.replace(/^\s*/,"").replace(/\s*$/,"");
}

// 是否为中文
function isChn(str) {
  //var reg = /[^\u4E00-\u9FA5]{4,16}$/;
  var reg = /^[\u4E00-\u9FA5]+$/;
  if (!reg.test(str)) {
	return false;
  }
  return true;
}

//验证用户真实姓名
function ValidUserName(val, elem) {
	if (val.length<2 || val.length>6 || !isChn(val)) {
		return false;
	}
	return true;
}


//验证电话号
function ValidPhone(phone_num) {
	var reg = /^0?((10)|(2\d{1})|([3-9]\d{2}))-[1-9]\d{6,7}(-\d{3,4})?$/;
	return ValidReg(reg, phone_num);
}

//验证手机号码
function ValidMobile(num) {
	var reg = /^1[3458]\d{9}$/;
	return ValidReg(reg, num);
}
//验证是否是移动手机号
function ValidChinaMobile(phone_number){
	var reg = /^((((13[5-9]{1})|(15[012789]{1})|(18[23478]{1})){1}[0-9]{1})|(134[0-8]{1})){1}[0-9]{7}/;
	return ValidReg(reg, phone_number);
}
//正则表达式验证参数是否匹配
function ValidReg(reg, str) {
	if (!reg.test(str)) {
		return false;
	} else {
		return true;
	}
}

//返回验证码
function GetVerifyCode(id) {
	$('#'+id).attr('src', '/getcode/?nocache=' + Math.random());
}

//让指定输入框控件中只能输入中文,参数为文本框id
function set_chinese(input_name){
	var ele = $("#" + input_name);
	ele.blur(function(){
		this.value = this.value.replace(/[ -~]/g,'');
	});
	ele.keyup(function(){
		this.value = this.value.replace(/[ -~]/g,'');
	});
}

//设置只能输入数字,参数为文本框id
function set_number(input_name){
	var ele = $("#" + input_name);
	ele.keyup(function(){
		this.value = this.value.replace(/\D/g,'');
	});
	ele.blur(function(){
		this.value = this.value.replace(/\D/g,'');
	});
}

//设置只能输入字母
function set_en(input_name) {
	var ele = $("#" + input_name);
	ele.keyup(function(){
		ele.val(ele.val().replace(/[^\w\.\/]/ig,''));
	});
}


//全选事件
function CheckAll(name) {
	$("[name="+name+"]").attr('checked', true);
}

//反选事件
function CheckInverse(name) {
	$.each($("[name="+name+"]"),function(n){
		this.checked = !this.checked;
	});
}
function GetCookieVal(offset)
//获得Cookie解码后的值
{
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
	endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}
function SetCookie(name, value)
//设定Cookie值
{
	var expdate = new Date();
	var argv = SetCookie.arguments;
	var argc = SetCookie.arguments.length;
	var expires = (argc > 2) ? argv[2] : 7;//设置默认 cookie 过期时间为 7 天
	var path = (argc > 3) ? argv[3] : '/'; //默认所有页面使用
	var domain = (argc > 4) ? argv[4] : null;
	var secure = (argc > 5) ? argv[5] : null;

	if(expires!=null) expdate.setTime(expdate.getTime() + ( expires * 24 * 60 * 60 * 1000 ));
	document.cookie = name + "=" + escape (value) +((expires == null) ? "" : ("; expires="+ expdate.toGMTString()))
	+("; path=" + path) +((domain == null) ? "" : ("; domain=" + domain))
	+((secure == null) ? "" : ("; secure=" + secure));//path 默认为/ domain和secure默认都不设置。已经将delCookie方法同步，删除时保持一致，否则会导致cookie删除失败！！
}

function GetCookie(name)
//获得Cookie的原始值
{
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	while (i < clen)
	{
	var j = i + alen;
	if (document.cookie.substring(i, j) == arg)
	return GetCookieVal (j);
	i = document.cookie.indexOf(" ", i) + 1;
	if (i == 0) break;
	}
	return null;
}

//删除Cookie
function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	document.cookie = name + "=; expires="+ exp.toGMTString()+"; path=/";
}

//返回字符串长度，英文算一个字符中文算两个字符
function StrLen(sString) {
    var j = 0;
    var s = sString;
    if (s=="") return j;
    for (var i=0; i<s.length; i++) {
      if (s.substr(i,1).charCodeAt(0)>255) j = j + 2;
      else j++
    }
    return j;
}

function getCursortPosition(domObj) {
	var position = 0;

	if (document.selection) {	//for IE
		domObj.focus();
		var sel = document.selection.createRange();
		sel.moveStart('character', -domObj.value.length);

		position = sel.text.length;
	} else if (domObj.selectionStart || domObj.selectionStart == '0') {
		position = domObj.selectionStart;
	}
	return position;
}
function setursortPosition(elm, n) {
    if(n > elm.value.length)
        n = elm.value.length;
    if(elm.createTextRange) {   // IE
        var textRange = elm.createTextRange();
        textRange.moveStart('character',n);
        textRange.collapse();
        textRange.select();
    } else if(elm.setSelectionRange) { // Firefox
        elm.setSelectionRange(n, n);
        elm.focus();
    }
}
//关闭所有弹窗
function art_close(){
	var list = art.dialog.list;
	for (var i in list) {
	list[i].close();
	};
}
function ScoreToEn(num){
	if(num<40){
		return 'D';
	}else if(num >=40 && num < 70){
		return 'C';
	}else if(num >=70 && num < 80){
		return 'B';
	}else{
		return 'A';
	}
}

//加入错题集
function addWrongNote(id){
	$.post('/wrongnote/add/',{'id':id},function (data){
		if(data == 'ok'){
			alert('加入成功');
		}else{
			alert('加入失败');
		}
	});
}
//移除错题集
function delWrongNote(id){
	$.post('/wrongnote/del/',{'id':id},function (data){
		if(data == 'ok'){
			alert('移除成功');
		}else{
			alert('移除失败');
		}
	});
}
//是否存在于错题集
function isExist(list){
	$.post('/wrongnote/is_exist/',{'quest_list':list},function (data){
		if(data == 'error'){
			alert('系统错误，请稍后...');
		}else{
			alert(data);
		}
	});
}

// 首页导航学科判断
function get_subject_learn(subject_id,grade_id){
    if(subject_id == 3 && grade_id<8 &&grade_id!=0){
        alert('当前年级没有对应的物理学科');
    }else if(subject_id == 4 && grade_id<9&&grade_id!=0){
        alert('当前年级没有对应的化学学科');
    }else{
        location.href = '/nself_test/subject/'+subject_id+'/';
    }
}

$(function($){
	$(document).on('click','a[data-target="newtab"]',function(){
		if (top.window == window) {return true};
		// 获取父页面元素及tab的index
		var TOPiframesLength = top.iframesLength;
        var TOPframeTitle = top.$('#frameTitle');
        var TOPframeWrap = top.$('#frameWrap');
		var url = $(this).attr('href');
		var index = $(this).attr('index');
		var text = $(this).attr('data-name') ? $(this).attr('data-name') : $(this).text();
		var parentIframe = TOPframeTitle.find('.on').attr('index');
		if (typeof index != 'undefined') {
			// 已经有标签
			TOPframeTitle.find('span[index='+index+']').trigger('click');
		}else{
			// 还没标签需要创建
			var titleTMP = '<span index="' + TOPiframesLength + '"><em>' + text + '</em><var index="' + TOPiframesLength + '">R</var><a href="javascript:;" index="' + TOPiframesLength + '" openwindow="iframe'+parentIframe+'">X</a></span>';
			var frameTMP = '<iframe id="iframe'+TOPiframesLength+'" scrolling="auto" width="100%" name="iframe'+TOPiframesLength+'" src="'+url+'" frameborder="0"></iframe>'
			TOPframeTitle.append(titleTMP);
			TOPframeWrap.append(frameTMP);
			$(this).attr('index',TOPiframesLength);
			top.iframesLength++;
			$(this).trigger('click');
		}
		return false;
	})
    $(".data_list .tb_list tr").mouseover(function(){
        $(this).attr('bgcolor','#3EAFE0');
    }).mouseout(function(){
        $(this).attr('bgcolor','#FFFFFF');
    });
})
// 表格鼠标经过新式效果
function tr_hover(){
    $(".data_list .tb_list tr").mouseover(function(){
        $(this).attr('bgcolor','#3EAFE0');
    }).mouseout(function(){
        $(this).attr('bgcolor','#FFFFFF');
    });
}
// 短信计数统计
var $$ = function (id) {return window.document.getElementById(id)};
//计算短信字数条数
function TextCounter(maxlimit){
    var $MsgCount = $$("msg_count");
    var $MsgNum = $$("msg_num");
    $MsgCount.innerText = 0; //设置为0个字
    $MsgNum.innerText = 0;	//设置0条短信

    var content = $$("msg_content").value;
    var txt_length = content.length;

    if(txt_length > 280){
        content = content.substring(0,280);

        $$("msg_content").value = content;
        txt_length = content.length;
    }
    if($$("msg_content").value.length>0)
    {
        $MsgCount.innerText = txt_length;
        if(txt_length%70==0)
            $MsgNum.innerText = txt_length/70;
        else
            $MsgNum.innerText = Math.floor(txt_length/70)+1;
    }
}
