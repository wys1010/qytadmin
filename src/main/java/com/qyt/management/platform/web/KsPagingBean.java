package com.qyt.management.platform.web;

import com.qyt.management.platform.helper.PropertyHelper;
import com.qyt.management.platform.web.*;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;


/**
 * 分页对象
 *
 * @author tianya
 * @description
 * @date 2013-8-22
 */
public class KsPagingBean<C,D> {

    public static final String PAGING_BEAN = "pagingBean";

    public static final String DIRECTION_ASC = "asc";

    public static final String DIRECTION_DESC = "desc";

    private static final Logger logger = LoggerFactory.getLogger(com.qyt.management.platform.web.PagingBean.class);

    /**
     * 排序字段
     */
    private String field;


    private C condition;

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
    private List<D> rows;

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


    private Class domainClass;

    public void setDomainClass(Class domainClass) {

        this.domainClass = domainClass;
    }

    /**
     * @return String
     * @throws
     * @Title: getSortInfo
     * @Description: 获取排序信息
     */
    public String getSortInfo() {


        if (StringUtils.isEmpty(field)) {
            return "";
        }
        String[] underLineFields = StringUtils.splitByCharacterTypeCamelCase(field);
        String underLineField = StringUtils.join(underLineFields,"_").toLowerCase();

        Boolean hasField = PropertyHelper.hasProperty(domainClass, field);
        if (hasField && !StringUtils.isEmpty(direction)) {
            if (DIRECTION_ASC.equals(direction.toLowerCase()) || DIRECTION_DESC.equals(direction.toLowerCase())) {
                return "" + underLineField + " " + direction;
            }
        }
        return "";
    }

    public Integer getPageIndex() {

        return pageIndex == null ? 0 : pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {

        this.pageIndex = pageIndex;
    }

    public Integer getLimit() {

        return limit == null ? 30 : limit;
    }

    public void setLimit(Integer limit) {

        this.limit = limit;
    }



    public Integer getResults() {

        return results;
    }

    public void setResults(Integer results) {
        this.results = results;
        this.pageIndex = this.getStart() / this.getLimit();
        double  d=Math.ceil( this.results / this.getLimit());
        int totalPage=this.results / this.getLimit();
        if(this.results% this.getLimit()!=0){
            totalPage=totalPage+1;
        }

        if(totalPage==0)totalPage=1;
        this.totalPage =totalPage;
    }

    public Boolean getResult() {

        return result;
    }

    public void setResult(Boolean result) {

        this.result = result;
    }

    public List<D> getRows() {

        return rows;
    }

    public void setRows(List<D> rows) {

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

        return start == null ? 0 : start;
    }

    public void setStart(Integer start) {

        this.start = start;
    }

    public C getCondition() {

        return condition;
    }

    public void setCondition(C condition) {

        this.condition = condition;
    }
}
