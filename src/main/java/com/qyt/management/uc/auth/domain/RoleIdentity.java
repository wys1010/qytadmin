package com.qyt.management.uc.auth.domain;

import java.io.Serializable;

import com.qyt.management.cache.domain.BaseIdentity;

/**
 * 角色信息
 * 
 * @author caiwb
 */
public class RoleIdentity extends BaseIdentity<Integer> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4600565228671161309L;
	
	private String name;

	private String code;
	
	private String dataAreas;

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

	public String getDataAreas() {
		return dataAreas;
	}

	public void setDataAreas(String dataAreas) {
		this.dataAreas = dataAreas;
	}

}