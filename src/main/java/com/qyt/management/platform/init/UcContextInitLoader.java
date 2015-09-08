package com.qyt.management.platform.init;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Wangyiqun
 * @date 11/3/13
 */
@Transactional
public class UcContextInitLoader implements InitializingBean {

    private static final Logger logger = LoggerFactory.getLogger(UcContextInitLoader.class);

//    @Autowired
//    private SessionFactory sessionFactory;

    /**
     * 启动加载字典、属性等
     */
    @Override
    public void afterPropertiesSet() throws Exception {
    }


}
