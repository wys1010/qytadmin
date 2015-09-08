/**
 * ks 图片上传预览组件，支持拖拽，复制黏贴
 * @author Wangyiqun
 * @date 2014-12-29
 */
(function () {
    angular.module('ks.imgUpload', ['ks'])
        .directive('ksImgUpload',['ksTip',function (ksTip)  {


            return {
                scope: {
                    uploadBtn:'=?',//控制是否组件上传图片，因为有些时候要根据主单是否存在决定是否显示上传按钮，因此用=
                    uploadUrl:'=?',//图片上传url
                    deleteBtn:'=?',// 删除图片按钮
                    deleteUrl:'=?',// 删除图片url
                    imgData: "=?",
                    editable:'=?',
                    src:'=?',
                    loaded:'=?',
                    imgHeight:'@',
                    imgWidth:'@'
                },
                restrict: 'E',
                templateUrl: window.webRoot + '/platform/resource/ks/img_upload/tpl_img_upload.html?version=' + window.version,
                link: function ($scope, element, attrs) {

                    var me = $scope;
                    $.extend(me, {
                        imgs: [],
                        init: function () {

                            if(!me.imgHeight){
                                me.imgHeight = 150;
                            }

                            if(!me.imgWidth){
                                me.imgWidth = 150;
                            }


                            setTimeout(function () {
                                me.bindEvents();
                            }, 0)
                        },


                        pasteIntoTextArea: function (event, ele) {
                            var clipboardData = event.clipboardData;
                            for (var i = 0; i < clipboardData.items.length; i++) {
                                var item = clipboardData.items[i];
                                if (item.kind == 'file' && item.type.match(/^image\//i)) {
                                    var blob = item.getAsFile(), reader = new FileReader();
                                    reader.onload = function (e) {
                                        $(ele).find(".result-img").attr("src", e.target.result);
                                        me.loaded = true;
                                        me.$digest();
                                        me.$parent.$digest();
                                    }
                                    reader.readAsDataURL(blob);
                                    console.log("paste:",blob)

                                    me.loaded = true;
                                    me.imgData=blob;
                                    me.changing = false;
                                }
                            }
                        },

                        handleDrop: function (e, ele) {
                            e.stopPropagation();
                            e.preventDefault();

                            var fileList = e.dataTransfer.files,//获取拖拽文件
                                reader = new FileReader();
                            if(fileList[0].type.indexOf("image")==-1){
                                return;
                            }

                            reader.onload = function (e) {
                                console.log("loading----->")
                                $(ele).find(".result-img").attr("src", this.result);
                                me.loaded = true;
                                me.imgData = fileList[0]
                                me.changing = false;
                                me.$digest();
                                me.$parent.$digest();
                            }
                            reader.readAsDataURL(fileList[0]);

                        },

                        handleImg:function(ele,blob){

                        },

                        forbidDragImg:function(target){
                            var ele = $(target)[0];
                            ele.addEventListener("dragenter", function (e) {
                                e.stopPropagation();
                                e.preventDefault();
                            }, false);

                            ele.addEventListener('dragover', function (e) {
                                e.stopPropagation();
                                e.preventDefault();
                            }, false);

                            ele.addEventListener('drop', function (e) {
                                e.stopPropagation();
                                e.preventDefault();
                            }, false);
                        },


                        bindEvents: function () {




                            //me.$watch("src",function(){
                            //    if(me.src){
                            //        $(element).find("img").attr("src",me.src);
                            //        setTimeout(function(){
                            //           me.$digest();
                            //        },0);
                            //    }
                            //})

                            me.forbidDragImg(document.body);
                            $(element).find(".ks-image-pane").each(function (index, ele) {

                                //处理样式变化
                                ele.addEventListener("dragenter", function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    if(!me.editable){
                                        return;
                                    }
                                    $(e.currentTarget).addClass("dragging");

                                }, false);

                                ele.addEventListener("dragleave", function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    if(!me.editable){
                                        return;
                                    }
                                    $(e.currentTarget).removeClass("dragging");

                                }, false);

                                ele.addEventListener('dragover', function (e) {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    if(!me.editable){
                                        return;
                                    }
                                }, false);

                                ele.addEventListener('drop', function (e) {

                                    e.stopPropagation();
                                    e.preventDefault();
                                    if(!me.editable){
                                        return;
                                    }
                                    $(e.currentTarget).removeClass("dragging");
                                }, false);

                                // 多拽地址后处理图片
                                ele.addEventListener('drop', (function(index,ele){
                                    if(!me.editable){
                                        return;
                                    }
                                    return function (event) {
                                        console.log("drop----->",index)
                                        me.handleDrop(event, ele);
                                    }
                                })(index,ele), false);


                                // 黏贴事件，处理图片
                                ele.addEventListener('paste', (function (index, ele) {
                                    if(!me.editable){
                                        return;
                                    }
                                    return function (event) {
                                        me.pasteIntoTextArea(event, ele);
                                    }

                                })(index, ele),false);
                            })

                        },

                        viewZoom:function(){
                            window.open(me.src)
                        },
                        cancelChange:function(){
                            me.changing = false;
                        },
                        changeImg:function(){
                            me.changing = true;
                        },
                        uploadData:function(){
                        }
                    }, true);

                    me.init();

                }

            }
        }]);
})();