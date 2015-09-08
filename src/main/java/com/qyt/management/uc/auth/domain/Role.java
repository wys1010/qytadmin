package com.qyt.management.uc.auth.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * 角色
 * 
 * @author caiwb
 */
public class Role implements Serializable {

	private static final long serialVersionUID = 3767787368114741045L;

	private Integer id;

	/**
	 *
	 */
	private String name;

	private String code;
	
	private String remark;

	private String dataAreas;
	
    private Date createdAt;

    private Date updatedAt;

    private Integer createdBy;
    
    private Integer updatedBy;

    private String createdByName;
    
    private String updatedByName;

	private String subSys;

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
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getDataAreas() {
		return dataAreas;
	}

	public void setDataAreas(String dataAreas) {
		this.dataAreas = dataAreas;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public String getCreatedByName() {
		return createdByName;
	}

	public void setCreatedByName(String createdByName) {
		this.createdByName = createdByName;
	}

	public String getUpdatedByName() {
		return updatedByName;
	}

	public void setUpdatedByName(String updatedByName) {
		this.updatedByName = updatedByName;
	}

	public String getSubSys() {
		return subSys;
	}

	public void setSubSys(String subSys) {
		this.subSys = subSys;
	}
}
