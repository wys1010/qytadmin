package com.qyt.management.sys.dicts.domain;

import com.qyt.management.sys.dicts.domain.*;
import org.hibernate.validator.constraints.NotBlank;

import com.qyt.management.uc.user.domain.User;

import javax.validation.constraints.Size;

import java.io.Serializable;
import java.util.Date;

public class DictItem implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 主键
	 */
	private Integer id;

	/**
	 * 字典项名称
	 */
    @NotBlank(message = "名称不能为空")
    @Size(max = 100 , message = "字典项名称长度不能超过100")
	private String name;

    /**
	 * 字典项值
	 */
    @NotBlank(message = "值不能为空")
    @Size(max = 100 , message = "字典项值长度不能超过100")
	private String value;

	/**
	 * 备注
	 */
    @Size(max = 500 , message = "备注长度不能超过500")
	private String remark;

    private String operatorName;

	/**
	 * 所属字典
	 */
	private com.qyt.management.sys.dicts.domain.Dict dict;

    private String dictId;

	/**
	 * 操作人
	 */
	private User operator;

    /**
     * 操作人id
     */
    private Integer operatorId;

	/**
	 * 创建时间
	 */
	private Date createdAt;

	/**
	 * 修改时间
	 */
	private Date updatedAt;

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

    public String getValue() {

        return value;
    }

    public void setValue(String value) {

        this.value = value;
    }

    public String getRemark() {

        return remark;
    }

    public void setRemark(String remark) {

        this.remark = remark;
    }

    public com.qyt.management.sys.dicts.domain.Dict getDict() {

        return dict;
    }

    public void setDict(com.qyt.management.sys.dicts.domain.Dict dict) {

        this.dict = dict;
    }


    public User getOperator() {

        return operator;
    }

    public void setOperator(User operator) {

        this.operator = operator;
    }

    public Integer getOperatorId() {

        return operatorId;
    }

    public void setOperatorId(Integer operatorId) {

        this.operatorId = operatorId;
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

    public String getDictId() {

        return dictId;
    }

    public void setDictId(String dictId) {

        this.dictId = dictId;
    }

    public String getOperatorName() {

        return operatorName;
    }

    public void setOperatorName(String operatorName) {

        this.operatorName = operatorName;
    }
}
