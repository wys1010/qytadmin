<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String basePath = request.getContextPath();
    request.setAttribute("basePath", basePath);
    request.setAttribute("DEFAULT_TITLE", "清颜堂仓库管理系统");

    String version = com.qyt.management.platform.ResourceVersion.getVersion();
    request.setAttribute("version", version);
%>
<script>

    if(window.attachEvent){
        window.console={
            log:function(){

            }
        }
    }

    window.basePath = window.webRoot = "${basePath}";
    window.serverName = '<%=request.getContextPath()%>';
    window.webRoot = window.rootPath = '<%=request.getContextPath()%>';

    window.version = "${version}";
</script>
<%--less.js 需要在所有less文件引用之前引入--%>

<link rel="icon" href="<%=request.getContextPath()%>/favicon.ico" href="<%=request.getContextPath()%>/favicon.ico" type="image/x-icon">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/favicon.ico" href="<%=request.getContextPath()%>/favicon.ico" type="image/x-icon">

<link href="${basePath}/platform/resource/fa430/css/font-awesome.min.css?version=${version}" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/bootstrap/css/bootstrap.css?version=${version}"/>


<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ks/css/ks.css?version=${version}"/>
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ks/css/ks-dialog.css?version=${version}"/>
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ks/css/ks-operator.css?version=${version}"/>
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ks/css/ks-simple-grid.css?version=${version}"/>
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ks/css/ks-progressbar.css?version=${version}"/>
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ks/css/ks-tree.css?version=${version}"/>
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ks/css/ks-tab.css?version=${version}"/>
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ks/css/ks-form.css?version=${version}"/>
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ks/css/ks-layout.css?version=${version}"/>
<link rel="stylesheet" type="text/css" href="${basePath}/platform/resource/ks/css/crm-common-picker.css?version=${version}"/>

<script type="text/javascript" src="${basePath}/platform/resource/jquery/jquery1.11.1.min.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/jquery/jquery-form.js?version=${version}"></script>

<script type="text/javascript" src="${basePath}/platform/resource/angular/angular1.3.8.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/angular/angular-resource.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/angular/angular-animate.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/angular/angular-ui-router.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/bootstrap/js/ui-bootstrap-tpls-0.12.0.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ts/nk.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ts/ks-base.js?version=${version}"></script>

<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-tip.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-pagination.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-dialog.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-file-upload.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-operator.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-selector.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-entity-service.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ts/ks-directive.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-progress-bar.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-date-picker.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-popup-picker.js?version=${version}"></script>


<script type="text/javascript" src="${basePath}/platform/resource/ks/grid/simple-grid/ks-simple-grid.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-dicts.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-tab.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-simple-tab.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-auto-complete.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-cache.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-category-picker.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-product-picker.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-warehouse-picker.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-organization-picker.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-staff-picker.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-tree.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-tree-picker.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-org-picker.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-all.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-checkbox.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-multi-selector.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-multi-role-selector.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-multi-category-group-selector.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/pickers/ks-multi-district-selector.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ks-form.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/layout/ks-view-port.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/layout/ks-h-box.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/layout/ks-v-box.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/layout/ks-fill-height.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ts/ks-type.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/ts/ks-class.js?version=${version}"></script>

<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-core.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/uc/uc-biz.js?version=${version}"></script>

<script type="text/javascript" src="${basePath}/platform/resource/ks/k.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/k-app.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/k-page.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/ks/k-controller.js?version=${version}"></script>
<script type="text/javascript" src="${basePath}/platform/resource/layer/layer.js?version=${version}"></script>

<title>${DEFAULT_TITLE}</title>
