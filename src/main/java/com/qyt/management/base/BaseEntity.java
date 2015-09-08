package com.qyt.management.base;

import com.qyt.management.uc.user.domain.User;

import java.util.Date;

/**
 * Created by wys on 2015/8/15.
 */
public class BaseEntity {


    private Integer createdBy;
    private Date createdAt;
    private Date updatedAt;
    private Integer updatedBy;

    private long createdAtBegin;
    private long createdAtEnd;

    private Date createdAtBeginDate;
    private Date createdAtEndDate;


    public void initChangeLog(boolean isUpdateCreatedAt){
        int userId = User.getCurrentLoginUser().getUserId();
        if (userId > 0){
            if(isUpdateCreatedAt){
                this.setCreatedAt(new Date());
                this.setCreatedBy(userId);
            }
            this.setUpdatedAt(new Date());
            this.setUpdatedBy(userId);
        }
    }


    public Integer getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }


    public long getCreatedAtBegin() {
        return createdAtBegin;
    }

    public void setCreatedAtBegin(long createdAtBegin) {
        this.createdAtBegin = createdAtBegin;
    }

    public long getCreatedAtEnd() {
        return createdAtEnd;
    }

    public void setCreatedAtEnd(long createdAtEnd) {
        this.createdAtEnd = createdAtEnd;
    }

    public Date getCreatedAtBeginDate() {
        return createdAtBeginDate;
    }

    public void setCreatedAtBeginDate(Date createdAtBeginDate) {
        this.createdAtBeginDate = createdAtBeginDate;
    }

    public Date getCreatedAtEndDate() {
        return createdAtEndDate;
    }

    public void setCreatedAtEndDate(Date createdAtEndDate) {
        this.createdAtEndDate = createdAtEndDate;
    }
}
