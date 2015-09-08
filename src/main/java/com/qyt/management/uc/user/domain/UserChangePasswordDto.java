package com.qyt.management.uc.user.domain;

import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

/**
 * 修改密码dto
 * @author wangyiqun
 * @date 8/23/14
 */
public class UserChangePasswordDto {

    private Integer id;

    private String loginName;

    private String oldPassword;


    @NotBlank(message = "密码不能为空")
    @Size(min = 6 , max = 16, message = "密码必须6位以上,16位以下")
    @Pattern(regexp = "^[A-Z|a-z|@|_|0-9]\\w*$" , message = "密码不能包含空格")
    private String newPassword;


    public String getOldPassword() {

        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {

        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {

        return newPassword;
    }

    public void setNewPassword(String newPassword) {

        this.newPassword = newPassword;
    }

    public String getLoginName() {

        return loginName;
    }

    public void setLoginName(String loginName) {

        this.loginName = loginName;
    }

    public Integer getId() {

        return id;
    }

    public void setId(Integer id) {

        this.id = id;
    }
}
