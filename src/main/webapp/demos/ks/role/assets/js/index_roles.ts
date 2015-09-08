/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

/// <reference path="../../../../../uc/domains/uc-domains.ts"/>

module RoleIndexApp {
    'use strict'

     export class IndexController extends ks.Controller{

        constructor(private $scope,private k){
            super();
        }

        autoFit(){
            var winHeight = this.k.getWinHeight() - 20;
            $("#staffsPermissionsWrap").height(winHeight);
            $("#rolesWrap").height(winHeight);

            $("#rolesGrid").height(winHeight - 90 );
            var staffsGridWrapHeight = winHeight - 85;
            $("#staffsGridWrap").height(staffsGridWrapHeight)
            $("#staffsGrid").height( staffsGridWrapHeight - 40 );
            $("#rolesGrid .body").height(winHeight - 125);
            $("#staffsGrid .body").height(staffsGridWrapHeight - 80);
            $("#permissionTreeWrap").height(winHeight - 125);

        }


        bindEvents(){
            var me = this;
            this.autoFit();
            setTimeout(function(){
                me.autoFit();
            },1000)
            setTimeout(function(){
                me.autoFit();
            },2000)
            $(window).resize(function(){
                me.autoFit();
            });
        }
    }

}
