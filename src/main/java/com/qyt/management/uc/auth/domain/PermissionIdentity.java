package com.qyt.management.uc.auth.domain;

import java.io.Serializable;

import com.qyt.management.cache.domain.BaseIdentity;

/**
 * 权限信息
 * 
 * @author caiwb
 */
public class PermissionIdentity extends BaseIdentity<Integer> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4600565228671161309L;
	
	private String name;

	private String code;
	
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

}