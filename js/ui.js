//ui-seasrch
$.fn.UiSearh=function(){
	var ui=$(this);
	$('.ui-search-selected').on('click',function(){
		$('.ui-search-select-list').show();
		return false;
	});
	$('.ui-search-select-list a').on('click',function(){
		$('.ui-search-selected').text( $(this).text() );
		$('.ui-search-select-list').hide();
		return false;
	})
	$('body').on('click',function(){
		$('.ui-search-select-list').hide();
	})
}
//ui-tab
$.fn.UiTab=function(header,content,focus_prefix){
	var ui=$(this);
	var tabs=$(header,ui);
	var cons=$(content,ui);
	var focus_prefix=focus_prefix || '';
	tabs.on('click',function(){
		var index=$(this).index();
		tabs.removeClass(focus_prefix +'item_focus').eq(index).addClass(focus_prefix +'item_focus');
		cons.hide().eq(index).show();
		return false;
	})
	
	
}
//ui-slider
$.fn.UiSlider=function(){
	var ui=$(this);
	var wrap=$('.ui-slider-wrap');
	var btn_prev=$('.ui-slider-arrow .left');
	var btn_next=$('.ui-slider-arrow .right');
	var items=$('.ui-slider-wrap .item');
	var tips=$('.ui-slider-process .item');
	//预定义
	var current=0;
	var size=items.size();
	var width=items.eq(0).width();
	var enableAuto=true;
	//设置感应
	ui
	.on('mouseover',function(){
		enableAuto=false;
	})
	.on('mouseout',function(){
		enableAuto=true;
	})
	
	
	//具体操作
	wrap
	.on('move_prev',function(){
		if(current<=0){
			current=size;
		}
		current=current-1;
		wrap.triggerHandler('move_to',current);
	})
	.on('move_next',function(){
		if(current>=size-1){
			current=-1;
		}
		current=current+1;
		wrap.triggerHandler('move_to',current);
		
		
	})
	.on('move_to',function(evt,index){
		wrap.css('left',index*width*-1);
		tips.removeClass('item_focus').eq(index).addClass('item_focus');
	})
	
	
	.on('auto_move',function(){
		setInterval(function(){
			enableAuto&&wrap.triggerHandler('move_next');
		},1500);
	})
	.triggerHandler('auto_move');
	//事件
	btn_prev.on('click',function(){
		wrap.triggerHandler('move_prev');
	});
	btn_next.on('click',function(){
		wrap.triggerHandler('move_next');
	});
	tips.on('click',function(){
		var index=$(this).index();
		wrap.triggerHandler('move_to',index);
	})
	
	
	
	
	
}


//ui-backTop

$.fn.UiBackTop=function(){
	var ui=$(this);
	
	var el=$('<a class="ui-backTop" href="#"></a>');
	
	ui.append(el);
	
	
	
	$(window).on('scroll',function(){
		var top=$(window).scrollTop();
		console.log(top)
		if(top>200){
			el.show();
		}else{
			el.hide();
		}
		
	})
	el.on('click',function(){
		$(window).scrollTop(0);
		el.hide();
	})
	
	
}

//页面的脚本逻辑

$(function(){
	
		$('.ui-search').UiSearh();
	$('.content-tab').UiTab('.caption>.item','.block>.item');
	$('.content-tab .block .item').UiTab('.block-caption>a','.block-content','block-caption-');
	$('.ui-slider').UiSlider();
	$('body').UiBackTop();
});
