
(function(win){


    $(function(){
        $("#menuToggleBtn").click(function(){
            if($(this).hasClass("fa-angle-double-left")){
                $(this).removeClass("fa-angle-double-left").addClass("fa-angle-double-right");
                $(".menus-wrap").addClass("shrink");
                $(".menus-wrap").animate({
                    width:35
                },'fast')
                $(".workspace").animate({
                    marginLeft:35
                },'fast')
            }else{
                $(this).addClass("fa-angle-double-left").removeClass("fa-angle-double-right");
                $(".menus-wrap").removeClass("shrink");
                $(".menus-wrap").animate({
                    width:140
                },'fast')
                $(".workspace").animate({
                    marginLeft:140
                },'fast')
            }
        })
    })


})(window);

