
(function(win){
	
	var sysNav = win.sysNav = {};
	
	/**
	 * @Title: getSelectedNav 
	 * @param:callback,回调函数
	 * @param:navClickHandler 导航菜单单击时的事件
	 * @Description: 查找当前用户的导航菜单，即一级菜单
	 * @return 无
	 * @author nidongsheng 2013-10-7
	 */
	sysNav.initSysNav = function(callback,navClickHandler){
		//查询当前用户的
		uc.ajax({
			cache:false,
			contentType:'json',
			dataType:'json',
			url:basePath+'csp/menu/findSysNavigation/-1.do',
			success:function(data,textStatus,jqXHR){
				var $sysNav = $("#sys-navigation");
				for(var i=0;i<data.length;i++){
					var temp = data[i];
					var li = $("<li class='inline-block ' id="+temp.id+" ><a href='javascript:void(0);'  class=' '>"+temp.name+"</a></li>");
					if(i==0){
						li.addClass(" selected first");
					}
					li.click(function(eventObject){
						$sysNav.children(".inline-block").removeClass("selected first");
						var eventLi = $(eventObject.target).parent(".inline-block");
						eventLi.addClass("selected first");
						
						//调用注册的单击函数事件
						if(navClickHandler){
							navClickHandler.apply(eventLi,[eventLi]);
						}
					});
					li.menuData = temp;
					$sysNav.append(li);
				}
				
				//执行系统菜单查询完成后的回调函数
				if(callback){
					callback.apply({});
				}
			}
		});
	};
	/**
	 * 
	 * @Title: getSelectedNav 
	 * @Description: 获取选中的系统菜单对象 
	 * @return [jqObject],由jquery对象组成的数组
	 * @author nidongsheng 2013-10-7
	 */
	sysNav.getSelectedNavId = function(){
		var selected = $("#sys-navigation").children(".selected");
		if(selected&&selected.length==1){
			return selected[0].id;
		}
		return null;
	};
	
})(window);

