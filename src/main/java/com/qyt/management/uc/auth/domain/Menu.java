package com.qyt.management.uc.auth.domain;

import java.io.Serializable;

/**
 * 菜单
 * 
 * @author caiwb
 */
public class Menu  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2074564719437194545L;

	private Integer id;

	private Integer parentId;
	
	private Integer permissionId;

	private String name;

	private String url;

	private Integer displayOrder;

    private String subSys;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public Integer getPermissionId() {
		return permissionId;
	}

	public void setPermissionId(Integer permissionId) {
		this.permissionId = permissionId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getDisplayOrder() {
		return displayOrder;
	}

	public void setDisplayOrder(Integer displayOrder) {
		this.displayOrder = displayOrder;
	}

	public String getSubSys() {
		return subSys;
	}

	public void setSubSys(String subSys) {
		this.subSys = subSys;
	}
}
