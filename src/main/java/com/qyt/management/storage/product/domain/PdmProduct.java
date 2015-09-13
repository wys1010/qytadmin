package com.qyt.management.storage.product.domain;

import com.qyt.management.base.BaseEntity;

public class PdmProduct extends BaseEntity {
    private Integer id;

    private String name;

    private String category;

    private String manufacturerName;

    /**
     * 安全库存数量
     */
    private Integer minNumber;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category == null ? null : category.trim();
    }

    public String getManufacturerName() {
        return manufacturerName;
    }

    public void setManufacturerName(String manufacturerName) {
        this.manufacturerName = manufacturerName == null ? null : manufacturerName.trim();
    }

    public Integer getMinNumber() {
        return minNumber;
    }

    public void setMinNumber(Integer minNumber) {
        this.minNumber = minNumber;
    }
}