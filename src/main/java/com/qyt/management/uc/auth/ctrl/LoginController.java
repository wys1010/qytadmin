package com.qyt.management.uc.auth.ctrl;/**
 * Created by sprite on 3/12/14.
 */

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * @author wangyiqun
 * @date 3/12/14
 */
@Controller
@RequestMapping(value = "passport")
public class LoginController {


    @RequestMapping(value = "login",method = RequestMethod.GET)
    public String login(HttpServletRequest request ) throws Exception {
        return "platform/passport/login";
    }


}
