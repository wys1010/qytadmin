package com.qyt.management.platform.handler;

import com.qyt.management.cache.service.PermissionCacheService;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.exception.NotLoginException;
import com.qyt.management.sys.enumitem.UserStatusEnum;
import com.qyt.management.uc.auth.domain.Permission;
import com.qyt.management.uc.auth.domain.StaffRole;
import com.qyt.management.uc.user.domain.LoginUser;
import com.qyt.management.uc.user.domain.User;
import com.qyt.management.uc.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


/**
 * @author WangYiqun
 * @date 2014-03-12
 *
 */
@Transactional
@Service
public class DeftUserDetailsServiceImpl implements UserDetailsService {
	
	private static final Logger logger = LoggerFactory.getLogger(DeftUserDetailsServiceImpl.class);
	
	@Autowired
	private UserService userService;

	@Autowired
	private PermissionCacheService permissionCacheService;

	public UserDetails loadUserByUsername(String username) {


		boolean enabled = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNonLocked = true;
		
		if(username==null||username.length()==0){
			logger.error("未填写用户名");
			throw new BadCredentialsException("USERNAME_IS_REQUIRED");
		}
		
		//2.开始检测项目是否需要自行处理登录用户的信息和角色装填
		LoginUser userDetails = null;
		
		User user = userService.selectValidUserByLoginName(username);

//            return user;
		if (user == null) {
			logger.error("用户" + username + " 不存在");
			throw new BadCredentialsException("USER_IS_NOT_EXIST");
		}
		//检查用户启用禁用状态
		if(UserStatusEnum.DISABLE.ordinal() == user.getDisable()){
			enabled = false;
		}
        List<String> roleList = new ArrayList<String>();
        List<Permission> ucRoles = null;
        try {
            ucRoles = userService.findRolesByLoginName(username);
            if(ucRoles != null) {
                for (Permission role : ucRoles) {
                    roleList.add(role.getCode());
                }
            }
            
            List<StaffRole> staffRoles = userService.findStaffRolesByLoginName(username);
            permissionCacheService.login(user.getId(), staffRoles);
        } catch (NotLoginException e) {
            e.printStackTrace();
        } catch (BusinessException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        Set<GrantedAuthority> grantedAuths = obtainGrantedAuthorities(roleList);

		userDetails = new LoginUser(user.getLoginName(),
				user.getPassword(), enabled, accountNonExpired,
				credentialsNonExpired, accountNonLocked, grantedAuths);
		// 加入登录时间信息和用户角色
		userDetails.setLoginTime(new Date());
		userDetails.setUserId(user.getId());
		userDetails.setName(user.getName());
		userDetails.setLoginName(user.getLoginName());
		userDetails.setRoleList(roleList);
		userDetails.setUser(user);

        /**
         * 设置当前用户的权限到ThreadLocal中
         */

        return userDetails;
	}

	/**
	 * @Title: obtainGrantedAuthorities 
	 * @Description: 将字符串转换为权限对象
	 * @author nidongsheng 2013-6-8
	 * @param  @param roleList
	 * @param  @return
	 * @return Set<GrantedAuthority> 
	 * @throws
	 */
	private Set<GrantedAuthority> obtainGrantedAuthorities(List<String> roleList) {
		Set<GrantedAuthority> authSet = new HashSet();
		if (roleList != null) {
			for (int i = 0; i < roleList.size(); i++) {
				String roleName = (String) roleList.get(i);
				authSet.add(new SimpleGrantedAuthority(roleName));
			}
		}
		return authSet;
	}

}
