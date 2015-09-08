package com.qyt.management.uc.user.domain;

import java.io.Serializable;
import java.util.Set;

import com.qyt.management.cache.domain.BaseIdentity;

/**
 * 员工身份信息
 * 
 * @author caiwb
 */
public class StaffIdentity extends BaseIdentity<Integer> implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8588356296473443889L;
	
	private String name;

	/**
     * 组织机构ID
     */
    private Integer orgId;

    /**
     * 是否管理者，0：否；1：是；如果是管理者，自动继承所在部门的数据权限
     */
    private boolean manager;
    
	/**
     * 负责的业务的区域范围，英文逗号分割，区域表district的district_code
     */
    private String districts;
    
    private Set<String> districtSet;
	
    /**
     * 负责采购的品种大类列表，英文逗号分隔，category_groups的group_code
     */
    private String purchaseCategoryGroups;
    
    private Set<String> purchaseCategoryGroupSet;

    /**
     * 负责销售的品种大类列表，英文逗号分隔，category_groups的group_code
     */
    private String sellCategoryGroups;
    
    private Set<String> sellCategoryGroupSet;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getOrgId() {
		return orgId;
	}

	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}

	public boolean isManager() {
		return manager;
	}

	public void setManager(boolean manager) {
		this.manager = manager;
	}

	public String getDistricts() {
		return districts;
	}

	public void setDistricts(String districts) {
		this.districts = districts;
	}

	public String getPurchaseCategoryGroups() {
		return purchaseCategoryGroups;
	}

	public void setPurchaseCategoryGroups(String purchaseCategoryGroups) {
		this.purchaseCategoryGroups = purchaseCategoryGroups;
	}

	public String getSellCategoryGroups() {
		return sellCategoryGroups;
	}

	public void setSellCategoryGroups(String sellCategoryGroups) {
		this.sellCategoryGroups = sellCategoryGroups;
	}

	public Set<String> getDistrictSet() {
		return districtSet;
	}

	public void setDistrictSet(Set<String> districtSet) {
		this.districtSet = districtSet;
	}

	public Set<String> getPurchaseCategoryGroupSet() {
		return purchaseCategoryGroupSet;
	}

	public void setPurchaseCategoryGroupSet(Set<String> purchaseCategoryGroupSet) {
		this.purchaseCategoryGroupSet = purchaseCategoryGroupSet;
	}

	public Set<String> getSellCategoryGroupSet() {
		return sellCategoryGroupSet;
	}

	public void setSellCategoryGroupSet(Set<String> sellCategoryGroupSet) {
		this.sellCategoryGroupSet = sellCategoryGroupSet;
	}
	
}