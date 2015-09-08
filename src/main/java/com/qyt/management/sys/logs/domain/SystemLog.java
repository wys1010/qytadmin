package com.qyt.management.sys.logs.domain;/**
 * Created by sprite on 10/29/14.
 */

import java.util.Date;

/**
 * @author wangyiqun
 * @date 10/29/14
 */
public class SystemLog {

    private Long logId;

    private String method;

    private String logLevel;

    private String msg;

    private String line;

    private String currUserId;

    private String ip;

    private String requestType;

    private String action;

    private String currUserPassport;

    private String className;

    private String path;

    private String result;

    private Date createdAt;

    public Long getLogId() {

        return logId;
    }

    public void setLogId(Long logId) {

        this.logId = logId;
    }

    public String getMethod() {

        return method;
    }

    public void setMethod(String method) {

        this.method = method;
    }

    public String getLogLevel() {

        return logLevel;
    }

    public void setLogLevel(String logLevel) {

        this.logLevel = logLevel;
    }

    public String getMsg() {

        return msg;
    }

    public void setMsg(String msg) {

        this.msg = msg;
    }

    public String getLine() {

        return line;
    }

    public void setLine(String line) {

        this.line = line;
    }

    public String getCurrUserId() {

        return currUserId;
    }

    public void setCurrUserId(String currUserId) {

        this.currUserId = currUserId;
    }

    public String getIp() {

        return ip;
    }

    public void setIp(String ip) {

        this.ip = ip;
    }

    public String getRequestType() {

        return requestType;
    }

    public void setRequestType(String requestType) {

        this.requestType = requestType;
    }

    public String getAction() {

        return action;
    }

    public void setAction(String action) {

        this.action = action;
    }

    public String getCurrUserPassport() {

        return currUserPassport;
    }

    public void setCurrUserPassport(String currUserPassport) {

        this.currUserPassport = currUserPassport;
    }

    public String getClassName() {

        return className;
    }

    public void setClassName(String className) {

        this.className = className;
    }

    public String getPath() {

        return path;
    }

    public void setPath(String path) {

        this.path = path;
    }

    public String getResult() {

        return result;
    }

    public void setResult(String result) {

        this.result = result;
    }

    public Date getCreatedAt() {

        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {

        this.createdAt = createdAt;
    }
}
