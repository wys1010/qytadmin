/**
 * 
 */
package com.qyt.management.platform.helper;

import com.qyt.management.platform.exception.FormatException;
import com.qyt.management.platform.helper.*;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashSet;
import java.util.Set;

/**
 * 对象属性读取设置方法
 */
public final class PropertyHelper {
	/**
	 * 修改对象的简单属性值
	 * 
	 * @param obj
	 *            读取的独享
	 * @param name
	 *            属性名称
	 * @param value
	 *            设置的值
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 * @throws InvocationTargetException
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 * @throws FormatException
	 */
	public static void setSimpleProperty(Object obj, String name, Object value)
			throws SecurityException, NoSuchMethodException,
			IllegalArgumentException, IllegalAccessException,
			InvocationTargetException, FormatException {
		if (obj == null)
			return;
		Class<?> c = obj.getClass();
		Method m = findSetMethod(c, name);
		if (m == null)
			return;
		Class<?> clazz = m.getParameterTypes()[0];
		if (value == null || clazz.isInstance(value))
			m.invoke(obj, new Object[] { value });
		else if (value instanceof String) {
			m.invoke(
					obj,
					new Object[] { com.qyt.management.platform.helper.StringHelper.str2obj(clazz, (String) value) });
		}
	}

	/**
	 * 修改对象的属性值
	 *
	 * @param obj
	 *            读取的独享
	 * @param name
	 *            属性名称，子属性可以用.号分割
	 * @param value
	 *            设置的值
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 * @throws InvocationTargetException
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 * @throws FormatException
	 */
	public static void setProperty(Object obj, String name, Object value)
			throws SecurityException, NoSuchMethodException,
			IllegalArgumentException, IllegalAccessException,
			InvocationTargetException, FormatException {
		int i = name.lastIndexOf(".");
		if (i == -1) {
			setSimpleProperty(obj, name, value);
			return;
		}
		Class<?> c = getSimplePropertyClass(obj, name.substring(0, i));
		if (c != null && c.isEnum()) {
			setSimpleProperty(obj, name.substring(0, i),
					c.getEnumConstants()[(Integer) value]);
		} else {
			Object o = getProperty(obj, name.substring(0, i));
			setSimpleProperty(o, name.substring(i + 1), value);
		}
	}

	/**
	 * 获取对象全部属性名称
	 *
	 * @param obj
	 * @return
	 */
	public static String[] getPropertys(Object obj) {
		if (obj == null)
			return new String[] {};
		Class<?> c = obj.getClass();
		Set<String> set = new HashSet<String>();
		Set<String> get = new HashSet<String>();
		for (Method m : c.getMethods()) {
			if (m.getParameterTypes().length == 1
					&& m.getName().substring(0, 3).equals("set")) {
				set.add(m.getName().substring(3, 4).toLowerCase()
						+ m.getName().substring(4));
				continue;
			}
			if (m.getParameterTypes().length == 0
					&& m.getName().subSequence(0, 3).equals("get")) {
				get.add(m.getName().substring(3, 4).toLowerCase()
						+ m.getName().substring(4));
				continue;
			}
			if (m.getParameterTypes().length == 0
					&& m.getName().subSequence(0, 3).equals("has")) {
				get.add(m.getName().substring(3, 4).toLowerCase()
						+ m.getName().substring(4));
				continue;
			}
			if (m.getParameterTypes().length == 0
					&& m.getName().subSequence(0, 2).equals("is"))
				get.add(m.getName().substring(2, 3).toLowerCase()
						+ m.getName().substring(3));
		}
		set.retainAll(get);
		return set.toArray(new String[set.size()]);
	}

	/**
	 * 获取简单属性的类型
	 *
	 * @param obj
	 *            对象
	 * @param propertyName
	 *            属性
	 * @return 类型
	 */
	public static Class<?> getSimplePropertyClass(Object obj,
			String propertyName) {
		return getClassSimplePropertyClass(obj.getClass(), propertyName);
	}

	/**
	 * 获取类的简单属性类型<br/>
	 * 由于使用的是根据set方法，如果对象不是pojo则方法无效
	 *
	 * @param objectClass
	 *            对象的类
	 * @param propertyName
	 *            属性名
	 * @return 属性类型
	 */
	public static Class<?> getClassSimplePropertyClass(Class<?> objectClass,
			String propertyName) {
		Method m = findGetMethod(objectClass, propertyName);
		if (m == null)
			return null;
		return m.getReturnType();
	}

	/**
	 * 获取类的属性类型<br/>
	 * 由于使用的是根据set方法，如果对象不是pojo则方法无效
	 *
	 * @param objectClass
	 *            对象的类
	 * @param propertyName
	 *            属性名，子属性使用.号分割
	 * @return 属性类型
	 */
	public static Class<?> getClassPropertyClass(Class<?> objectClass,
			String propertyName) {
		String[] names = propertyName.split("\\.");
		Class<?> c = objectClass;
		for (int i = 0; i < names.length; i++) {
			c = getClassSimplePropertyClass(c, names[i]);
		}
		return c;
	}

	/**
	 * 获取属性的类型
	 *
	 * @param obj
	 *            对象
	 * @param propertyName
	 *            属性名称可以用.号分割
	 * @return 类型
	 */
	public static Class<?> getPropertyClass(Object obj, String propertyName) {
		return getClassPropertyClass(obj.getClass(), propertyName);
	}

	private static String nameForGet(String name) {
		StringBuilder sb = new StringBuilder("get");
		sb.append(name.substring(0, 1).toUpperCase());
		sb.append(name.substring(1));
		return sb.toString();
	}

	private static String nameForIs(String name) {
		StringBuilder sb = new StringBuilder("is");
		sb.append(name.substring(0, 1).toUpperCase());
		sb.append(name.substring(1));
		return sb.toString();
	}

	private static String nameForHas(String name) {
		StringBuilder sb = new StringBuilder("has");
		sb.append(name.substring(0, 1).toUpperCase());
		sb.append(name.substring(1));
		return sb.toString();
	}

	private static String nameForSet(String name) {
		StringBuilder sb = new StringBuilder("set");
		sb.append(name.substring(0, 1).toUpperCase());
		sb.append(name.substring(1));
		return sb.toString();
	}

	/**
	 * 读取对象属性值，子属性可以使用.号分割
	 *
	 * @param obj
	 *            对象
	 * @param name
	 *            属性名称，子属性使用.号分割
	 * @return 属性值
	 * @throws SecurityException
	 * @throws NoSuchMethodException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 */
	public static Object getProperty(Object obj, String name)
			throws SecurityException, NoSuchMethodException,
			IllegalArgumentException, IllegalAccessException,
			InvocationTargetException {
		String[] names = name.split("\\.");
		Object ret = obj;
		for (int i = 0; i < names.length; i++) {
			ret = getSimpleProperty(ret, names[i]);
		}
		return ret;
	}

	/**
	 * 读取对象属性值,不能读取子属性
	 *
	 * @param obj
	 *            对象
	 * @param name
	 *            属性名称
	 * @return 属性值
	 * @throws SecurityException
	 * @throws NoSuchMethodException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 */
	public static Object getSimpleProperty(Object obj, String name)
			throws SecurityException, NoSuchMethodException,
			IllegalArgumentException, IllegalAccessException,
			InvocationTargetException {
		if (obj == null)
			return null;
		Class<?> c = obj.getClass();
		Method m = findGetMethod(c, name);
		if (m == null)
			throw new NoSuchMethodException(name);
		return m.invoke(obj);
	}

	/**
	 * 判断是否有设置方法
	 * 
	 * @param clazz
	 * @param propertyName
	 * @return
	 */
	public static boolean hasSetMethod(Class<?> clazz, String propertyName) {
		return hasMethod(clazz, 1, nameForSet(propertyName));
	}

	/**
	 * 查找类的set方法
	 * 
	 * @param clazz
	 *            类
	 * @param propertyName
	 *            属性
	 * @return set方法,没有则返回null
	 */
	public static Method findSetMethod(Class<?> clazz, String propertyName) {
		return findMethod(clazz, 1, nameForSet(propertyName));
	}

	/**
	 * 判断对象是否有方法
	 * 
	 * @param clazz
	 * @return
	 */
	private static boolean hasMethod(Class<?> clazz, int parameterLength,
			String... methodNames) {
		return findMethod(clazz, parameterLength, methodNames) != null;
	}

	/**
	 * 根据方法名称获取方法
	 * 
	 * @param clazz
	 *            类
	 * @param parameterLength
	 *            参数数量
	 * @param methodNames
	 *            可能的方法名称
	 * @return 方法，找不到返回NULL
	 */
	private static Method findMethod(Class<?> clazz, int parameterLength,
			String... methodNames) {
		Method ret = null;
		for (Method m : clazz.getMethods())
			for (String methodName : methodNames)
				if (m.getName().equals(methodName)
						&& m.getParameterTypes().length == parameterLength) {
					if (m.getReturnType().equals(Object.class)) {
						ret = m;
						continue;
					}
					return m;
				}
		return ret;
	}

	/**
	 * 判断是否有读取方法
	 * 
	 * @param clazz
	 * @param propertyName
	 * @return
	 */
	public static boolean hasGetMethod(Class<?> clazz, String propertyName) {
		return hasMethod(clazz, 0, nameForGet(propertyName),
				nameForIs(propertyName), nameForHas(propertyName));
	}

	/**
	 * 查找类的get方法
	 * 
	 * @param clazz
	 * @param propertyName
	 * @return
	 */
	public static Method findGetMethod(Class<?> clazz, String propertyName) {
		return findMethod(clazz, 0, nameForGet(propertyName),
				nameForIs(propertyName), nameForHas(propertyName));
	}
	
	/**
	* @Title: hasProperty
	* @Description: 检查指定属性是否存在
	* @param clazz
	* @param propertyName
	* @return
	* @return Boolean
	 */
	public static Boolean hasProperty(Class<?> clazz, String propertyName){
		if(clazz==null)return false;
	    try {
	    	clazz.getDeclaredField(propertyName);
	    	return true;
	    }
	    catch (NoSuchFieldException e) {
	      return false;
	    }
	}
}
