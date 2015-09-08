package com.qyt.management.uc.user.service;


import com.qyt.management.uc.auth.domain.Permission;
import com.qyt.management.uc.auth.domain.StaffRole;
import com.qyt.management.uc.user.domain.User;
import org.springframework.stereotype.Service;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.exception.NotLoginException;
import com.qyt.management.platform.web.service.BaseCurdService;
import com.qyt.management.platform.web.service.EnableService;
import com.qyt.management.sys.enumitem.UserStatusEnum;

import java.util.List;

/**
 * @author WangYiqun
 * @date 2014-03-12
 *
 */
@Service
public interface UserService  extends BaseCurdService<User, User, Integer> , EnableService<Integer> {


    public List<User> selectAllUnoccupiedUsers();

    public String selectUserNameById(Integer id);

    /**
     * @param loginName
     * @return
     */
	public User selectUserByLoginName(String loginName);


    /**
     * 登录用
     * @param loginName
     * @return
     */
    public User selectValidUserByLoginName(String loginName);

	/**
	 * 查询用户角色
     */
	public List<Permission> findRolesByLoginName(String loginName) throws NotLoginException, BusinessException;

	/**
	 * @Description:更改指定用户的状态
	 * @param  @param ids
	 * @param  @param status
	 * @return void 
	 * @throws
	 */
	public void updateUserStatus(String ids, UserStatusEnum status);

	/**
	 * @return 
	* @Title: resetPassword 
	* @Description: 修改密码
	* @return void   
	* @throws
	 */
	public void resetPassword(Integer id, String password) throws Exception ;


    public void updateUserLoginTime(Integer id);
	

    /**
	 * 查询用户角色
     */
	public List<StaffRole> findStaffRolesByLoginName(String loginName) throws NotLoginException, BusinessException;
}
