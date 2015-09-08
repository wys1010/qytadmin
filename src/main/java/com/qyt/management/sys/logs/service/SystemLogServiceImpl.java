package com.qyt.management.sys.logs.service;

import com.qyt.management.sys.logs.dao.SystemLogMapper;
import com.qyt.management.sys.logs.domain.SystemLog;
import com.qyt.management.sys.logs.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qyt.management.platform.web.PagingBean;

import java.util.List;

/**
 * @author Wangyiqun
 * @date 2013-12-03
 */
@Transactional
@Service
public class SystemLogServiceImpl implements com.qyt.management.sys.logs.service.SystemLogService {



    @Autowired
    private SystemLogMapper systemLogMapper;



    @Override
    public SystemLog selectEntityById(Long id) {
        SystemLog systemLog = this.systemLogMapper.selectEntityById(id);
        return systemLog;
    }


    @Override
    public void selectEntities(PagingBean<SystemLog> pb) {
        List<SystemLog> systemLogs = systemLogMapper.selectEntities(pb);
        int count = systemLogMapper.selectEntitiesCount(pb);
        pb.setResults(count);
        pb.setRows(systemLogs);
    }

}
