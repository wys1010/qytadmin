package com.qyt.management.platform.exception;

/** 
 * @ClassName: NotLoginException 
 * @Description: 未登陆的异常
 * @author nidongsheng
 * @date 2013-10-22
 *  
 */
public class NotLoginException extends Exception {

	/** 
	 * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
	 */ 
	private static final long serialVersionUID = 1L;

	public NotLoginException() {
		super();
	}
	
	public NotLoginException(String message) {
		super(message);
	}

	public NotLoginException(String message, Exception cause) {
		super(message, cause);
	}
}
