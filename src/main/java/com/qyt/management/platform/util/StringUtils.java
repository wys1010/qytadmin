package com.qyt.management.platform.util;

import java.util.HashSet;
import java.util.Set;

/**
 * 字符串工具类
 * 
 * @author caiwb
 */
public class StringUtils {

	public static boolean isEmptyByTrim(String text) {
		if (text == null)
			return true;

		if (text.trim().isEmpty())
			return true;

		return false;
	}
	
	public static boolean isNotEmptyByTrim(String text) {
		if (text == null)
			return false;

		if (text.trim().isEmpty())
			return false;

		return true;
	}

	public static Set<String> splitStrs2Set(String strs) {
    	Set<String> set = new HashSet<String>();
    	
    	if (StringUtils.isNotEmptyByTrim(strs)) {
    		for (String str : strs.split(",")) {
    			set.add(str);
			}
    	}
    	
    	return set;
    }
	
	public static Set<Integer> splitStrs2IntSet(String strs) {
    	Set<Integer> set = new HashSet<Integer>();
    	
    	if (StringUtils.isNotEmptyByTrim(strs)) {
    		for (String str : strs.split(",")) {
    			set.add(Integer.parseInt(str));
			}
    	}
    	
    	return set;
    }
}
