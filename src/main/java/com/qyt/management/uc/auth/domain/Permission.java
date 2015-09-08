package com.qyt.management.uc.auth.domain;

import java.io.Serializable;

/**
 * 权限
 * 
 * @author caiwb
 */
public class Permission implements Serializable {

	private static final long serialVersionUID = -1005868007476890001L;

	private Integer id;

	private String name;

	private String code;

    private boolean menu;

    private String subSys;

    private String subModule;

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

	public boolean isMenu() {
		return menu;
	}

	public void setMenu(boolean menu) {
		this.menu = menu;
	}

	public String getSubSys() {
		return subSys;
	}

	public void setSubSys(String subSys) {
		this.subSys = subSys;
	}

	public String getSubModule() {
		return subModule;
	}

	public void setSubModule(String subModule) {
		this.subModule = subModule;
	}
    
    
}
