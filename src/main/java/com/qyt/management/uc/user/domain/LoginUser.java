package com.qyt.management.uc.user.domain;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.Date;
import java.util.List;


public class LoginUser extends User {
	private static final long serialVersionUID = 1919464185097508773L;
	
	private Date loginTime;
	
	private String name;
	
	private Integer userId;
	
	private List<String> roleList;
	
	private String loginName;
	
	private com.qyt.management.uc.user.domain.User user;
	
	public LoginUser(String username, String password, boolean enabled, boolean accountNonExpired,
			boolean credentialsNonExpired, boolean accountNonLocked, Collection<GrantedAuthority> authorities)
			throws IllegalArgumentException {
		super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
	}

	public Date getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(Date loginTime) {
		this.loginTime = loginTime;
	}

	
	public List<String> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<String> roleList) {
		this.roleList = roleList;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public com.qyt.management.uc.user.domain.User getUser() {
		return user;
	}

	public void setUser(com.qyt.management.uc.user.domain.User user) {
		this.user = user;
	}
	
}
