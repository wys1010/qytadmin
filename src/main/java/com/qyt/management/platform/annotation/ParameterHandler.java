package com.qyt.management.platform.annotation;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * @author Wangyiqun
 * @date 2015-01-14
 */
@java.lang.annotation.Target({java.lang.annotation.ElementType.METHOD, java.lang.annotation.ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@java.lang.annotation.Documented
public @interface ParameterHandler {

    public String trimToNullFields();

    public String decodeFields() default "";

}
