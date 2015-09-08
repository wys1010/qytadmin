package com.qyt.management.platform.web;

import com.qyt.management.platform.helper.PropertyHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.util.List;


/**
 * 分页对象
 *
 * @author tianya
 * @description
 * @date 2013-8-22
 */
public class PagingBean<T> {

    public static final String DIRECTION_ASC = "asc";

    public static final String DIRECTION_DESC = "desc";

    private static final Logger logger = LoggerFactory.getLogger(PagingBean.class);

    /**
     * 排序字段
     */
    private String field;


    private T condition;

    /**
     * 方向
     */
    private String direction;

    /**
     * 总页数
     */
    private Integer totalPage;

    /**
     * 总记录数
     */
    private Integer results;

    /**
     * 查询的结果
     */
    private Boolean result;

    /**
     * 表格结果列
     */
    private List<T> rows;

    /**
     *  某次查询的起始记录
     */
    private Integer start;

    /**
     * 当前页
     */
    private Integer pageIndex;

    /**
     * 页大小
     */
    private Integer limit;


    /**
     * @return String
     * @throws
     * @Title: getSortInfo
     * @Description: 获取排序信息
     */
    public String getSortInfo() {


        if (StringUtils.isEmpty(field)) {
            return null;
        }
        String[] underLineFields = org.apache.commons.lang.StringUtils.splitByCharacterTypeCamelCase(field);
        String underLineField = org.apache.commons.lang.StringUtils.join(underLineFields,"_").toLowerCase();

        Boolean hasField = PropertyHelper.findGetMethod(condition.getClass(), field) != null;
        if (hasField && !StringUtils.isEmpty(direction)) {
            if (DIRECTION_ASC.equals(direction.toLowerCase()) || DIRECTION_DESC.equals(direction.toLowerCase())) {
                return "" + underLineField + " " + direction;
            }
        }
        return null;
    }

    public Integer getPageIndex() {

        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {

        this.pageIndex = pageIndex;
    }

    public Integer getLimit() {

        return limit;
    }

    public void setLimit(Integer limit) {

        this.limit = limit;
    }



    public Integer getResults() {

        return results;
    }

    public void setResults(Integer results) {

        this.results = results;
    }

    public Boolean getResult() {

        return result;
    }

    public void setResult(Boolean result) {

        this.result = result;
    }

    public List<T> getRows() {

        return rows;
    }

    public void setRows(List<T> rows) {

        this.rows = rows;
    }

    public Integer getTotalPage() {

        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {

        this.totalPage = totalPage;
    }

    public String getField() {

        return field;
    }

    public void setField(String field) {

        this.field = field;
    }

    public String getDirection() {

        return direction;
    }

    public void setDirection(String direction) {

        this.direction = direction;
    }

    public Integer getStart() {

        return start;
    }

    public void setStart(Integer start) {

        this.start = start;
    }

    public T getCondition() {

        return condition;
    }

    public void setCondition(T condition) {

        this.condition = condition;
    }
}
