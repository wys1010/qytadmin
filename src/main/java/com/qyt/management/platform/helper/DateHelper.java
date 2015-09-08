package com.qyt.management.platform.helper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by leave on 14-10-18.
 */
public class DateHelper {


    private static final Logger logger = LoggerFactory.getLogger(DateHelper.class);

    /**
     * 判断一个  日期   是否在某个时间段之内
     * @param begin 开始时间
     * @param end  结束时间
     * @param contais  被包含的时间
     * @return
     */
    public static boolean beginEndDateContais(Date begin, Date end, Date contais){
        Long b = begin.getTime();
        Long e = end.getTime();
        Long c = contais.getTime();

        if (b <= c && e >= c) {
            return true;
        }
        return false;
    }
    /**
     * 日期格式化
     * @param date
     * @param format
     * @return String类型的字符串
     */
    public static String dateFormat(Date date ,String format){
        SimpleDateFormat dateFormat = new SimpleDateFormat(format);
        return dateFormat.format(date);
    }

    public static Date parse(String dateStr, String pattern) {
        Date ret = null;
        try{
            SimpleDateFormat format = new SimpleDateFormat(pattern);
            ret = format.parse(dateStr);
            return ret;
        } catch (ParseException e) {
            logger.warn("date format error! format:" + pattern + ",input:" + dateStr, e);
            return null;
        }
    }

    /**
     * @param date
     * @param isContais 是否包含当天
     * @return 获取日期，清除时分秒
     */
    public static Date cleanTime(Date date,boolean isContais) {
        if (null == date) {
            return null;
        }
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        if(isContais){
            calendar.add(Calendar.DATE,1);
        }
        return calendar.getTime();
    }

    /**
     * 获取两个时间相隔的天数
     * @param date1 前一个时间
     * @param date2 后一个时间
     * @return
     */
    public static int daysInterval(Date date1, Date date2){

        Calendar cal = Calendar.getInstance();

        cal.setTime(date1);

        long time1 = cal.getTimeInMillis();

        cal.setTime(date2);

        long time2 = cal.getTimeInMillis();

        long between_days = (time2 - time1) / (1000 * 3600 * 24);

        return Integer.parseInt(String.valueOf(between_days));

    }

    /**
     * 获取两个时间相隔的周数
     * @param date1 前一个时间
     * @param date2 后一个时间
     * @return
     */
    public static int weeksInterval(Date date1, Date date2){
        return daysInterval(date1,date1)/7;

    }

    /**
     * 获取一个时间列表
     * @param startTime 开始时间
     * @param size  列表大小
     * @param interval 两个时间的间隔
     * @return
     */
    public static List<String> getTimeList(Date startTime, String pattern, int size, int interval){
        Date currentDate = startTime;
        List<String> result = new ArrayList<String>();
        result.add(dateFormat(currentDate,pattern));
        for (int i = 0; i < size; i++) {
            currentDate = getAfterDate(currentDate,interval);
            result.add(dateFormat(currentDate,pattern));
        }
        return result;
    }


    public static Date getAfterDate(Date currentDate,int interval){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.DATE, interval);
        return new Date(calendar.getTimeInMillis());
    }

    /**
     * 设置时间
     * @param year
     * @param month
     * @param date
     * @return
     */
    private static Calendar setCalendar(int year,int month,int date){
        Calendar cl = Calendar.getInstance();
        cl.set(year, month-1, date);
        return cl;
    }

    public static void main(String[] args){
        //当前时间
        Calendar cl = setCalendar(2015,03,30);
        System.out.print("当前时间:");
        Date date1 = new Date(cl.getTimeInMillis());
        List<String> list = getTimeList(date1,"yyMMdd",5,7);

        System.out.println(Arrays.toString(list.toArray(new String[5])));
    }

}