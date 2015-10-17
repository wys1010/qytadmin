package com.qyt.management.storage.warehouse.domain;

import com.qyt.management.base.BaseEntity;

public class Warehouse extends BaseEntity{
    private Integer id;

    private String name;

    private String address;

    private String attendant;

    private String telphone;

    private Integer type;

    private Integer attendantId;


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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getAttendant() {
        return attendant;
    }

    public void setAttendant(String attendant) {
        this.attendant = attendant == null ? null : attendant.trim();
    }

    public String getTelphone() {
        return telphone;
    }

    public void setTelphone(String telphone) {
        this.telphone = telphone == null ? null : telphone.trim();
    }


    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getAttendantId() {
        return attendantId;
    }

    public void setAttendantId(Integer attendantId) {
        this.attendantId = attendantId;
    }
}