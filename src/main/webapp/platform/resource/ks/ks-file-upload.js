/**
 * ks 缓存模块
 * @author Wangyiqun
 * @date 2015-01-15
 */
(function () {
    angular.module('ks.fileUpload', ['ks'])
        .directive('ksFileUpload', function () {
            return {
                scope:{
                    fileType:"=",
                    maxSize:"&",
                    fileSize:"=",
                    fileName:"=",
                    typeError:"=",
                    overSizeError:"=",
                    required:"&",
                    ksName:"&"
                },
                restrict: 'E',
                replace:true,
                template:'<div><input class="file"  style="height:30px;line-height: 30px;width: 100%" type="file" /></div>',
                link: function(scope, element, attrs){

                    if(scope.required){
                        $(element).find(".file").attr("required","required");

                    }
                    $(element).find(".file").attr("name",attrs.ksName);


                    $(element).find(".file").change(function(file){
                        var files = this.files;
                        if(files.length > 0){
                            var file = files[0];
                            scope.fileName = file.name;
                            scope.fileSize = file.size;
                            if(!eval(scope.fileType).test(file.name)){
                                scope.typeError = true;
                            }else{
                                scope.typeError = false;
                            }
                            if(file.size > attrs.maxSize){
                                scope.overSizeError = true;
                            }else{
                                scope.overSizeError = false;
                            }

                            scope.$root.$digest();
                        }
                    });
                }
        }});

})();