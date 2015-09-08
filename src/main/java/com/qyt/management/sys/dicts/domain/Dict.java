package com.qyt.management.sys.dicts.domain;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Wangyiqun
 * @date 2014-04-22
 * 
 */
public class Dict  implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 主键
	 */
    @NotBlank(message = "编号不能为空")
	private String id;

	/**
	 * 字典名称
	 */
    @NotBlank(message = "名称不能为空")
    @Size(max = 100 , message = "名称长度不能超过100")
	private String name;


	/**
	 * 备注
	 */
    @Size(max = 500 , message = "备注长度不能超过500")
	private String remark;


    private String operatorName;

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

    public String getId() {

        return id;
    }

    public void setId(String id) {

        this.id = id;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
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

    public Integer getOperatorId() {

        return operatorId;
    }

    public void setOperatorId(Integer operatorId) {

        this.operatorId = operatorId;
    }

    public String getOperatorName() {

        return operatorName;
    }

    public void setOperatorName(String operatorName) {

        this.operatorName = operatorName;
    }
}
