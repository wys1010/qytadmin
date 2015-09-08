/**
 * ks 缓存模块
 * @author Wangyiqun
 * @date 2015-01-15
 */
(function () {
    var _cache = {};
    angular.module('ks.cache', ['ks'])
        .factory('ksCache', ['$http','$q',function ($http,$q) {

            return {
                get: function(key, url) {

                    var promise = $q(function (resolve, reject) {
                        if (_cache[key]) {
                            resolve(_cache[key]);
                        } else {
                            return $http.get(url).success(function (data) {
                                _cache[key] = data;
                                resolve(data)
                            }).error(function () {
                                reject.apply(this, arguments);
                            })
                        }
                    });
                    return promise;
                },

                // 强制刷新缓存
                refresh: function(key,url){
                    var promise = $q(function (resolve, reject) {
                        return $http.get(url).success(function (data) {
                            _cache[key] = data;
                            resolve(data)
                        }).error(function () {
                            reject.apply(this, arguments);
                        })

                    });
                    return promise;
                }

            }

        }]);
})();