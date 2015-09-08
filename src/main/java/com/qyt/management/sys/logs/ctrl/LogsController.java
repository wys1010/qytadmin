


package com.qyt.management.sys.logs.ctrl;

import com.qyt.management.sys.logs.domain.SystemLog;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.sys.logs.service.SystemLogService;

import javax.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;

/**
 * @author Wangyiqun
 * @date 2014-07-15
 */
@Controller
@RequestMapping(value="platform/logs")
public class LogsController {

    private static final Logger logger = LoggerFactory.getLogger(LogsController.class);


    @Autowired
    private SystemLogService systemLogService;

    /**
     * 用户管理页面url
     */
    private static final String LOGS_PAGE_INDEX = "platform/logs/index_logs";

    private void decodeBeforeSelect(SystemLog systemLog) throws UnsupportedEncodingException {
        systemLog.setLogLevel(StringUtils.trimToNull(systemLog.getLogLevel()));
//        if(null != systemLog.getName()){
//            systemLog.setName(URLDecoder.decode(systemLog.getName(), "utf8"));
//        }
    }

    /**
     * 首页
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "index",method = RequestMethod.GET)
    @Secured({"ROLE_UC_SYSTEM_LOG_SELECT"})
    public String index(HttpServletRequest request ) throws Exception {
        return LOGS_PAGE_INDEX;
    }


    /**
     * 分页查询
     * @param pb
     * @param systemLog
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "",method = RequestMethod.GET)
    @ResponseBody
    public PagingBean selectEntities(PagingBean pb , SystemLog systemLog) throws Exception {
        decodeBeforeSelect(systemLog);
        pb.setCondition(systemLog);
        systemLogService.selectEntities(pb);
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
    public SystemLog selectEntityById(@PathVariable Long id) throws Exception {
        SystemLog systemLog = systemLogService.selectEntityById(id);
        return systemLog;
    }



}
