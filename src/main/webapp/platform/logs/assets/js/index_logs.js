/**
 * @author Wangyiqun
 * @date 2014-07-15
 */


(function (global) {

    var IndexModule = uc.Module.extend({

        /**
         * 创建组件
         */
        createCmps: function () {
            var self = this;
            self.createGrid();


            self.qStatusRadio = new uc.Radios({
                id: "qStatusWrap",
                values: [-1, 0, 1],
                labels: ["全部", "ERROR", "INFO"]
            });
        },

        /**
         * 调整高度
         */
        resizeWks: function () {
            // 调整主表宽高
            this.grid.set("width", uc.getWinWidth());
            this.grid.set("height", uc.getWinHeight() - uc.getElementsHeight(["queryArea"  , "gridHeader"]) - 25);
        },

        /**
         * 创建表格
         */
        createGrid: function () {
            var self = this;
            // 主表初始化
            var Grid = BUI.Grid,
                Store = BUI.Data.Store,
                cols = [
                    { title: 'logId', width: 100, sortable: false, dataIndex: 'logId', visible: false},
                    { title: '时间', width: 120, sortable: true, dataIndex: 'createdAt',renderer:function(data){
                        return BUI.Date.format(new Date(data), "mm-dd HH:MM");
                    }},
                    { title: '日志级别', width: 60, sortable: true, dataIndex: 'logLevel', visible: true,renderer:function(data){
                        var color = "green";
                        if(data == "ERROR"){
                            color = "red"
                        }
                        return "<span style='color:"+color+"'>" + data + "</div>";
                    }},

                    { title: '业务', width: 120, sortable: true, dataIndex: 'action'},
                    { title: '访问路径', width: 120, sortable: true, dataIndex: 'path',renderer:function(data){
                        return "<div style='height:30px;overflow: hidden;' class='ellipsis' title='"+data+"'>" + data + "</div>";
                    }},
//                    { title: '类名', width: 120, sortable: true, dataIndex: 'className'},
//                    { title: '方法名', width: 120, sortable: true, dataIndex: 'method'},
//                    { title: '行号', width: 120, sortable: true, dataIndex: 'line'},
                    { title: '信息', width: 120, sortable: true, dataIndex: 'msg',renderer:function(data){
                        return "<div style='height:30px;overflow: hidden;' class='ellipsis' title='"+data+"'>" + data + "</div>";
                    }},
                    { title: '请求动作', width: 120, sortable: true, dataIndex: 'requestType'},
                    { title: '登录用户', width: 120, sortable: true, dataIndex: 'currUserPassport'},
                    { title: 'ip地址', width: 120, sortable: true, dataIndex: 'ip'},
                    {title: '结果', width: 50, fixed: true, sortable: false, dataIndex: 'result',renderer:function(data){
                        var color = "green";
                        if(data == "ERROR"){
                            color = "red"
                        }
                        return "<span style='color:"+color+"'>" + data + "</div>";
                    }}
                ];

            var cascade = new Grid.Plugins.Cascade({
                renderer : function(record){
                    var color = "green",line = "";
                    if(record.result == "ERROR"){
                        color = "red";
                        line = record.line;
                    }
                    return '<div style="padding: 10px 20px;"><h2>详情信息</h2><p style="color:'+color+'">'+ line+'</p><p style="color:'+color+'">' + record.msg + '</p></div>';
                }
            });

            self.store = new Store({
                url: self.baseRestUrl + ".do",
                remoteSort: true,
                pageSize: 20
            });

            self.grid = new Grid.Grid({
                idField: "logId",
                id: "logsGrid",
                render: '#logsGrid',
                innerBorder: false,
                loadMask: true,
                forceFit: true,
                itemStatusFields: {selected: 'selected'},
                columns: cols,
                plugins:[cascade],
                height: self.getGridHeight(),
                store: self.store,
                bbar: {
                    pagingBar: true
                },
                emptyDataTpl: uc.final.EMPTY_DATA_TIP

            });
            self.grid.render();

        },

        /**
         * 查询
         */
        selectEntities: function () {
            var self = this;
            var store = this.grid.getAttrVals().store;
            store.get('proxy').set('url', self.baseRestUrl + ".do");

            var param = {};
            var status = self.qStatusRadio.getValue();
            if(status === 0){
                param.logLevel = "ERROR";
            }else if(status == 1){
                param.logLevel = "INFO";
            }else{
                param.logLevel = null;
            }

            //重置导航栏
            param.start = 0;
            param.pageIndex = 0;
            
            store.load(param, function (event) {
                if (event.exception) {
                    return;
                }

            });
        },

        /**
         * 重置表单
         */
        resetForm: function () {
            $("#q_name").val("");
            self.statusRadio.setValue(-1);
        },

        /**
         * 获取编辑模块
         */
        getEditModule: function () {
            return uc.Module.getModuleByName("org.uc.logs.edit");
        },

        /**
         * 操作列点击
         */
        gridCellClickHandler: function (event) {
            var self = this;
            // 操作列点击，进入相应的操作
//            if (event.field == "_operation") {
//                var operationType = uc.bui.grid.getOperation(event);
//                if (operationType) {
//                    switch (operationType) {
//                        case uc.bui.grid.OperationEnum.EDIT:
//
//                            self.getEditModule().editEntity(event.record.id);
//                            break;
//                        case uc.bui.grid.OperationEnum.DELETE:
//                            self.deleteEntity(event.record.id)
//                            break;
//                        default :
//                            return;
//                    }
//                }
//            }
        },

        /**
         * 计算表格高度
         */
        getGridHeight: function () {
            return uc.getWinHeight() - uc.getElementsHeight(["queryArea"  , "gridHeader"]) - 23
        },

        /**
         * 绑定事件
         */
        bindEvents: function () {
            var self = this;

            // 自适应
            $(window).resize(function () {
                self.resizeWks();
            });


            // 查询
            $("#btnSearch").click(function () {
                self.selectEntities();
                return false;
            });

            // 充值查询区
            $("#btnReset").click(function () {
                self.resetForm();
                return false;
            });

            // 打开新增界面
            $("#btnInsert").click(function () {
                self.getEditModule().addEntity();
            });

            // 表格数据加载事件
            self.store.on("load", function (data) {
                console.log("load:", data);
                var rows = data.rows;
                var rowDataFirst = self.store.findByIndex(0)

            });

//            // 主表双击事件
//            self.grid.on("itemdblclick", function (event) {
//                var dict = event.item;
//                self.getEditModule().editEntity(event.item.id);
//            })
//
//            // 单元格点击
//            self.grid.on("cellclick", function (event) {
//                self.gridCellClickHandler.call(self, event);
//            });

            // 异常
            self.grid.getAttrVals().store.on("exception", function (event) {
                uc.buiAjaxErrorHandler(event);
            });

        },


        /**
         * 初始化变量
         */
        initVars: function () {
            var self = this;
            self.baseRestUrl = basePath + "/platform/logs";
        },

        /**
         * ready
         */
        ready: function () {
            // 初始化变量
            this.initVars();

            // 创建组件
            this.createCmps();

            // 绑定事件
            this.bindEvents();

            // 加载完毕之后默认查询
            this.selectEntities();
        }
    });


    new IndexModule({
        name: "org.uc.logs.index",
        containerId: "logsIndexModule"
    });


})(window);
