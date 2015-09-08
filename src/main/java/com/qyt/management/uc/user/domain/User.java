package com.qyt.management.uc.user.domain;

import com.qyt.management.uc.user.domain.LoginUser;
import com.qyt.management.uc.user.domain.Staff;
import com.qyt.management.uc.user.domain.UserUpdateDto;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.Serializable;

/**
 * @author 王逸群
 * @description 系统用户
 * @date 2013-7-16
 */
public class User extends Staff implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = -5560543570166112009L;

	/**
     * 查询用户信息
     */
    public static LoginUser getCurrentLoginUser() {

        LoginUser userDetails = null;
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            if ("anonymousUser".equals(SecurityContextHolder.getContext().getAuthentication().getPrincipal())) {
                return null;
            }
            userDetails = (LoginUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }
        return userDetails;
    }

    /**
     * 查询用户信息
     */
    public static User getCurrentUser() {

        LoginUser userDetails = getCurrentLoginUser();
        if (null != userDetails) {
            return userDetails.getUser();
        }
        return null;
    }

    public User() {

    }

    /**
     * 从UserUpdateDto构建User
     *
     * @param dto
     */
    public User(UserUpdateDto dto) {

        this.setName(dto.getName());
        this.setLoginName(dto.getLoginName());
        this.setRemark(dto.getRemark());
        this.setDisable(dto.getStatus());
        this.setId(dto.getId());
    }

}
