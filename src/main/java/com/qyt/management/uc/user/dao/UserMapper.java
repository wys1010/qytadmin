package com.qyt.management.uc.user.dao;


import org.apache.ibatis.annotations.Param;

import com.qyt.management.platform.web.dao.BaseCurdMapper;
import com.qyt.management.platform.web.dao.EnableMapper;
import com.qyt.management.uc.user.domain.User;

import java.util.List;
import java.util.Map;

/**
 * @author WangYiqun
 * @date 2014-03-12
 *  
 */
public interface UserMapper extends BaseCurdMapper<User , User , Integer> , EnableMapper<Integer> {
	
    public void updateUserLoginTime(Integer id);


    /**
     * 修改密码
     * @param userId
     * @param passwordMd5 MD5加密后的密码
     */
    public void resetPassword(@Param("userId") Integer userId, @Param("password") String passwordMd5);

    /**
     * 检查更新loginName是否重复
     * @param param
     * @return
     */
    public int checkLoginNameUniqueForUpdate(Map<String, Object> param);

    /**
     * 检查新增loginName是否重复
     * @param loginName
     * @return
     */
    public int checkLoginNameUniqueForInsert(String loginName);


    public String selectUserNameById(Integer id);

    /**
     * 条件分页查询用户
     * param : {
     *     condition : Object,
     *     start : int
     *     limit : int
     * }
     * @param param
     * @return
     */
    public List<User> selectUsers(Map<String, Object> param);

    /**
     * 分页查询总数
     * @param param
     * @return
     */
    public int selectUsersCount(Map<String, Object> param);

    /**
     * 通过登录名查询用户
     * @param loginName
     * @return
     */
    public User selectUserByLoginName(String loginName);

    /**
     * 通过登录名查询可用用户，登录使用
     * @param loginName
     * @return
     */
    public User selectValidUserByLoginName(String loginName);

    /**
     * 新增user，auto_increment产生的id会回写到user中，通过Mapper.xml的idProperty设定
     * @param user
     */
    public void insertUser(User user);

    /**
     * 通过id查询用户
     * @param id
     * @return
     */
    public User selectUserById(Integer id);

    /**
     * 更新用户
     * @param user
     */
    public void updateUser(User user);

    /**
     * 删除用户
     * @param id
     */
    public void deleteUser(long id);

}
