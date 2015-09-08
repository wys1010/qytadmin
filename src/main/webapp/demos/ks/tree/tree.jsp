<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <jsp:include page="${basePath}/platform/resource/ksresource.jsp"></jsp:include>
    <link rel="stylesheet" type="text/css" href="${basePath}/demos/ks/tree/assets/css/tree.css?version=${version}"/>
    <script type="text/javascript" src="${basePath}/demos/ks/tree/assets/js/tree.js?version=${version}"></script>
</head>
<body>

<%--app--%>
<div ng-app="DemoApp">

    <div ng-controller="CommonController as ctrl">
        <%--sample 1--%>
        <div class="clearfix sample-panel">
            <h1>sample 1.</h1>
            <div class="tree-wrap clearfix" >
            <ks-tree children-field="children" id-field="id" text-field="text" data-type="hierarchy" data="ctrl.treeData"
                     width="300" height="500" expand-all="true" checkable="true" on-selected="ctrl.onTreeNodeSelected()"  selected-item="ctrl.selectedItem" checked-items="ctrl.checkedItems" checked-ids="ctrl.checkedIds"></ks-tree>
            </div>
            <div class="result-panel clearfix" style="width:400px;height:700px;overflow: auto;margin:0 10px;word-break: break-all;word-wrap: break-word;">
                <div>
                    <button ng-click="ctrl.clearSelectedItem()">清空选中</button>
                    <button ng-click="ctrl.clearCheckedItems()">清空勾选项</button>
                    <button ng-click="ctrl.refreshData()">刷新数据</button>
                </div>
                <div>
                    <label>选中项</label>
                    <label>{{ctrl.selectedItem.text}}</label>
                </div>
                <hr/>
                <div>
                    <label>勾选项</label>
                    <div>ids:{{ctrl.checkedIds}}</div>
                   <ul>
                       <li ng-repeat="item in ctrl.checkedItems">{{item.text}}</li>
                   </ul>
                </div>
                <hr/>
                <h2>选中id:{{ctrl.selectedId}}</h2>
                <input ng-model="ctrl.selectedId"/>
                <ks-tree-picker data="ctrl.treeData2" ng-model='ctrl.selectedId' selected-item="ctrl.selectedItem"></ks-tree-picker>
            </div>

            <div class="tree-wrap clearfix" >
                <ks-tree children-field="children" id-field="id" text-field="text" data-type="hierarchy" data="ctrl.treeData2"
                         width="300" height="500" expand-all="true" checkable="true"   selected-item="ctrl.selectedItem2" checked-items="ctrl.checkedItems" checked-ids="ctrl.checkedIds"></ks-tree>
            </div>
        </div>


            <%--sample2--%>
        <div class="clearfix sample-panel">
            <h1>sample 2.</h1>
            <div class="tree-wrap clearfix" >
                 <ks-tree children-field="children" id-field="id" text-field="text" data-type="hierarchy" data="ctrl.treeData2"
                     width="300" height="500" expand-all="true" checkable="false" selected-item="ctrl.selectedItem2"></ks-tree>
            </div>
            <div class="result-panel clearfix">
                <div>
                    <label>选中项</label>
                    <label>{{ctrl.selectedItem2.text}}</label>
                </div>
            </div>
        </div>

    </div>
</div>
</body>
</html>
