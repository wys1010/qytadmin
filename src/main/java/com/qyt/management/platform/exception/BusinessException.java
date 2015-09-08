package com.qyt.management.platform.exception;

/**
 * @功能名 业务异常类
 * @类描述 通用业务异常
 * 
 * @author Wangyiqun
 * @date 2014-04-22
 */
public class BusinessException extends Exception {

	private static final long serialVersionUID = -4788824259324634599L;

    private String code ;

    private String msg;

	public BusinessException(String message) {
		super(message);
	}

	public BusinessException(String message, Exception cause) {
		super(message, cause);
	}

    public BusinessException(String code , String message, Exception cause) {
        super(message, cause);
        this.code = code;
        this.msg = message;
    }

    public String getCode() {

        return code;
    }

    public void setCode(String code) {

        this.code = code;
    }

    public String getMsg() {

        return msg;
    }

    public void setMsg(String msg) {

        this.msg = msg;
    }
}
