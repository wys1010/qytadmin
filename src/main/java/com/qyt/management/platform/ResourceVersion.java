package com.qyt.management.platform;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 资源版本
 * 
 * @author caiwb
 */
public class ResourceVersion {

	private static final Logger logger = LoggerFactory.getLogger(ResourceVersion.class);
	
	private static String version = String.valueOf(new Date().getTime());
	
	public void init() {
		version = String.valueOf(new Date().getTime());
		
		logger.info("[ResourceVersion] " + version);
	}
	
	public static String getVersion() {
		return version;
	}
}
