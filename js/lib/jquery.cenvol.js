/*
插件环境：jQuery
版本编号：130718
作   者：chenhao
[功能表]
0- Tab选项卡
1- Slide焦点图
2- Equal等高
3- Odevity隔行变色
4- 虚拟HTML5-placeholder属性
*/
;(function($){
/*=0 tab选项卡*/
	$.extend({
		tab:function(value){
			var o={
				oTab:"#tab",					//tab选项卡的容器（父级）
				sTabChildren:"a",				//tab选项卡
				oTabMain:"#tabMain",			//tab内容区的容器（父级）
				sTabMainChildren:"ul",			//tab内容区
				sClass:"current",				//选中样式
				sEvent:"click",					//tab选项卡切换的触发事件
				sEarliest:true,					//是否执行初始化显示
				iStart:0,						//最先显示的选项卡
				bAuto:false,					//需要自动切换吗
				iSpeed:3000,					//切换速度
				bHover:true,					//是否启动鼠标移入时停止切换
				fnAdditional:""					//追加方法
			}
			o=$.extend({},o,value);
			$(o.oTabMain).children(o.sTabMainChildren).hide();
			function fnTabShow(){
				var _index;
				$(o.oTab).children(o.sTabChildren).each(function(){
					if($(this).hasClass(o.sClass)){
						_index=$(this).index();
					}
                });
				$(o.oTab).children(o.sTabChildren).eq(_index).addClass(o.sClass).siblings(o.sTabChildren).removeClass(o.sClass);
				$(o.oTabMain).children(o.sTabMainChildren).eq(_index).show().siblings(o.sTabMainChildren).hide();
			}
			if(o.sEarliest){
				$(o.oTab).children(o.sTabChildren).eq(o.iStart).addClass(o.sClass).siblings().removeClass(o.sClass);
				$(o.oTabMain).children(o.sTabMainChildren).eq(o.iStart).show();
			}
			else{
				fnTabShow();
			}
			$(o.oTab).children(o.sTabChildren).bind(o.sEvent,function(){
				$(this).addClass(o.sClass).siblings().removeClass(o.sClass);
				fnTabShow();
			});
			if(o.bAuto){
				var bTime;
				var iLength=$(o.oTab).children(o.sTabChildren).length;
				function fnAuto(){
					o.iStart++;
					if(o.iStart<iLength){
						$(o.oTab).children(o.sTabChildren).eq(o.iStart).trigger(o.sEvent);
					}
					else{
						o.iStart=0;
						$(o.oTab).children(o.sTabChildren).eq(0).trigger(o.sEvent);
					}
				}; 
				bTime=setInterval(fnAuto,o.iSpeed);
				if(o.bHover){
					$(o.oTabMain).children(o.sTabMainChildren).hover(function(){
						clearTimeout(bTime);
					},function(){
						bTime=setInterval(fnAuto,o.iSpeed);
					});
				}
			}
			if(typeof(o.fnAdditional)=="function")
			o.fnAdditional();
		}
	});
/*=1 Slide焦点图*/
	$.extend({
		slide:function(value){
			var o={
				oSlide:"#slide",			//焦点图内容容器
				oSlideChildren:"li",		//焦点图内容
				oSlideList:"#SlideList",	//焦点图列表容器
				oSlideListChildren:"a",		//焦点图列表
				sClass:"current",			//选中样式
				sEvent:"mouseenter",			//焦点图切换的触发事件
				bAuto:true,					//需要自动切换吗
				iSpeed:3000,				//自动切换的速度
				iNumber:0,					//首先显示的图片编号
				bDrChoose:true,				//是否淡入淡出
				ichangeSpeed:1000,			//渐变速度
				bHover:true,				//是否启动鼠标移入时停止切换
				fnAdditional:""				//追加方法
			}
			o=$.extend({},o,value);
			var iLength=$(o.oSlide).children(o.oSlideChildren).length,	//焦点图个数
				iSlideFloor;											//渐变在底部的图片
			$(o.oSlide).children(o.oSlideChildren).eq(o.iNumber).show().siblings().hide();
			function fnQh(){
				$(o.oSlideList).children(o.oSlideListChildren).eq(o.iNumber).addClass(o.sClass).siblings().removeClass(o.sClass);
				if($(o.oSlide).children(o.oSlideChildren).length>1){
					if(o.bDrChoose){
						function fnInitial(){					//初始化
							$(o.oSlide).children(o.oSlideChildren).eq(o.iNumber).show().siblings().hide();
						}
						function fnOrder(){						//渐变上下级判断
							if(o.iNumber<=0)
							iSlideFloor=iLength-1;
							$(o.oSlideList).children(o.oSlideListChildren).eq(o.iNumber).addClass("current").siblings().removeClass("current");
						}
						function fnSlide(){						//焦点图渐变
							if(o.iNumber>=iLength){
								o.iNumber=0;
							}else{
								iSlideFloor=o.iNumber-1;
							}
							fnOrder();
							$(o.oSlide).children(o.oSlideChildren).eq(iSlideFloor)
							.css("z-index",5).show();
							$(o.oSlide).children(o.oSlideChildren).eq(o.iNumber)
							.css("z-index",10).stop(true,true).fadeIn(o.ichangeSpeed,fnInitial);
						}
						fnSlide();
					}else{
						$(o.oSlide).children(o.oSlideChildren).hide();
						$(o.oSlide).children(o.oSlideChildren).eq(o.iNumber).show();
					}
				}
				if(typeof(o.fnAdditional)=="function")
				o.fnAdditional();
			}
			if(o.bAuto){
				var bTime;
				function fnAuto(){
					o.iNumber++;
					if(o.iNumber>=iLength)
					o.iNumber=0;
					fnQh();
				}; 
				bTime=setInterval(fnAuto,o.iSpeed);
				if(o.bHover){
					$(o.oSlideList).children(o.oSlideListChildren).bind(o.sEvent,function(){
						o.iNumber=$(this).index();
						fnQh();
					})
					.hover(function(){
						clearTimeout(bTime);
					},function(){
						bTime=setInterval(fnAuto,o.iSpeed);
					})
				}
			}else{
				if(typeof(o.fnAdditional)=="function")
				o.fnAdditional();
			}
		}
	});
/*=2 Equal等高*/
	$.extend({
		equal:function(value){
			var objEqual={
				oEqualParent:"#equalHeight",						//等高元素容器(父级)
				oEqualSon:new Array(".layoutSmall",".layoutBig")	//需要匹配高度的元素数组
			}
			objEqual=$.extend({}, objEqual, value);
			var _max=objEqual.oEqualSon[0];
			var _height=parseInt($(objEqual.oEqualParent).find(objEqual.oEqualSon[0]).height());
			for(var i=1,j=objEqual.oEqualSon.length;i<j;i++){
				var _a=parseInt($(objEqual.oEqualParent).find(objEqual.oEqualSon[i]).height());
				if(parseInt($(objEqual.oEqualParent).find(_max).height())<_a){
					_max=objEqual.oEqualSon[i];
				}
			}
			_height=parseInt($(objEqual.oEqualParent).find(_max).height());
			for(var i=0,j=objEqual.oEqualSon.length;i<j;i++){
				$(objEqual.oEqualParent).find(objEqual.oEqualSon[i]).height(_height);
			}
		}
	});
/*=3 Odevity隔行变色*/
	$.extend({
		odevity:function(value){
			var o={
				oOdevity:"#odevity",			//需要匹配元素的容器
				oChange:"tr",					//需要被匹配的元素
				iBase:2,						//基数
				sClass:"odd"					//奇数时的class
			}
			o=$.extend({},o,value);
			var iLength=$(o.oOdevity).find(o.oChange).length;
			for(var i=1;i<=iLength;i++){
				if(i%o.iBase==0){
					$(o.oOdevity).find(o.oChange).eq(i-1).addClass(o.sClass)
				}
			}
		}
	});
/*=4 虚拟placeholder*/
	$.extend({
		occupied:function(value){
			var o={
				oOccupied:"#occupied"		//需要匹配元素的容器
			}
			o=$.extend({},o,value);
			if($.browser.msie&&!($.browser.version == "10.0")){
				function fnOccupied(){
					$(this).val($(this).attr("placeholder"));
					$(this).css("color","#666")
					$(this).focus(function(){
						if($(this).val()==$(this).attr("placeholder")){
							$(this).val("");
							$(this).css("color","");
						}
					});
					$(this).blur(function(){
						if($(this).val()==""){
							$(this).val($(this).attr("placeholder"));
							$(this).css("color","#666");
						}
					});
				}
				$(o.oOccupied).children("input:text").each(fnOccupied);
				$(o.oOccupied).children("input:password").each(function(){
					var _this=$(this);
					var _thisParent=$(this).parent();
					var _placeholder=$(this).attr("placeholder");
					var _class=$(this).attr("class");
					var _passWord;
					$(this).after('<input type="text" placeholder='+_placeholder+' class='+_class+' />');
					_passWord=$(this).next();
					$(this).detach();
					_passWord.val(_placeholder).css("color","#666");
					_passWord.focus(function(){
						$(this).after(_this);
						_passWord.detach();
						_this.focus();
					});
					_this.blur(function(){
						if($(this).val()==""){
							$(this).after(_passWord);;
							_this.detach();
							_passWord.val(_placeholder).css("color","#666")
						}
					});
				});
			}
			if($.browser.version == "10.0" || $.browser.mozilla){
				$(o.oOccupied).children("input[placeholder]").css("color","#666")
				.keydown(function(){
					$(this).css("color","");
				}).blur(function(){
					if($(this).val()==""){
						$(this).css("color","#666");
					}
				});
			}
		}
	});
})(jQuery);