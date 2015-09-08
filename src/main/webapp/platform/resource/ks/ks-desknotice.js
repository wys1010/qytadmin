/**
 * ks 桌面通知
 * @author houwl
 * @date 2015.2.4
 */
(function () {
    angular.module('ks.desknotice', [])
        .factory('ksDesknotice', ["k", function (ks) {



            // 初始化弹窗对象
            var Notification = (window.Notification || window.mozNotification || window.webkitNotification);

            /**
             * 判断是否可以弹窗
             * @returns {Boolean}
             */
              var isSupport =function(){
                var ucNotice = uc.DeskNotice;
                if(!ucNotice.Notification){
                    return false;
                }

                if (ucNotice.Notification.permission == "granted") {// 有权限
                    return true;
                } else if (ucNotice.Notification.permission == "denied") {// 无权限
                    ucNotice.Notification.requestPermission();// 获取权限
                }
                // test again
                if (ucNotice.Notification.permission == "granted") {// 有权限
                    return true;
                }
            };

            /**
             * 显示消息
             * @param config
             * @returns {Boolean}
             */
            var show=function(config) {
                var cfg = $.extend({
                    title : "消息提醒",
                    msg : "",
                    onclick : null,
                    image : null,
                    outtime : null,
                    onerror: null,
                    onshow:null,
                    onclose:null
                }, config, true);


                if (!uc.DeskNotice.isSupport()) {
                    alert("您的浏览器不支持弹窗。")
                    return ;
                }

                var dialog = new uc.DeskNotice.Notification(cfg.title, {
                    body : cfg.msg,
                    icon : cfg.image,
                });

                if (cfg.onclick && $.isFunction(cfg.onclick)) {
                    dialog.onclick = cfg.onclick;
                }

                if (cfg.onerror && $.isFunction(cfg.onerror)) {
                    dialog.onerror = cfg.onerror;
                }


                if(cfg.outtime){
                    var timeout = setTimeout(function() {
                        dialog.close();
                        clearTimeout(timeout);
                    }, cfg.outtimer);
                }

                if(cfg.onshow && $.isFunction(cfg.onshow)){
                    dialog.onshow = cfg.onshow;
                }
                if(cfg.onclose && $.isFunction(cfg.onclose)){
                    dialog.onclose = cfg.onclose;
                }
            }

        }]);
})();