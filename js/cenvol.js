$( document ).delegate( "#page", "pagecreate", function() {
	$("#newsList>li").click(function(){
		window.location=$(this).find("a").attr("href");
	});
	$.tab({
		oTab:"#tab .tab",					//tab选项卡的容器（父级）
		sTabChildren:"a",				//tab选项卡
		oTabMain:"#tab",			//tab内容区的容器（父级）
		sTabMainChildren:".tabMain"			//tab内容区
	});
});
													/*侧栏滑动显示隐藏*/
$(document ).on( "swipeleft swiperight", "#page", function( e ) {
	if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
		if ( e.type === "swiperight"  ) {
			$( "#mypanel" ).panel( "open" );
		} 
	}
});