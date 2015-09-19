package com.qyt.management.storage.order.domain;

/**
 * Created by wys on 2015/9/19.
 */
public enum OrderStatus {
    xindan(1),
    daifahuo(2),
    yifahuo(3),
    querenshouhuo(4),
    yiquxiao(10);

    private final int value;

    private OrderStatus(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static OrderStatus findByValue(int value) {
        switch (value) {
            case 1:
                return xindan;
            case 2:
                return daifahuo;
            case 3:
                return yifahuo;
            case 4:
                return querenshouhuo;
            case 10:
                return yiquxiao;
            default:
                return null;
        }
    }


}
