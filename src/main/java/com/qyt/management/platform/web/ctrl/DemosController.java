package com.qyt.management.platform.web.ctrl;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author Wangyiqun
 * @date 2015年02月25日
 */
@Controller
@RequestMapping(value = "demos/ks")
public class DemosController {

    @RequestMapping(value = "/{path}")
    public String ksDemoIndex(@PathVariable String path){

        return "demos/ks/" + path + "/" + path;

    }
}
