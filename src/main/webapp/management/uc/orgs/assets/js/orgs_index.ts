/// <reference path="../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../platform/resource/ks/ts/ks-ts-all.ts"/>

/// <reference path="../../../domains/uc-domains.ts"/>

module OrganizationIndexApp {
	'use strict'

	class OrgIndexController{

		organization;
		orgs;
		webRoot = window.webRoot;
		static $injects = ['$scope','k','ksCache','ksEntityService']
		constructor(private $scope:ng.IScope,private k,private ksCache,private ksEntityService){
			this.init();
		}

		init(){
			this.bindEvents();
			this.selectEntities();
		}



		selectEntities(){
			var me = this;
			this.ksEntityService.get(window.webRoot + '/management.uc/orgs/allOrganizations.do')
			.success(function(data){
					me.orgs = me.k.convertOrgTreeData(data);
				})

		}

		bindEvents(){
			var me:OrgIndexController = this;

			this.$scope.$on('selectedOrgChange',function(event,msg){
				if(event.targetScope !== event.currentScope){
					me.$scope.$broadcast('selectedRoleChange',msg);
					event.stopPropagation(); // 一定要阻止冒泡，否则会执行多遍
				}
			})
		}
	}

	var app = angular.module('OrganizationIndexApp')
		.controller("OrgIndexController", OrgIndexController)
}