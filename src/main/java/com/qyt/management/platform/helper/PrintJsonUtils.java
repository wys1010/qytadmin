package com.qyt.management.platform.helper;/**
 *
 * Created by e.fly on 14-10-9.
 * com.kuaisuwang.requirement.Helper
 */

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

/**
 * @author E.FLY
 * @date 2014-10-09
 * @time 10:08
 */
public class PrintJsonUtils {
    /**
     * 负责为AJAX提供JSON信息
     * @param jsonStr
     */
    public static void print(HttpServletResponse response,String jsonStr){
        response.setContentType("application/json; charset=UTF-8");
//        PrintWriter pw = null;
        try {
//            pw = new PrintWriter(new OutputStreamWriter(response.getOutputStream(), "UTF-8"));
//            pw.print(jsonStr);
            response.getWriter().print(jsonStr);
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            //关闭流
//            if(null != pw)
//                pw.close();
        }
    }
}
