package com.qyt.management.platform.exception;

import com.qyt.management.platform.exception.*;

/**
 * @功能名 业务异常类
 * @类描述 通用业务异常
 * 
 * @author Wangyiqun
 * @date 2014-04-22
 */
public class ValidatorException extends com.qyt.management.platform.exception.BusinessException {

	private static final long serialVersionUID = -4788824259324634599L;

    private String msg;

	public ValidatorException(String message) {
        super(message);
        this.msg = message;
	}



    public String getMsg() {

        return msg;
    }

    public void setMsg(String msg) {

        this.msg = msg;
    }
}
