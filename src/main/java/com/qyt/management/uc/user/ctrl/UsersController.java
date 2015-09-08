package com.qyt.management.uc.user.ctrl;

import com.qyt.management.uc.user.domain.UserChangePasswordDto;
import com.qyt.management.uc.user.domain.UserUpdateDto;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.validation.BindingResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.exception.NotLoginException;
import com.qyt.management.platform.helper.MD5Helper;
import com.qyt.management.platform.helper.ValidatorHelper;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.uc.user.domain.User;
import com.qyt.management.uc.user.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.net.URLDecoder;
import java.util.List;

/**
 * @author wangyiqun
 * @date 3/12/14
 */
@Controller
@RequestMapping(value="platform/users")
public class UsersController {

    private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

    @Autowired
    private UserService userService;



    @Autowired
    @Qualifier("org.springframework.security.authenticationManager")
    protected AuthenticationManager authenticationManager;

    /**
     * 用户管理页面url
     */
    private static String USERS_PAGE_INDEX = "platform/users/index_users";

    private static String USERS_PAGE_SETTING = "platform/users/setting";

    /**
     * 首页
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "index",method = RequestMethod.GET)
    @Secured({"ROLE_UC_USERS_SELECT","ROLE_UC_USERS_UPDATE"})
    public String index(HttpServletRequest request ) throws Exception {
        return USERS_PAGE_INDEX;
    }

    /**
     * 个人设置
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "setting",method = RequestMethod.GET)
    public String currInfo(HttpServletRequest request ) throws Exception {
        return USERS_PAGE_SETTING;
    }


    /**
     * 当前用户信息查询
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "curr_info",method = RequestMethod.GET)
    @ResponseBody
    public User selectEntityBySelf(HttpServletRequest request ) throws Exception {
        User user = User.getCurrentUser();
        return user;
    }


    /**
     * 分页查询
     * @param pb
     * @param user
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value = "",method = RequestMethod.GET)
    @ResponseBody
    public PagingBean selectEntities(PagingBean pb , User user, HttpServletRequest request, HttpServletResponse response) throws Exception {
        pb.setCondition(user);
        userService.selectEntities(pb);
        return pb;
    }


    /**
     * 通过id获取单条记录
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "{id}",method = RequestMethod.GET)
    @ResponseBody
    public User selectEntityById(@PathVariable Integer id) throws Exception {
        User user = userService.selectEntityById(id);
        user.setCreatedByName(userService.selectUserNameById(user.getCreatedBy()));
        user.setUpdatedByName(userService.selectUserNameById(user.getUpdatedBy()));
        return user;
    }


    /**
     * 查询会被占用（staff关联)的可用用户
     * @return List<User>
     * @return
     * @throws Exception
     */

    @RequestMapping(value = "unoccupied/all",method = RequestMethod.GET)
    @ResponseBody
    public List<User> allUnoccupied() throws Exception {

        return this.userService.selectAllUnoccupiedUsers();
    }






    /**
     * 新增
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "add",method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_USERS_UPDATE"})
    public User insertEntity(@Valid User user, BindingResult result) throws Exception {

        ValidatorHelper.validate(result);
        //  获取当前登录用户设置为创建人、更新人
        User currUser = User.getCurrentUser();
        user.setCreatedBy(currUser.getId());
        user.setUpdatedBy(currUser.getId());

        // 中文编码转换
        user.setName(URLDecoder.decode(user.getName(), "utf8"));
        userService.insertEntity(user);
        return user;
    }


    /**
     * 管理员更新用户
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "update",method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_USERS_UPDATE"})
    public void updateEntity(@Valid UserUpdateDto user, BindingResult result) throws Exception {

        ValidatorHelper.validate(result);
        if(null != user.getName()){
            user.setName(URLDecoder.decode(user.getName(), "utf8"));
        }

        if(null != user.getRemark()){
            user.setRemark(URLDecoder.decode(user.getRemark(), "utf8"));
        }

        userService.updateEntity(new User(user));
    }



    /**
     * 管理员更新用户
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "update_self",method = RequestMethod.PUT)
    @ResponseBody
    public void updateEntityBySelf(@Valid UserUpdateDto user, BindingResult result) throws Exception {

        User currUser = User.getCurrentUser();

        // 未登录
        if(null == currUser){
            throw  new NotLoginException();
        }

        // 只能修改自己的信息
        if(currUser.getId() != user.getId()){
            throw new AccessDeniedException("您只能修改自己的密码");
        }

        ValidatorHelper.validate(result);

        if(null != user.getName()){
            user.setName(URLDecoder.decode(user.getName(), "utf8"));
        }

        if(null != user.getRemark()){
            user.setRemark(URLDecoder.decode(user.getRemark(), "utf8"));
        }
        userService.updateEntity(new User(user));
    }


    /**
     * 管理员修改密码
     * @param user
     * @param result
     * @param request
     * @throws Exception
     */
    @RequestMapping(value = "reset_password", method = RequestMethod.POST)
    @ResponseBody
    @Secured({"ROLE_UC_USERS_UPDATE"})
    public void resetPassword(@Valid UserChangePasswordDto user, BindingResult result, HttpServletRequest request) throws Exception {

        ValidatorHelper.validate(result);
        this.userService.resetPassword(user.getId(), MD5Helper.encode(user.getNewPassword()));
    }

    /**
     * 登录用户修改自己密码
     * @param user
     * @param result
     * @param request
     * @throws Exception
     */
    @RequestMapping(value = "change_password", method = RequestMethod.POST)
    @ResponseBody
    public void changePassword(@Valid UserChangePasswordDto user, BindingResult result, HttpServletRequest request) throws Exception {

        /**
         * 仅登录用户能修改密码
         */
        User currUser = User.getCurrentUser();
        if(null == currUser){
            throw  new NotLoginException();
        }

        user.setLoginName(currUser.getLoginName());

        ValidatorHelper.validate(result);
        try{
            autoLogin(user.getLoginName(), user.getOldPassword() , request);
        }catch (Exception e){
            throw new BusinessException("密码错误");
        }
        user.setNewPassword(MD5Helper.encode(user.getNewPassword()));
        this.userService.resetPassword(currUser.getId(), user.getNewPassword());
    }


    /**
     * 注册成功后自动登录
     * @param loginName
     * @param password
     * @param request
     */
    private void autoLogin(String loginName,String password ,HttpServletRequest request) throws BusinessException {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                loginName, password);
        try{
            token.setDetails(new WebAuthenticationDetails(request));
            Authentication authenticatedUser = authenticationManager
                    .authenticate(token);

            SecurityContextHolder.getContext().setAuthentication(authenticatedUser);
            request.getSession().setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, SecurityContextHolder.getContext());
        }
        catch( AuthenticationException e ){
            throw new BusinessException("登录失败");
        }
    }


    /**
     * 删除
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "delete",method = RequestMethod.DELETE)
    @ResponseBody
    @Secured({"ROLE_UC_USERS_UPDATE"})
    public void deleteEntity(Integer id) throws Exception {
        userService.deleteEntity(id);
    }

    /**
     * 更新
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "enable",method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_USERS_UPDATE"})
    public void enable(Integer id) throws Exception {
        userService.enableEntity(id);
    }

    /**
     * 更新
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "disable",method = RequestMethod.PUT)
    @ResponseBody
    @Secured({"ROLE_UC_USERS_UPDATE"})
    public void disable(Integer id) throws Exception {

        userService.disableEntity(id);
    }


}
