package com.qyt.management.cache.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * 缓存单元
 *
 * @author caiwb
 */
public class CacheEntity implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6310317900125135748L;

	private String code;

	private Integer size;
	
	private Date updatedAt;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

}
