package com.qyt.management.platform.web.ctrl;/**
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
public class WebsController {

    @RequestMapping(value = "index",method = RequestMethod.GET)
    public String index(HttpServletRequest request ) throws Exception {
        return "platform/index/index";
    }
}
