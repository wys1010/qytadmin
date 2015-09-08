package com.qyt.management.uc.user.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.exception.NotLoginException;
import com.qyt.management.platform.exception.ValidatorException;
import com.qyt.management.platform.helper.JsonHelper;
import com.qyt.management.platform.helper.MD5Helper;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.sys.enumitem.UserStatusEnum;
import com.qyt.management.uc.auth.dao.PrivilegesMapper;
import com.qyt.management.uc.auth.domain.Permission;
import com.qyt.management.uc.auth.domain.StaffRole;
import com.qyt.management.uc.user.dao.UserMapper;
import com.qyt.management.uc.user.domain.User;

/**
 * @author WangYiqun
 * @date 2014-03-12
 */
@Transactional
@Service
public class UserServiceImpl implements UserService {


    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PrivilegesMapper privilegesMapper;


    @Override
    public List<User> selectAllUnoccupiedUsers() {

        return null;
    }

    @Override
    public String selectUserNameById(Integer id) {

        return this.userMapper.selectUserNameById(id);
    }

    @Override
    public User selectUserByLoginName(String loginName) {

        User user = userMapper.selectUserByLoginName(loginName);
        return user;
    }

    @Override
    public User selectValidUserByLoginName(String loginName) {

        User user = userMapper.selectValidUserByLoginName(loginName);
        return user;
    }


    /**
     * 这里后面要处理各应用的关系，因为roles暂时只针对staff，而手机是不存在staff的
     *
     * @param loginName
     * @return
     * @throws NotLoginException
     * @throws BusinessException
     */
    @Override
    public List<Permission> findRolesByLoginName(String loginName) throws NotLoginException, BusinessException {

        List<Permission> ucRoles = null;
        User user = userMapper.selectValidUserByLoginName(loginName);
        if (user == null) {
            throw new NotLoginException();
        }
        ucRoles = privilegesMapper.selectAllPermissionsOfStaff(user.getId());
        return ucRoles;
    }


    @Override
    public void updateUserStatus(String ids, UserStatusEnum status) {

    }


    @Override
    public void resetPassword(Integer id, String password) throws Exception {

        this.userMapper.resetPassword(id, password);
    }

    @Override
    public void updateUserLoginTime(Integer id) {

        this.userMapper.updateUserLoginTime(id);
    }

    @Override
    public void updateEntity(User dto) throws BusinessException {

        Map<String, Object> param = new HashMap<String, Object>();
        param.put("id", dto.getId());
        param.put("login_name", dto.getLoginName());
        int countOfLoginName = this.userMapper.checkLoginNameUniqueForUpdate(param);
        if (countOfLoginName > 0) {
            throw new ValidatorException(JsonHelper.singleKey2String("loginName", "登录名重复"));
        }
        this.userMapper.updateEntity(dto);
    }

    @Override
    public void insertEntity(User dto) throws BusinessException {

        int countOfLoginName = this.userMapper.checkLoginNameUniqueForInsert(dto.getLoginName());
        if (countOfLoginName > 0) {
            throw new BusinessException("登录名已存在");
        }
        // 编码
        dto.setPassword(MD5Helper.encode(dto.getPassword()));
        this.userMapper.insertEntity(dto);
    }

    @Override
    public void deleteEntity(Integer id) {

        this.userMapper.deleteEntity(id);
    }

    @Override
    public void selectEntities(PagingBean<User> pb) {

        List<User> users = userMapper.selectEntities(pb);
        int count = userMapper.selectEntitiesCount(pb);
        pb.setResults(count);
        pb.setRows(users);
    }

    @Override
    public User selectEntityById(Integer id) {

        return this.userMapper.selectEntityById(id);
    }

    @Override
    public void enableEntity(Integer id) {

        this.userMapper.enableEntity(id);
    }

    @Override
    public void disableEntity(Integer id) throws BusinessException {
        this.userMapper.disableEntity(id);
    }

	@Override
	public List<StaffRole> findStaffRolesByLoginName(String loginName)
			throws NotLoginException, BusinessException {
		List<StaffRole> staffRoles = null;
		
        User user = userMapper.selectValidUserByLoginName(loginName);
        if (user == null) {
            throw new NotLoginException();
        }
        
        staffRoles = privilegesMapper.selectAllRolesOfStaff(user.getId());
        return staffRoles;
	}
}
