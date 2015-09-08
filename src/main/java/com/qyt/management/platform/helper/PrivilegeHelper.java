package com.qyt.management.platform.helper;/**
 * Created by sprite on 9/11/14.
 */

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import com.qyt.management.uc.user.domain.LoginUser;

import java.util.List;

/**
 * @author wangyiqun
 * @date 9/11/14
 */
public class PrivilegeHelper {



    /**
     * 获取当前用户所有权限
     * @return
     */
    public static List<String> getAllRolesOfCurrUsers(){
        LoginUser principal = (LoginUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getRoleList();
    }


    /**
     * 判断当前用户是否有指定权限
     * @param code
     * @return
     */
    public static boolean hasRole(String code){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        LoginUser principal = (LoginUser) authentication.getPrincipal();
        Object[] authorities = authentication.getAuthorities().toArray();
        for (int i = 0; i < authorities.length; i++) {
            Object authority = authorities[i];
            SimpleGrantedAuthority simpleGrantedAuthority = (SimpleGrantedAuthority)authority;
            if(code.equals(simpleGrantedAuthority.getAuthority())){
                return true;
            }
        }
        return false;
    }

}
