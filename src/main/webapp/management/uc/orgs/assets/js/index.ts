/// <reference path="../../../../../ts-lib/angularjs/angular.d.ts"/>
/// <reference path="../../../../ts-lib/jquery/jquery.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-router.d.ts"/>
/// <reference path="../../../../ts-lib/angular-ui/angular-ui-bootstrap.d.ts"/>

/// <reference path="../../../../platform/resource/ks/ts/ks-ts-all.ts"/>


module OrganizationIndexApp {
	'use strict'

	class IndexController{

		webRoot = window.webRoot;
		static $injects = ['$scope','k']
		constructor(private $scope:ng.IScope,private k){
			this.init();
		}

		init(){
			this.bindEvents();
		}

		bindEvents(){
			var me:IndexController = this;

			this.$scope.$on('selectedOrgChange',function(event,msg){
				if(event.targetScope !== event.currentScope){
					me.$scope.$broadcast('selectedRoleChange',msg);
					event.stopPropagation(); // 一定要阻止冒泡，否则会执行多遍
				}
			})
		}
	}

	var app = angular.module('OrganizationIndexApp', ['ks.all'])
		.controller("IndexController", IndexController)
	app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('index', {
			url: '/',
			templateUrl: window.webRoot + '/management.uc/orgs/tpl_index.html'
		});

		$stateProvider.state('index.editOrg', {
			data:{
				isChanged:false
			},
			url: '/:id',
			onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {

				// 返回查询状态，处理参数
				var backToItems = function(){
					$stateParams.isChanged = $state.current.data.isChanged;
					return $state.transitionTo("index");
				}

				$modal.open({
					backdrop: true,
					templateUrl: window.webRoot + '/management.uc/orgs/tpl_orgs_edit.html',
					size: 'lg'
				}).result.then(function (result) {
						return backToItems();
					}, function (result) {
						return backToItems();
					});
			}]
		});

		$stateProvider.state('index.addStaff', {
			data:{
				isChanged:false
			},
			url: '/addStaff/:roleId',
			onEnter: ['$stateParams', '$state', '$modal', function ($stateParams, $state, $modal) {

				// 返回查询状态，处理参数
				var backToItems = function(){
					$stateParams.isChanged = $state.current.data.isChanged;
					return $state.transitionTo("index");
				}

				$modal.open({
					backdrop: true,
					templateUrl: window.webRoot + '/management.uc/orgs/tpl_orgs_staffs_add.html',
					size: 'lg'
				}).result.then(function (result) {
						return backToItems();
					}, function (result) {
						return backToItems();
					});
			}]
		});


	}]);
}