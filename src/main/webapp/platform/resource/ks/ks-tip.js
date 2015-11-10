/**
 * ks 提示
 * @author Wangyiqun
 * @date 2015-01-20
 */
(function () {
    angular.module('ks.tip', ['ks'])
        .factory('ksTip', ["k",'$q', function (ks,$q) {

            var timeouts = {
                alert: 3000,
                success: 1500,
                msg: 1500
            }

            var tip = function (msg, type) {
                var $msg = $("<div class='ks-tip " + type + "'>" + msg + "</div>").appendTo(document.body);
                $msg.css({left: (ks.getWinWidth() - $msg.width()) / 2})
                $msg.animate({
                    top: 50
                }, 'fast', function () {
                    $msg.click(function () {
                        $msg.remove();
                    })
                    if (type != "error") {
                        setTimeout(function () {
                            $msg.remove();
                        }, timeouts[type])

                    } else {

                    }

                })
            };

            return {
                /**
                 * 成功提示
                 * @param msg
                 */
                success: function (msg) {
                    window.layer.msg('<span style="font-weight: bold">' + msg + '</span>', {icon: 1,time: 1000});
                    //tip(msg, "success");
                },
                /**
                 * 错误提示
                 * @param msg
                 */
                error: function (msg) {
                    window.layer.msg('<span style="font-weight: bold;">' + msg + '</span>', {icon: 2,time: 3000});
                    //tip(msg, "error");
                },
                /**
                 * 普通消息
                 * @param msg
                 */
                msg: function (msg) {
                    window.layer.msg('<span style="font-weight: bold">' + msg + '</span>', {icon: 6,time: 2000});
                    //tip(msg, "msg");
                },
                /**
                 * 警告
                 * @param msg
                 */
                alert: function (msg) {
                    window.layer.msg('<span style="font-weight: bold">' + msg + '</span>', {icon: 7,time: 2000});
                    //tip(msg, "alert");
                },

                confirm:function(msg){
                    var okFun = null;
                    var cancelFun = null;
                    var deferred = $q.defer();
                    var promise = deferred.promise;

                    layer.confirm(msg, {icon: 3, title:'提示',shift:-1}, function(index){
                        if(okFun && angular.isFunction(okFun)){
                            okFun.call();
                        }
                        layer.close(index);
                    });

                    promise.ok = function(fn){
                        okFun = fn;
                        return promise;
                    }

                    promise.cancel = function(fn){
                        cancelFun = fn;
                        return promise;
                    }

                    return promise;

                    //var deferred = $q.defer();
                    //
                    //var okFun = null;
                    //var cancelFun = null;
                    //var promise = deferred.promise;
                    //var $mask = $('<div class="ks-dialog-mask"></div>').appendTo(document.body).fadeTo(0,.3);
                    //var $dlg = $('<div class="ks-confirm-dlg"></div>').appendTo(document.body);
                    //var $content = $('<div class="ks-confirm-dlg-content"></div>').appendTo($dlg);
                    //$content.text(msg);
                    //var $toolbar = $('<div class="ks-confirm-toolbar"></div>').appendTo($dlg);
                    //var $okBtn = $('<button class="btn btn-sm btn-danger ks-confirm-ok">确认</button>').appendTo($toolbar);
                    //var $cancelBtn = $('<button class="btn btn-sm btn-default ks-confirm-cancel">取消</button>').appendTo($toolbar);
                    //
                    //$mask.show();
                    //$mask.width(ks.getWinWidth())
                    //$mask.height(ks.getWinHeight());
                    //$dlg.width(450);
                    //$dlg.css({
                    //    left: (ks.getWinWidth() - 450) / 2,
                    //    top:(ks.getWinHeight() - 200) / 2
                    //})
                    //$okBtn.click(function(){
                    //    deferred.resolve();
                    //    if(okFun && angular.isFunction(okFun)){
                    //        okFun.call();
                    //    }
                    //
                    //    $mask.remove();
                    //    $dlg.remove();
                    //});
                    //
                    //$cancelBtn.click(function(){
                    //    deferred.reject();
                    //    if(cancelFun && angular.isFunction(cancelFun)){
                    //        cancelFun.call();
                    //    }
                    //
                    //    $mask.remove();
                    //    $dlg.remove();
                    //})
                    //
                    //promise.ok = function(fn){
                    //    okFun = fn;
                    //    return promise;
                    //}
                    //
                    //promise.cancel = function(fn){
                    //    cancelFun = fn;
                    //    return promise;
                    //}
                    //
                    //return promise;

                },
                prompt:function(msg){
                    var deferred = $q.defer();

                    var okFun = null;
                    var cancelFun = null;
                    var promise = deferred.promise;
                    var $mask = $('<div class="ks-dialog-mask"></div>').appendTo(document.body).fadeTo(0,.3);
                    var $dlg = $('<div class="ks-confirm-dlg"></div>').appendTo(document.body);
                    var $content = $('<div class="ks-prompt-dlg-content"></div>').appendTo($dlg);
                    var $tip =$('<div class="ks-confirm-dlg-content-tip"></div>').appendTo($content);
                    $tip.text(msg);
                    var $inputWrap = $('<div class="ks-prompt-input-wrap"></div>').appendTo($content);
                    var $input = $('<input type="text" class="ks-prompt-input form-control input-sm" />').appendTo($inputWrap);
                    var $toolbar = $('<div class="ks-confirm-toolbar"></div>').appendTo($dlg);
                    var $okBtn = $('<button class="btn btn-sm btn-danger ks-confirm-ok">确认</button>').appendTo($toolbar);
                    var $cancelBtn = $('<button class="btn btn-sm btn-default ks-confirm-cancel">取消</button>').appendTo($toolbar);

                    $mask.show();
                    $mask.width(ks.getWinWidth())
                    $mask.height(ks.getWinHeight());
                    $dlg.width(450);
                    $dlg.css({
                        left: (ks.getWinWidth() - 450) / 2,
                        top:(ks.getWinHeight() - 200) / 2
                    })
                    $okBtn.click(function(){
                        deferred.resolve();
                        if(okFun && angular.isFunction(okFun)){
                            var result = okFun.call(null,$input.val());
                            if(result === false){
                                return;
                            }
                        }

                        $mask.remove();
                        $dlg.remove();
                    });

                    $cancelBtn.click(function(){
                        deferred.reject();
                        if(cancelFun && angular.isFunction(cancelFun)){
                            cancelFun.call();
                        }

                        $mask.remove();
                        $dlg.remove();
                    })

                    promise.ok = function(fn){
                        okFun = fn;
                        return promise;
                    }

                    promise.cancel = function(fn){
                        cancelFun = fn;
                        return promise;
                    }

                    return promise;

                }
            }

        }]);
})();