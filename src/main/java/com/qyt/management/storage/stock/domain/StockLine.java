package com.qyt.management.storage.stock.domain;

import com.qyt.management.base.BaseEntity;

import java.util.Date;

public class StockLine extends BaseEntity {
    private Integer id;

    private Integer productId;

    private Integer stockId;

    private Integer orderId;

    private Integer type;

    private String productName;

    private Integer num;

    private Integer warehouseId;

    //总仓库id
    private Integer allWarehouseId;

    private String createdByName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getStockId() {
        return stockId;
    }

    public void setStockId(Integer stockId) {
        this.stockId = stockId;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public Integer getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Integer warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getCreatedByName() {
        return createdByName;
    }

    public void setCreatedByName(String createdByName) {
        this.createdByName = createdByName;
    }

    public Integer getAllWarehouseId() {
        return allWarehouseId;
    }

    public void setAllWarehouseId(Integer allWarehouseId) {
        this.allWarehouseId = allWarehouseId;
    }
}