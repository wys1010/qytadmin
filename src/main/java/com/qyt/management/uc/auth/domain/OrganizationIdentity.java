package com.qyt.management.uc.auth.domain;

import java.io.Serializable;

import com.qyt.management.cache.domain.BaseIdentity;

/**
 * 组织机构信息
 * 
 * @author caiwb
 */
public class OrganizationIdentity extends BaseIdentity<Integer> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1568341255934932483L;
	
	private Integer parentId;
	
	private String name;

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}