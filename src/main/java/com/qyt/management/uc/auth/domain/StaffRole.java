package com.qyt.management.uc.auth.domain;

import java.io.Serializable;

/**
 * 员工角色
 * 
 * @author caiwb
 */
public class StaffRole implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1778862487128130645L;

	private Integer staffId;

    private Integer roleId;

    private String dataAreas;
    
	public Integer getStaffId() {
		return staffId;
	}

	public void setStaffId(Integer staffId) {
		this.staffId = staffId;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public String getDataAreas() {
		return dataAreas;
	}

	public void setDataAreas(String dataAreas) {
		this.dataAreas = dataAreas;
	}
   
}
