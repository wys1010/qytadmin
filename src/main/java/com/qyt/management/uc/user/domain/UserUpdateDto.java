package com.qyt.management.uc.user.domain;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * @author 王逸群
 * @description 用户修改dto
 * @date 2013-7-16
 */
public class UserUpdateDto implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    private Integer id;


    /**
     * 姓名
     */
    @NotBlank(message = "名称不能为空")
    @Size(max = 60 , message = "名称长度不能超过60")
    private String name;


    /**
     * 登陆用户名
     */
    @NotBlank(message = "名称不能为空")
    private String loginName;

    @Size(max = 255 , message = "名称长度不能超过255")
    private String  remark;

    /**
     * 状态
     */
    private int status;

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

    public String getLoginName() {

        return loginName;
    }

    public void setLoginName(String loginName) {

        this.loginName = loginName;
    }

    public String getRemark() {

        return remark;
    }

    public void setRemark(String remark) {

        this.remark = remark;
    }

    public int getStatus() {

        return status;
    }

    public void setStatus(int status) {

        this.status = status;
    }
}
