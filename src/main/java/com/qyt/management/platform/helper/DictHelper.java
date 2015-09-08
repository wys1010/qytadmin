package com.qyt.management.platform.helper;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.qyt.management.sys.dicts.domain.DictItem;


/** 
 * des: 常量类 （字典名称及其他等）
 * @author zheng.sk
 * @version 2014-7-22 下午12:14:08
 */

public class DictHelper {
	
	//产地
	public final static String BD_ORIGIN = "BD_ORIGIN";
	
	//产品分类用途
	public final static String BD_CATEGORIE_APPLICATION = "BD_CATEGORIE_APPLICATION";
	
	//销售状态
	public final static String BD_SELL_STATUS = "BD_SELL_STATUS";

    //期现货
    public final static String BD_FUTURESCASH = "BD_FUTURESCASH";
	
	private static Map<String, String> dictMap = null; 
	
	
	//将字典List转换成map
	public static Map<String, String> getDictMap(List<DictItem> list){
		dictMap = new LinkedHashMap<String, String>();
		for(int i=0;i<list.size();i++){
			DictItem di = list.get(i);
			dictMap.put(di.getValue(),di.getName());
		}
		return dictMap;
	}
	
	

}
