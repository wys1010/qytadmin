/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50528
Source Host           : 127.0.0.1:3306
Source Database       : qytstock

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2015-09-13 20:29:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dicts
-- ----------------------------
DROP TABLE IF EXISTS `dicts`;
CREATE TABLE `dicts` (
  `id` varchar(60) NOT NULL COMMENT '编码',
  `name` varchar(60) NOT NULL COMMENT '名称',
  `remark` varchar(300) DEFAULT NULL COMMENT '备注',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `operator_id` int(11) DEFAULT NULL COMMENT '操作人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典表';

-- ----------------------------
-- Records of dicts
-- ----------------------------

-- ----------------------------
-- Table structure for dict_items
-- ----------------------------
DROP TABLE IF EXISTS `dict_items`;
CREATE TABLE `dict_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(60) NOT NULL COMMENT '名称',
  `value` varchar(60) NOT NULL COMMENT '值',
  `dict_id` varchar(60) NOT NULL COMMENT '字典id',
  `remark` varchar(300) DEFAULT NULL COMMENT '备注',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `operator_id` int(11) DEFAULT NULL COMMENT '操作人',
  PRIMARY KEY (`id`),
  KEY `dict_id` (`dict_id`) USING BTREE,
  CONSTRAINT `dict_items_ibfk_1` FOREIGN KEY (`dict_id`) REFERENCES `dicts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典表';

-- ----------------------------
-- Records of dict_items
-- ----------------------------

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL COMMENT '父级Id',
  `permission_id` int(11) DEFAULT NULL COMMENT '关联的权限ID',
  `url` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT '名称',
  `display_order` smallint(6) NOT NULL COMMENT '显示顺序',
  `sub_sys` varchar(25) NOT NULL COMMENT '所属子系统，oss：运营系统',
  PRIMARY KEY (`id`),
  KEY `uc_menus_parent_fk` (`parent_id`) USING BTREE,
  KEY `uc_menus_permissions_fk` (`permission_id`) USING BTREE,
  CONSTRAINT `menus_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `menus` (`id`),
  CONSTRAINT `menus_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=172 DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES ('1', null, null, '', '系统管理', '1', 'oss');
INSERT INTO `menus` VALUES ('3', '1', '3', '/platform/orgs/index.do', '组织机构管理', '2', 'oss');
INSERT INTO `menus` VALUES ('6', '1', '9', '/uc/user/staffs/index.do', '员工管理', '5', 'oss');
INSERT INTO `menus` VALUES ('7', '1', '11', '/uc/privileges/index.do', '权限管理', '6', 'oss');
INSERT INTO `menus` VALUES ('9', '1', '141', '/management/parameters/index.do', '参数管理', '8', 'oss');
INSERT INTO `menus` VALUES ('111', null, null, '', '仓库管理', '4', 'oss');
INSERT INTO `menus` VALUES ('112', '111', '113', '/pdm/warehouses/index.do', '仓库信息', '1', 'oss');
INSERT INTO `menus` VALUES ('130', null, null, '', '产品管理', '1', 'oss');
INSERT INTO `menus` VALUES ('131', '130', '1', '/pdm/products/index.do', '产品信息', '1', 'oss');
INSERT INTO `menus` VALUES ('150', null, '1', '', '库存管理', '1', 'oss');
INSERT INTO `menus` VALUES ('151', '150', '1', '/pdm/stock/index.do', '库存信息', '1', 'oss');
INSERT INTO `menus` VALUES ('152', '150', '1', '/pdm/stock_line/index.do?type=1', '入库', '1', 'oss');
INSERT INTO `menus` VALUES ('153', '150', '1', '/pdm/stock_line/index.do?type=2', '出库', '1', 'oss');
INSERT INTO `menus` VALUES ('170', null, null, '', '订单管理', '1', 'oss');
INSERT INTO `menus` VALUES ('171', '170', '1', '/pdm/orders/index.do', '订单信息', '1', 'oss');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_no` varchar(50) NOT NULL COMMENT '订单编号',
  `stock_id` int(11) NOT NULL COMMENT '库存id',
  `warehouse_id` int(11) NOT NULL COMMENT '仓库id',
  `product_id` int(11) NOT NULL COMMENT '产品id',
  `product_name` varchar(50) DEFAULT NULL COMMENT '产品名称',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '下单数量',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '订单状态(1:新单，2：待发货，3：已发货，4：确认收货)',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `created_at` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='订单表';

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('6', '201509050949011', '16', '106', '2', '消炎贴*20g', '1', '4', null, '2015-09-05 17:49:11', '1', '2015-09-05 17:49:11', '1');
INSERT INTO `orders` VALUES ('7', '201509051020029', '16', '106', '2', '消炎贴*20g', '11', '3', null, '2015-09-05 18:20:29', '1', '2015-09-05 18:20:29', '1');
INSERT INTO `orders` VALUES ('8', '201509051022003', '16', '106', '2', '消炎贴*20g', '11', '3', null, '2015-09-05 18:22:03', '1', '2015-09-05 18:22:03', '1');
INSERT INTO `orders` VALUES ('9', '201509051022041', '16', '106', '2', '消炎贴*20g', '11', '4', null, '2015-09-05 18:22:41', '1', '2015-09-05 18:22:41', '1');
INSERT INTO `orders` VALUES ('10', '201509051026025', '16', '107', '2', '消炎贴*20g', '90', '4', null, '2015-09-05 18:26:25', '1', '2015-09-05 18:26:25', '1');
INSERT INTO `orders` VALUES ('11', '201509051027009', '16', '107', '2', '消炎贴*20g', '11', '4', null, '2015-09-05 18:27:09', '1', '2015-09-05 18:27:09', '1');
INSERT INTO `orders` VALUES ('12', '201509051031036', '16', '108', '2', '消炎贴*20g', '7', '4', null, '2015-09-05 18:31:36', '1', '2015-09-05 18:31:36', '1');
INSERT INTO `orders` VALUES ('13', '201509051057028', '20', '106', '6', '净颜清透紧肤水（肌肤）', '1', '4', null, '2015-09-05 18:57:28', '1', '2015-09-05 18:57:28', '1');
INSERT INTO `orders` VALUES ('14', '201509051440013', '20', '106', '6', '净颜清透紧肤水（肌肤）', '9', '4', null, '2015-09-05 22:40:13', '1', '2015-09-05 22:40:13', '1');

-- ----------------------------
-- Table structure for organizations
-- ----------------------------
DROP TABLE IF EXISTS `organizations`;
CREATE TABLE `organizations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL COMMENT '父机构ID',
  `name` varchar(50) NOT NULL COMMENT '机构名称',
  `code` varchar(25) NOT NULL COMMENT '代码',
  `type` smallint(6) DEFAULT NULL COMMENT '组织机构类型，保留字段',
  `disable` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否禁用，0：否；1：是；',
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `created_by` int(11) NOT NULL COMMENT '创建者，staff_id',
  `updated_by` int(11) NOT NULL COMMENT '修改者，staff_id',
  PRIMARY KEY (`id`),
  KEY `organizations_parent_fk` (`parent_id`) USING BTREE,
  CONSTRAINT `organizations_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `organizations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='组织机构表';

-- ----------------------------
-- Records of organizations
-- ----------------------------
INSERT INTO `organizations` VALUES ('1', null, '清颜堂', '', '1001', '0', '2014-10-23 23:21:48', '2015-08-14 19:21:08', '1', '1');
INSERT INTO `organizations` VALUES ('12', '1', '车陂店', '', null, '0', '2015-04-03 22:24:45', '2015-08-14 19:21:41', '1', '1');
INSERT INTO `organizations` VALUES ('13', '1', '新市店', '', null, '0', '2015-04-03 22:24:55', '2015-08-14 19:21:30', '1', '1');
INSERT INTO `organizations` VALUES ('14', '1', '总店', '', null, '0', '2015-04-03 22:25:05', '2015-08-14 19:21:18', '1', '1');

-- ----------------------------
-- Table structure for parameters
-- ----------------------------
DROP TABLE IF EXISTS `parameters`;
CREATE TABLE `parameters` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) DEFAULT NULL COMMENT '名称',
  `value` varchar(255) DEFAULT NULL COMMENT '值',
  `type` varchar(10) DEFAULT NULL COMMENT '类型',
  `status` int(11) DEFAULT NULL COMMENT '状态',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `created_at` datetime DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime DEFAULT NULL COMMENT '更新时间',
  `operator_id` int(11) DEFAULT NULL COMMENT '操作人id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8 COMMENT='系统参数表';

-- ----------------------------
-- Records of parameters
-- ----------------------------
INSERT INTO `parameters` VALUES ('47', 'STOCK_MIN_WARN', '20', null, '0', '小于此数量就报警', '2015-08-20 17:50:49', '2015-08-21 15:56:01', '1');

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '名称',
  `code` varchar(50) NOT NULL COMMENT '编码',
  `menu` tinyint(1) NOT NULL COMMENT '是否菜单权限，0：否；1：是；',
  `sub_sys` varchar(25) NOT NULL COMMENT '子系统，oss：运营系统',
  `sub_module` varchar(25) NOT NULL COMMENT '子模块',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8 COMMENT='权限表';

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES ('1', '用户查询', 'ROLE_UC_USERS_SELECT', '1', 'oss', '用户管理');
INSERT INTO `permissions` VALUES ('2', '用户管理', 'ROLE_UC_USERS_UPDATE', '0', 'oss', '用户管理');
INSERT INTO `permissions` VALUES ('3', '组织机构查询', 'ROLE_UC_ORGS_SELECT', '1', 'oss', '组织机构管理');
INSERT INTO `permissions` VALUES ('4', '组织机构管理', 'ROLE_UC_ORGS_UPDATE', '0', 'oss', '组织机构管理');
INSERT INTO `permissions` VALUES ('5', '职位查询', 'ROLE_UC_DUTIES_SELECT', '1', 'oss', '职位管理');
INSERT INTO `permissions` VALUES ('6', '职位管理', 'ROLE_UC_DUTIES_UPDATE', '0', 'oss', '职位管理');
INSERT INTO `permissions` VALUES ('7', '岗位查询', 'ROLE_UC_POSTS_SELECT', '1', 'oss', '岗位管理');
INSERT INTO `permissions` VALUES ('8', '岗位管理', 'ROLE_UC_POSTS_UPDATE', '0', 'oss', '岗位管理');
INSERT INTO `permissions` VALUES ('9', '员工查询', 'ROLE_UC_STAFFS_SELECT', '1', 'oss', '员工管理');
INSERT INTO `permissions` VALUES ('10', '员工管理', 'ROLE_UC_STAFFS_UPDATE', '0', 'oss', '员工管理');
INSERT INTO `permissions` VALUES ('11', '权限查询', 'ROLE_UC_ROLES_SELECT', '1', 'oss', '权限管理');
INSERT INTO `permissions` VALUES ('12', '权限管理', 'ROLE_UC_ROLES_UPDATE', '0', 'oss', '权限管理');
INSERT INTO `permissions` VALUES ('13', '字典查询', 'ROLE_UC_DICTS_SELECT', '1', 'oss', '字典管理');
INSERT INTO `permissions` VALUES ('14', '字典管理', 'ROLE_UC_DICTS_UPDATE', '0', 'oss', '字典管理');
INSERT INTO `permissions` VALUES ('15', '系统日志查询', 'ROLE_UC_SYSTEM_LOG_SELECT', '0', 'oss', '字典管理');
INSERT INTO `permissions` VALUES ('16', '缓存管理', 'ROLE_UC_CACHE_MANAGE_SELECT', '1', 'oss', '缓存管理');
INSERT INTO `permissions` VALUES ('17', '刷新缓存', 'ROLE_UC_CACHE_MANAGE_REFRESH', '0', 'oss', '缓存管理');
INSERT INTO `permissions` VALUES ('113', '仓库查询', 'ROLE_UC_WAREHOUSES_SELECT', '1', 'oss', '仓库管理');
INSERT INTO `permissions` VALUES ('114', '仓库编辑', 'ROLE_UC_WAREHOUSES_EDIT', '0', 'oss', '仓库管理');
INSERT INTO `permissions` VALUES ('115', '仓库删除', 'ROLE_UC_WAREHOUSES_DELETE', '0', 'oss', '仓库管理');
INSERT INTO `permissions` VALUES ('141', '系统参数查询', 'ROLE_UC_PARAMETERS_SELECT', '1', 'oss', '系统参数管理');
INSERT INTO `permissions` VALUES ('142', '系统参数管理', 'ROLE_UC_PARAMETERS_UPDATE', '0', 'oss', '系统参数管理');
INSERT INTO `permissions` VALUES ('151', '产品查询', 'ROLE_UC_PRODUCT_SELECT', '1', 'oss', '产品');
INSERT INTO `permissions` VALUES ('152', '产品删除', 'ROLE_UC_PRODUCT_DELETE', '0', 'oss', '产品');
INSERT INTO `permissions` VALUES ('153', '产品编辑', 'ROLE_UC_PRODUCT_EDIT', '0', 'oss', '产品');
INSERT INTO `permissions` VALUES ('170', '库存查询', 'ROLE_UC_STOCK_SELECT', '1', 'oss', '库存');
INSERT INTO `permissions` VALUES ('171', '库存下单', 'ROLE_UC_STOCK_ORDER', '0', 'oss', '库存');
INSERT INTO `permissions` VALUES ('180', '新增入库', 'ROLE_UC_STOCK_LINE_ADD', '0', 'oss', '库存记录');
INSERT INTO `permissions` VALUES ('181', '库存记录删除', 'ROLE_UC_STOCK_LINE_DELETE', '0', 'oss', '库存记录');
INSERT INTO `permissions` VALUES ('200', '订单发货', 'ROLE_UC_ORDER_DELIVERY', '0', 'oss', '订单管理');
INSERT INTO `permissions` VALUES ('201', '订单确认收货', 'ROLE_UC_ORDER_CONFIRM_RECEIPT', '0', 'oss', '订单管理');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '产品名称',
  `category` varchar(255) DEFAULT NULL COMMENT '规格',
  `min_number` int(11) NOT NULL DEFAULT '0' COMMENT '安全库存数量',
  `manufacturer_name` varchar(255) DEFAULT NULL COMMENT '生产商',
  `created_at` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8 COMMENT='产品表';

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('2', '消炎贴*20g', '包', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('3', '祛印无痕修复霜', '20g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('4', '细致毛孔清润乳', '30ml', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('5', '祛痕精华液', '30ml', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('6', '净颜清透紧肤水（肌肤）', '100ml', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('7', '臻白无瑕BB霜（紫色）', '30ml', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('8', '臻白无瑕BB霜（肤色）', '30ml', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('9', '盈润保湿精华乳', '30ml', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('10', ' 祛痘原液', '30ml', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('11', '深层激活焕彩精华', '30ml', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('12', '细胞营养泌肤液', '60ml', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('13', '极致保湿修复水', '60ml', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('14', '男士活性激爽洁面乳', '80g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('15', '控油爽肤洁面乳', '80g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('16', '柔和舒敏洁面乳', '80g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('17', '焕彩修复3件套', '盒', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('18', '细致毛孔5件套', '盒', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('19', 'EGF水凝滋养面膜(舒缓)', '盒', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('20', '卸妆乳', '150g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('21', '净颜清透洁面乳', '100g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('22', '净颜嫩肤去角质啫喱', '100g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('23', '清颜净痘洁面乳（控油）', '100g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('24', '清颜焕新爽肤水（极致）', '100m', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('25', '清颜益肤清爽啫喱（盈润）', '60g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('26', '清颜益肤净痘贴（消炎贴）', '5g*10片', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('27', '清颜舒润蚕丝面膜', '28g*6片', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('28', '美颜亮肤洁面乳', '100g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('29', '美颜亮肤精华乳', '60g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('30', '美颜细嫩无痕（祛痕和深层）', '30m', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('31', '美颜嫩肤蚕丝面膜', '28g*6片', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('32', 'EGF基因修复液', '15ml', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('33', '丝肽胶原新生精华', '30m', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('34', 'HA透明质酸原液', '30m', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('35', '毛孔紧致精华液', '30m', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('36', 'HBOP舒缓修复喷雾（防敏）', '30m', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('37', 'EGF水凝焕容面膜', '28g*6片', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('38', '美颜无痕祛印霜', '30m', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('39', '清颜益肤净痘精华', '30m', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('40', '脱毛修复液', '', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('41', '胶原蛋白精华素', '', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('42', '祛痘包冶护理套（轻度）', '盒', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('43', '祛痘包冶护理套（中度）', '盒', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('44', '祛痘包冶护理套（重度）', '盒', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('45', '祛痘包冶护理套（加强）', '盒', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('46', '美白无痕祛印精确护理套装', '盒', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('47', '痘坑修复精确护理套装', '盒', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('48', '毛孔紧致精确护理套装', '盒', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('49', '极致补水精确护理套装', '盒', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('50', '透明质酸滋润液 150毫升', '150m', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('51', '净颜清新洁面乳(柔和）', '100g', '0', '大研生物技术有限公司', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('53', '透明质酸*3ml', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('54', '胶原蛋白精华素*3ml', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('55', '水活盈肌精华素*3ml', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('56', '麦胚紧肌精华素*3ml', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('57', '果活维C精华素*3ml', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('58', '特敏全效修复精华*3ml', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('59', '维A再生精华*3m1', '盒', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('60', '02传效纯氧原液*3m1', '盒', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('61', '海藻面膜', '', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('63', '进口麻药', '瓶', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('64', '舒缓M', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('66', '微针*2.0mm', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('67', '微针*1.5mm', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('68', '微针*1.0mm', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('69', '微针*0.5mm', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('70', '微针*0.2mm', '支', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('73', '金星金氯消毒液', '瓶', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('74', '三棱针*10支', '包', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('75', '产品袋', '个', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('76', '无纺袋', '个', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('77', 'LK', '瓶', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('78', '领科单', '本', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('79', 'JXC', '瓶', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('80', '庆大', '个', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('81', '冻干粉', '套', '0', '进口', '2015-08-30 16:56:59', '1', '2015-08-30 16:56:59', '1');
INSERT INTO `products` VALUES ('82', 'xxx', '11', '0', '1111', null, '1', null, null);
INSERT INTO `products` VALUES ('83', '123', '123', '0', '1231', '2015-08-31 17:25:09', '1', '2015-08-31 17:25:09', null);
INSERT INTO `products` VALUES ('84', '1111', '111', '10', '111', '2015-09-13 19:01:27', '1', '2015-09-13 19:01:27', null);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '角色名称',
  `code` varchar(30) DEFAULT NULL COMMENT '角色编码，不允许编辑，有值时，代表内置角色。',
  `remark` varchar(200) NOT NULL COMMENT '备注',
  `data_areas` varchar(255) NOT NULL COMMENT '数据权限，英文逗号分割，内容为组织机构ID',
  `sub_sys` varchar(25) NOT NULL COMMENT '子系统，oss：运营系统',
  `created_at` datetime NOT NULL COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `created_by` int(11) NOT NULL COMMENT '创建者staff_id',
  `updated_by` int(11) NOT NULL COMMENT '修改者staff_id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('9', '管理员', '', '', '', 'oss', '2014-11-04 21:23:52', '2014-11-05 10:14:29', '1', '1');
INSERT INTO `roles` VALUES ('10', '分店', '', '', '', '', '2015-08-14 19:22:41', '2015-08-14 19:22:41', '1', '1');

-- ----------------------------
-- Table structure for role_permissions
-- ----------------------------
DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE `role_permissions` (
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `permission_id` int(11) NOT NULL COMMENT '权限ID',
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `role_permissions_permission_fk` (`permission_id`) USING BTREE,
  CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色权限表';

-- ----------------------------
-- Records of role_permissions
-- ----------------------------
INSERT INTO `role_permissions` VALUES ('9', '1');
INSERT INTO `role_permissions` VALUES ('9', '2');
INSERT INTO `role_permissions` VALUES ('9', '3');
INSERT INTO `role_permissions` VALUES ('9', '4');
INSERT INTO `role_permissions` VALUES ('9', '5');
INSERT INTO `role_permissions` VALUES ('9', '6');
INSERT INTO `role_permissions` VALUES ('9', '7');
INSERT INTO `role_permissions` VALUES ('9', '8');
INSERT INTO `role_permissions` VALUES ('9', '9');
INSERT INTO `role_permissions` VALUES ('9', '10');
INSERT INTO `role_permissions` VALUES ('9', '11');
INSERT INTO `role_permissions` VALUES ('9', '12');
INSERT INTO `role_permissions` VALUES ('9', '13');
INSERT INTO `role_permissions` VALUES ('9', '14');
INSERT INTO `role_permissions` VALUES ('9', '15');
INSERT INTO `role_permissions` VALUES ('9', '113');
INSERT INTO `role_permissions` VALUES ('10', '113');
INSERT INTO `role_permissions` VALUES ('9', '114');
INSERT INTO `role_permissions` VALUES ('9', '115');
INSERT INTO `role_permissions` VALUES ('9', '141');
INSERT INTO `role_permissions` VALUES ('9', '142');
INSERT INTO `role_permissions` VALUES ('9', '151');
INSERT INTO `role_permissions` VALUES ('10', '151');
INSERT INTO `role_permissions` VALUES ('9', '152');
INSERT INTO `role_permissions` VALUES ('9', '153');
INSERT INTO `role_permissions` VALUES ('9', '170');
INSERT INTO `role_permissions` VALUES ('9', '171');
INSERT INTO `role_permissions` VALUES ('9', '180');
INSERT INTO `role_permissions` VALUES ('9', '181');
INSERT INTO `role_permissions` VALUES ('9', '200');
INSERT INTO `role_permissions` VALUES ('9', '201');

-- ----------------------------
-- Table structure for staffs
-- ----------------------------
DROP TABLE IF EXISTS `staffs`;
CREATE TABLE `staffs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `org_id` int(11) DEFAULT NULL COMMENT '组织机构ID',
  `login_name` varchar(20) NOT NULL COMMENT '登录用户名',
  `password` varchar(32) NOT NULL COMMENT '密码，md5',
  `name` varchar(60) NOT NULL COMMENT '姓名',
  `english_name` varchar(50) NOT NULL COMMENT '英文名',
  `gender` tinyint(1) NOT NULL COMMENT '性别，1：男；2：女；',
  `disable` tinyint(1) NOT NULL COMMENT '是否禁用，0：否；1：是；',
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `wechat` varchar(100) NOT NULL,
  `qq` varchar(20) NOT NULL,
  `manager` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否管理者，0：否；1：是；\n如果是管理者，自动继承所在部门的数据权限',
  `districts` varchar(25) NOT NULL COMMENT '负责的业务的区域范围，英文逗号分割，区域表district的district_code',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `remark` varchar(255) NOT NULL,
  `purchase_category_groups` varchar(255) NOT NULL COMMENT '负责采购的品种大类列表，英文逗号分隔，category_groups的group_code',
  `sell_category_groups` varchar(255) NOT NULL COMMENT '负责销售的品种大类列表，英文逗号分隔，category_groups的group_code',
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  `created_by` int(11) NOT NULL COMMENT '创建者staff_id',
  `updated_by` int(11) NOT NULL COMMENT '修改者staff_id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_name_UNIQUE` (`login_name`) USING BTREE,
  KEY `staffs_orgs_fk` (`org_id`) USING BTREE,
  CONSTRAINT `staffs_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `organizations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='员工表';

-- ----------------------------
-- Records of staffs
-- ----------------------------
INSERT INTO `staffs` VALUES ('1', '14', 'admin', 'e10adc3949ba59abbe56e057f20f883e', '管理员', '', '2', '0', '', '', '', '', '1', 'DB,HB,HD,HN,XB,XN', '2015-09-13 18:52:54', '', '', '', '2014-10-23 23:21:48', '2015-09-13 18:52:54', '1', '1');
INSERT INTO `staffs` VALUES ('2', '13', 'xsd', '4297f44b13955235245b2497399d7a93', '新市店店长', '', '2', '0', '', '', '', '', '0', '', '2015-08-15 22:56:01', '', '', '', '2015-08-15 10:50:52', '2015-08-15 22:56:01', '1', '2');
INSERT INTO `staffs` VALUES ('3', '12', 'cbd', 'e10adc3949ba59abbe56e057f20f883e', '车陂店店长', '', '2', '0', '', '', '', '', '0', '', '2015-08-15 22:54:22', '', '', '', '2015-08-15 10:51:50', '2015-08-15 22:54:22', '1', '1');

-- ----------------------------
-- Table structure for staff_roles
-- ----------------------------
DROP TABLE IF EXISTS `staff_roles`;
CREATE TABLE `staff_roles` (
  `staff_id` int(11) NOT NULL COMMENT '员工ID',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `data_areas` varchar(255) NOT NULL COMMENT '数据权限，英文逗号分隔，存储组织机构ID',
  PRIMARY KEY (`staff_id`,`role_id`),
  KEY `staff_roles_role_fk` (`role_id`) USING BTREE,
  CONSTRAINT `staff_roles_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `staff_roles_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staffs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='员工角色表';

-- ----------------------------
-- Records of staff_roles
-- ----------------------------
INSERT INTO `staff_roles` VALUES ('1', '9', '');
INSERT INTO `staff_roles` VALUES ('2', '10', '');
INSERT INTO `staff_roles` VALUES ('3', '10', '');

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL COMMENT '产品id',
  `warehouse_id` int(11) NOT NULL COMMENT '仓库id',
  `product_name` varchar(255) DEFAULT NULL COMMENT '产品名称',
  `product_category` varchar(255) DEFAULT NULL COMMENT '产品规格',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '库存数量',
  `created_at` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COMMENT='库存表';

-- ----------------------------
-- Records of stock
-- ----------------------------
INSERT INTO `stock` VALUES ('11', '4', '105', '细致毛孔清润乳', '30ml', '10', '2015-09-05 15:17:47', '1', '2015-09-05 15:17:47', '1');
INSERT INTO `stock` VALUES ('12', '83', '105', '123', '123', '122', '2015-09-05 15:53:35', '1', '2015-09-05 15:54:42', '1');
INSERT INTO `stock` VALUES ('13', '15', '105', '控油爽肤洁面乳', '80g', '97', '2015-09-05 16:15:59', '1', '2015-09-05 16:15:59', '1');
INSERT INTO `stock` VALUES ('14', '11', '107', '深层激活焕彩精华', '30ml', '1111', '2015-09-05 16:26:05', '1', '2015-09-05 16:26:05', '1');
INSERT INTO `stock` VALUES ('15', '83', '106', '123', '123', '800', '2015-09-05 16:42:03', '1', '2015-09-05 16:42:03', '1');
INSERT INTO `stock` VALUES ('16', '2', '105', '消炎贴*20g', '包', '0', '2015-09-05 17:31:26', '1', '2015-09-05 18:32:08', '1');
INSERT INTO `stock` VALUES ('17', '2', '106', '消炎贴*20g', '包', '12', '2015-09-05 18:11:29', '1', '2015-09-05 18:27:56', '1');
INSERT INTO `stock` VALUES ('18', '2', '107', '消炎贴*20g', '包', '101', '2015-09-05 18:27:54', '1', '2015-09-05 18:27:55', '1');
INSERT INTO `stock` VALUES ('19', '2', '108', '消炎贴*20g', '包', '7', '2015-09-05 18:32:08', '1', '2015-09-05 18:32:08', '1');
INSERT INTO `stock` VALUES ('20', '6', '105', '净颜清透紧肤水（肌肤）', '100ml', '101', '2015-09-05 18:55:26', '1', '2015-09-05 23:22:44', '1');
INSERT INTO `stock` VALUES ('21', '6', '106', '净颜清透紧肤水（肌肤）', '100ml', '10', '2015-09-05 23:22:44', '1', '2015-09-05 23:22:44', '1');

-- ----------------------------
-- Table structure for stock_line
-- ----------------------------
DROP TABLE IF EXISTS `stock_line`;
CREATE TABLE `stock_line` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL COMMENT '产品id',
  `stock_id` int(11) DEFAULT NULL COMMENT '库存id',
  `order_id` int(11) DEFAULT NULL COMMENT '订单id',
  `type` int(255) NOT NULL DEFAULT '1' COMMENT '库存类型(1:入库，2：出库)',
  `num` int(11) NOT NULL DEFAULT '0' COMMENT '入库/出库 数量',
  `created_at` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COMMENT='库存记录表';

-- ----------------------------
-- Records of stock_line
-- ----------------------------
INSERT INTO `stock_line` VALUES ('15', '4', '11', null, '1', '100', '2015-09-05 15:17:47', '1', '2015-09-05 15:54:20', '1');
INSERT INTO `stock_line` VALUES ('16', '83', '12', null, '1', '111', '2015-09-05 15:53:35', '1', '2015-09-05 15:53:35', '1');
INSERT INTO `stock_line` VALUES ('17', '83', '12', null, '1', '12', '2015-09-05 15:54:42', '1', '2015-09-05 15:54:42', '1');
INSERT INTO `stock_line` VALUES ('18', '83', '12', '1', '2', '1', '2015-09-05 16:01:57', '1', '2015-09-05 16:01:57', '1');
INSERT INTO `stock_line` VALUES ('19', '15', '13', null, '1', '120', '2015-09-05 16:15:59', '1', '2015-09-05 16:15:59', '1');
INSERT INTO `stock_line` VALUES ('20', '4', '11', '2', '2', '90', '2015-09-05 16:17:36', '1', '2015-09-05 16:17:36', '1');
INSERT INTO `stock_line` VALUES ('21', '11', '14', null, '1', '1111', '2015-09-05 16:26:05', '1', '2015-09-05 16:26:05', '1');
INSERT INTO `stock_line` VALUES ('22', '15', '13', '3', '2', '12', '2015-09-05 16:38:54', '1', '2015-09-05 16:38:54', '1');
INSERT INTO `stock_line` VALUES ('23', '83', '15', null, '1', '800', '2015-09-05 16:42:03', '1', '2015-09-05 16:42:03', '1');
INSERT INTO `stock_line` VALUES ('24', '15', '13', '4', '2', '11', '2015-09-05 16:46:18', '1', '2015-09-05 16:46:18', '1');
INSERT INTO `stock_line` VALUES ('25', '2', '16', null, '1', '120', '2015-09-05 17:31:26', '1', '2015-09-05 17:31:26', '1');
INSERT INTO `stock_line` VALUES ('26', '2', '16', '6', '2', '1', '2015-09-05 18:11:29', '1', '2015-09-05 18:11:29', '1');
INSERT INTO `stock_line` VALUES ('27', '2', '17', '6', '1', '1', '2015-09-05 18:11:29', '1', '2015-09-05 18:11:29', '1');
INSERT INTO `stock_line` VALUES ('28', '2', '16', '11', '2', '11', '2015-09-05 18:27:54', '1', '2015-09-05 18:27:54', '1');
INSERT INTO `stock_line` VALUES ('29', '2', '18', '11', '1', '11', '2015-09-05 18:27:54', '1', '2015-09-05 18:27:54', '1');
INSERT INTO `stock_line` VALUES ('30', '2', '16', '10', '2', '90', '2015-09-05 18:27:55', '1', '2015-09-05 18:27:55', '1');
INSERT INTO `stock_line` VALUES ('31', '2', '18', '10', '1', '90', '2015-09-05 18:27:55', '1', '2015-09-05 18:27:55', '1');
INSERT INTO `stock_line` VALUES ('32', '2', '16', '9', '2', '11', '2015-09-05 18:27:56', '1', '2015-09-05 18:27:56', '1');
INSERT INTO `stock_line` VALUES ('33', '2', '17', '9', '1', '11', '2015-09-05 18:27:56', '1', '2015-09-05 18:27:56', '1');
INSERT INTO `stock_line` VALUES ('34', '2', '16', '12', '2', '7', '2015-09-05 18:32:08', '1', '2015-09-05 18:32:08', '1');
INSERT INTO `stock_line` VALUES ('35', '2', '19', '12', '1', '7', '2015-09-05 18:32:08', '1', '2015-09-05 18:32:08', '1');
INSERT INTO `stock_line` VALUES ('36', '6', '20', null, '1', '111', '2015-09-05 18:55:25', '1', '2015-09-05 18:55:25', '1');
INSERT INTO `stock_line` VALUES ('37', '6', '20', '14', '2', '9', '2015-09-05 23:22:44', '1', '2015-09-05 23:22:44', '1');
INSERT INTO `stock_line` VALUES ('38', '6', '21', '14', '1', '9', '2015-09-05 23:22:44', '1', '2015-09-05 23:22:44', '1');
INSERT INTO `stock_line` VALUES ('39', '6', '20', '13', '2', '1', '2015-09-05 23:22:44', '1', '2015-09-05 23:22:44', '1');
INSERT INTO `stock_line` VALUES ('40', '6', '21', '13', '1', '1', '2015-09-05 23:22:44', '1', '2015-09-05 23:22:44', '1');

-- ----------------------------
-- Table structure for warehouses
-- ----------------------------
DROP TABLE IF EXISTS `warehouses`;
CREATE TABLE `warehouses` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(255) NOT NULL COMMENT '仓库名称',
  `address` varchar(255) DEFAULT NULL COMMENT '仓库地址',
  `attendant` varchar(255) DEFAULT NULL COMMENT '管理员',
  `telphone` varchar(255) DEFAULT NULL COMMENT '管理员联系电话',
  `type` int(11) NOT NULL DEFAULT '1' COMMENT '1:总仓库，2:分店仓库',
  `created_at` datetime DEFAULT NULL COMMENT '创建日期',
  `created_by` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新日期',
  `updated_by` int(11) DEFAULT NULL COMMENT '更新操作人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8 COMMENT='仓库表';

-- ----------------------------
-- Records of warehouses
-- ----------------------------
INSERT INTO `warehouses` VALUES ('105', '总仓库', '车陂', '王彦淞', '18692000920', '1', '2015-09-05 16:28:05', '1', '2015-09-05 17:26:49', null);
INSERT INTO `warehouses` VALUES ('106', '新市仓库', '新市', '龙某', '15241457841', '2', '2015-08-30 17:14:17', '1', '2015-09-05 17:09:37', null);
INSERT INTO `warehouses` VALUES ('107', '番禺仓库', '番禺', '李某', '13114452134', '2', '2015-08-30 17:16:39', '1', '2015-09-05 17:09:37', null);
INSERT INTO `warehouses` VALUES ('108', '石牌桥仓库', '石牌桥', '王某', null, '2', '2015-09-05 14:43:37', '1', '2015-09-05 17:09:37', null);
INSERT INTO `warehouses` VALUES ('109', '1', '1', '1', null, '2', '2015-09-05 17:05:59', '1', '2015-09-05 17:26:51', null);
INSERT INTO `warehouses` VALUES ('110', '12222', '2', '1', '1', '2', '2015-09-05 17:15:01', '1', '2015-09-05 17:15:01', '1');
