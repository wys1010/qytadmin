/**
 * 
 */
package com.qyt.management.platform.helper;

import com.qyt.management.platform.exception.FormatException;
import com.qyt.management.platform.helper.*;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * 字符串工具
 */
public abstract class StringHelper {
	/**
	 * 获取去除掉减号的UUID
	 * 
	 * @return
	 */
	public static String getUUID() {
		return org.apache.commons.lang.StringUtils.remove(UUID.randomUUID()
				.toString(), "-");
	}

	/**
	 * 创建MD5码<br/>
	 * 如果字符串为空则返回空字符串
	 * 
	 * @param origin
	 *            字符串
	 * @return MD5码
	 */
	public static String MD5Encode(String origin) {
		return com.qyt.management.platform.helper.MD5Helper.encode(origin);
	}

	/**
	 * 判断字符串任何一个是否为空
	 * 
	 * @param strings
	 *            要校验的字符串
	 * @return 是否有任何一个为空
	 */
	public static boolean isAnyEmpty(String... strings) {
		if (strings == null || strings.length == 0)
			return true;
		for (String s : strings)
			if (s == null || s.isEmpty())
				return true;
		return false;
	}

	/**
	 * 判断字符串全部是否为空，任何一个不是空则返回false
	 * 
	 * @param strings
	 *            要校验的字符串
	 * @return 是否全部为空
	 */
	public static boolean isAllEmpty(String... strings) {
		if (strings == null || strings.length == 0)
			return true;
		for (String s : strings)
			if (s != null && !s.isEmpty())
				return false;
		return true;
	}

	/**
	 * 截取字符串
	 * 
	 * @param str
	 *            原始字符串
	 * @param tags
	 *            分割标签,单数是起始位置，双数是结束位置，可以有多组，如果只有开始位置则一直截取到末尾
	 * @return 截取结果
	 */
	public static String subString(String str, String... tags) {
		if (tags == null || tags.length == 0)
			return str;
		StringBuilder sb = new StringBuilder();
		int start = 0;
		int end = str.length();
		boolean b = true;
		for (String t : tags) {
			if (b) {
				start = str.indexOf(t) + t.length();
				if (start == -1)
					start = str.length();

			} else {
				end = str.indexOf(t);
				if (end < start) {
					b = !b;
					continue;
				}
				sb.append(str.substring(start, end));
				end = str.length();
			}
			b = !b;
		}
		if (!b)
			sb.append(str.substring(start, end));
		return sb.toString();
	}

	/**
	 * 包名中的点号替换成路径符号
	 * 
	 * @param packageName
	 *            包名
	 * @return 路径名
	 */
	public static String dot2Path(String packageName) {
		return packageName.replace('.', '/');
	}

	/**
	 * 路径名转换成包名
	 * 
	 * @param path
	 *            路径名
	 * @return 报名
	 */
	public static String path2Dot(String path) {
		return path.replace('/', '.').replace('\\', '.');
	}

	/**
	 * 字符串转换成对象
	 * 
	 * @param clazz
	 *            对象类型
	 * @param str
	 *            字符串
	 * @return 对象值
	 * @throws FormatException
	 */
	public static Object str2obj(Class<?> clazz, String str)
			throws FormatException {
		if (str == null)
			return null;
		try {
			if (Boolean.class.equals(clazz) || boolean.class.equals(clazz))
				return Boolean.valueOf(str);
		} catch (Exception e) {
			throw new FormatException("格式错误应该是布尔值");
		}
		try {
			if (Integer.class.equals(clazz) || int.class.equals(clazz))
				return Integer.valueOf(str);
			if (Long.class.equals(clazz) || long.class.equals(clazz))
				return Long.valueOf(str);
			if (Short.class.equals(clazz) || short.class.equals(clazz))
				return Short.valueOf(str);
		} catch (Exception e) {
			throw new FormatException("格式错误应该是整数");
		}
		try {
			if (Double.class.equals(clazz) || double.class.equals(clazz))
				return Double.valueOf(str);
			if (Float.class.equals(clazz) || float.class.equals(clazz))
				return Float.valueOf(str);
			if (BigDecimal.class.equals(clazz))
				return new BigDecimal(str);
		} catch (Exception e) {
			throw new FormatException("格式错误应该是数值");
		}
		String f = null;
		try {
			if (Date.class.equals(clazz)) {
				if (str.equalsIgnoreCase("&nbsp;"))
					return null;
				switch (str.length()) {
				case 4:
					f = "yyyy";
					return new SimpleDateFormat(f).parse(str);
				case 7:
					f = "yyyy-MM";
					return new SimpleDateFormat(f).parse(str);
				case 6:
					f = "yyyyMM";
					return new SimpleDateFormat(f).parse(str);
				case 10:
					f = "yyyy-MM-dd";
					return new SimpleDateFormat(f).parse(str);
				case 8:
					f = "yyyyMMdd";
					return new SimpleDateFormat(f).parse(str);
				case 13:
					f = "yyyy-MM-dd HH";
					return new SimpleDateFormat(f).parse(str);
				case 11:
					f = "yyyyMMdd HH";
					return new SimpleDateFormat(f).parse(str);
				case 16:
					f = "yyyy-MM-dd HH:mm";
					return new SimpleDateFormat(f).parse(str);
				case 19:
					f = "yyyy-MM-dd HH:mm:ss";
					return new SimpleDateFormat(f).parse(str);
				}
				return null;
			}
		} catch (ParseException e) {
			throw new FormatException("格式错误应该是日期格式" + f);
		} catch (Exception e) {
			throw new FormatException("格式错误应该是日期格式" + f);
		}
		return str;
	}
}
