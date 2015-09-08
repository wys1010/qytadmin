package com.qyt.management.uc.user.domain;

import java.util.Date;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * Created by Xandy on 2015/2/27.
 */
public class Staff {

    private Integer id;

    /**
     * 组织机构ID
     */
    private Integer orgId;

    /**
     * 登录用户名
     */
    @NotBlank(message = "登录名称不能为空")
    private String loginName;

    /**
     * 密码，md5
     */
    @Size(min = 6, max = 16, message = "密码必须6位以上,16位以下")
    @Pattern(regexp = "^[A-Z|a-z|@|_|0-9]\\w*$", message = "密码不能包含空格")
    private String password;

    /**
     * 姓名
     */
    @NotBlank(message = "名称不能为空")
    @Size(max = 60, message = "名称长度不能超过60")
    private String name;

    /**
     * 英文名
     */
    private String englishName;

    /**
     * 性别，1：男；2：女；
     */
    private Integer gender;


    /**
     * 是否禁用，0：否；1：是；
     */
    private Integer disable;
    private String email;
    private String phone;
    private String wechat;
    private String qq;

    /**
     * 是否管理者，0：否；1：是；如果是管理者，自动继承所在部门的数据权限
     */
    private Integer manager;

    /**
     * 负责的业务的区域范围，英文逗号分割，区域表district的district_code
     */
    private String districts;

    /**
     * 最后登录时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastLoginTime;

    /**
     * 备注
     */
    @Size(max = 255, message = "名称长度不能超过255")
    private String remark;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updatedAt;

    /**
     * 创建者staff_id
     */
    private Integer createdBy;
    
    /**
     * 创建者名称
     */
    private String createdByName;

    /**
     * 修改者staff_id
     */
    private Integer updatedBy;
    
    /**
     * 修改者名称
     */
    private String updatedByName;

    /**
     * 负责采购的品种大类列表，英文逗号分隔，category_groups的group_code
     */
    private String purchaseCategoryGroups;

    /**
     * 负责销售的品种大类列表，英文逗号分隔，category_groups的group_code
     */
    private String sellCategoryGroups;

    private String orgName;

    private String roleIds;

    private String roleNames;

    /**
     * 是否有组织机构
     */
    private String hasOrgs;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOrgId() {
        return orgId;
    }

    public void setOrgId(Integer orgId) {
        this.orgId = orgId;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEnglishName() {
        return englishName;
    }

    public void setEnglishName(String englishName) {
        this.englishName = englishName;
    }

    public Integer getGender() {
        return gender;
    }

    public void setGender(Integer gender) {
        this.gender = gender;
    }

    public Integer getDisable() {
        return disable;
    }

    public void setDisable(Integer disable) {
        this.disable = disable;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getWechat() {
        return wechat;
    }

    public void setWechat(String wechat) {
        this.wechat = wechat;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public Integer getManager() {
        return manager;
    }

    public void setManager(Integer manager) {
        this.manager = manager;
    }

    public String getDistricts() {
        return districts;
    }

    public void setDistricts(String districts) {
        this.districts = districts;
    }

    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
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

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getRoleIds() {
        return roleIds;
    }

    public void setRoleIds(String roleIds) {
        this.roleIds = roleIds;
    }

    public String getRoleNames() {
        return roleNames;
    }

    public void setRoleNames(String roleNames) {
        this.roleNames = roleNames;
    }

    public String getHasOrgs() {
        return hasOrgs;
    }

    public void setHasOrgs(String hasOrgs) {
        this.hasOrgs = hasOrgs;
    }


}
