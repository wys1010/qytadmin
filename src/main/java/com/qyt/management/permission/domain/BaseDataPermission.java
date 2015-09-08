package com.qyt.management.permission.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * 数据权限
 * 
 * @author caiwb
 */
public class BaseDataPermission implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7061826156702011267L;

	/**
	 * 机构代码ID列表
	 * */
	private Set<Integer> organizationIds = new HashSet<Integer>();
	
	/**
	 * 员工ID列表
	 * */
	private Set<Integer> staffIds = new HashSet<Integer>();;
	
	/**
	 * 区域列表
	 * */
	private Set<String> districts = new HashSet<String>();

	/**
	 * 采购的品种大类列表
	 * */
	private Set<String> purchaseCategoryGroups = new HashSet<String>();
	
	/**
	 * 销售的品种大类列表
	 * */
	private Set<String> sellCategoryGroups = new HashSet<String>();

	public Set<Integer> getOrganizationIds() {
		return organizationIds;
	}

	public void setOrganizationIds(Set<Integer> organizationIds) {
		this.organizationIds = organizationIds;
	}

	public Set<Integer> getStaffIds() {
		return staffIds;
	}

	public void setStaffIds(Set<Integer> staffIds) {
		this.staffIds = staffIds;
	}

	public Set<String> getDistricts() {
		return districts;
	}

	public void setDistricts(Set<String> districts) {
		this.districts = districts;
	}

	public Set<String> getPurchaseCategoryGroups() {
		return purchaseCategoryGroups;
	}

	public void setPurchaseCategoryGroups(Set<String> purchaseCategoryGroups) {
		this.purchaseCategoryGroups = purchaseCategoryGroups;
	}

	public Set<String> getSellCategoryGroups() {
		return sellCategoryGroups;
	}

	public void setSellCategoryGroups(Set<String> sellCategoryGroups) {
		this.sellCategoryGroups = sellCategoryGroups;
	}
	
}
