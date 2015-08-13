package com.qyt.management.storage.stock.ctrl;


import com.qyt.management.parameters.service.ParameterService;
import com.qyt.management.platform.exception.BusinessException;
import com.qyt.management.platform.helper.DateHelper;
import com.qyt.management.platform.helper.ParameterHelper;
import com.qyt.management.platform.helper.ValidatorHelper;
import com.qyt.management.platform.web.PagingBean;
import com.qyt.management.storage.stock.domain.StockLine;
import com.qyt.management.storage.stock.service.StockLineService;
import com.qyt.management.storage.stock.service.StockService;
import com.qyt.management.uc.user.domain.User;
import com.qyt.management.uc.user.service.UserService;
import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.poi.hssf.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * @author wangys
 * @description
 * @date 2015-01-12
 */
@Controller
@RequestMapping(value = "pdm/stock_line")
public class StockLineController {

    private static final Logger logger = LoggerFactory.getLogger(StockLineController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private StockLineService stockLineService;

    @Autowired
    private StockService stockService;

    @Autowired
    private ParameterService parameterService;


    private static final String WAREHOUSES_PAGE_INDEX = "management/storage/stockline/index_stockline";


    /**
     * 首页
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "index", method = RequestMethod.GET)
    public String index(HttpServletRequest request, int type) throws Exception {
        // 1:入库   2:出库
        request.setAttribute("type", type);
        return WAREHOUSES_PAGE_INDEX;
    }

    /**
     * 统计
     *
     * @return
     */
    @RequestMapping(value = "statistic", method = RequestMethod.GET)
    public String statistic() {
        return "management/storage/statistic/index_statistic";
    }


    /**
     * 分页查询
     *
     * @param pb
     * @param stockLine
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseBody
    public PagingBean<StockLine> selectEntities(PagingBean<StockLine> pb, StockLine stockLine) throws Exception {
        ParameterHelper.trimToNullAndEncodeStringFields(stockLine, true);

        if (stockLine.getCreatedAtBegin() != 0) {
            stockLine.setCreatedAtBeginDate(new Date(stockLine.getCreatedAtBegin()));
        }

        if (stockLine.getCreatedAtEnd() != 0) {
            stockLine.setCreatedAtEndDate(new Date(stockLine.getCreatedAtEnd() + (24 * 3600 * 1000 - 1000)));
        }

        pb.setCondition(stockLine);
        stockLineService.selectEntities(pb);
        return pb;
    }


    /**
     * 通过id获取单条记录
     *
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @ResponseBody
    public StockLine selectEntityById(@PathVariable Integer id) throws Exception {
        StockLine stockLine = stockLineService.selectEntityById(id);
        return stockLine;
    }

    /**
     * 通过id获取单条记录
     *
     * @param stockId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "getStockLineByStockId/{stockId}", method = RequestMethod.GET)
    @ResponseBody
    public List<StockLine> getStockLineByStockId(@PathVariable Integer stockId) throws Exception {
        return stockLineService.getStockLineByStockId(stockId);
    }

    /**
     * 新增
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "add", method = RequestMethod.POST)
    @ResponseBody
    public StockLine insertEntity(@Valid StockLine stockLine, BindingResult result) throws Exception {
        ValidatorHelper.validate(result);
        //  获取当前登录用户设置为创建人
        User currUser = User.getCurrentUser();
        stockLine.setCreatedBy(currUser.getId());
        stockLine.setCreatedAt(new Date());
        logger.info("insert stockLine");
        stockLineService.insertEntity(stockLine);
        return stockLine;
    }


    /**
     * 更新
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "update", method = RequestMethod.PUT)
    @ResponseBody
    public void updateEntity(@Valid StockLine stockLine, BindingResult result) throws Exception {
        ValidatorHelper.validate(result);
        stockLineService.updateEntity(stockLine);
    }

    /**
     * 删除
     *
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void deleteEntity(@PathVariable Integer id) throws Exception {
        stockLineService.deleteEntity(id);
    }


    /**
     * 导出文件
     *
     * @throws Exception
     */
    @RequestMapping(value = "/export", method = RequestMethod.GET)
    public void export(StockLine queryParam, HttpServletResponse response) throws Exception {
        PagingBean<StockLine> pg = new PagingBean<>();
        pg.setStart(0);
        pg.setLimit(Integer.MAX_VALUE);
        PagingBean<StockLine> pagingBean = this.selectEntities(pg, queryParam);

        if (null == pagingBean.getRows() || pagingBean.getRows().size() == 0) {
            throw new BusinessException("没有数据");
        } else {
            HSSFWorkbook wb = buildWorkbook(pagingBean.getRows());

            response.setCharacterEncoding("UTF-8");
            response.setContentType("octets/stream");
            response.addHeader("Content-Disposition", "attachment;filename=stock_" + DateHelper.dateFormat(new Date(Calendar.getInstance().getTimeInMillis()), "yyyyMMddHHmmssSSS") + ".xls");
            OutputStream out = response.getOutputStream();
            wb.write(out);
            out.close();
        }
    }

    /**
     * 创建book
     *
     * @return
     */
    private HSSFWorkbook buildWorkbook(List<StockLine> list) {
        HSSFWorkbook wb = new HSSFWorkbook();    // 创建一个webbook，对应一个Excel文件
        HSSFSheet sheet = wb.createSheet("库存统计数据");   // 在webbook中添加一个sheet,对应Excel文件中的sheet
        sheet.setDefaultColumnWidth(15);     // 设置表格默认列宽度为15个字节
        HSSFRow row = sheet.createRow(0);   // 在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
        HSSFCellStyle style = wb.createCellStyle();   // 创建单元格，并设置值表头 设置表头居中
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式

        String[] headers = {"产品名称", "数量", "类型","仓库", "日期", "安全库存数量"};

        for (int j = 0; j < headers.length; j++) {
            HSSFCell cell = row.createCell(j);
            cell.setCellValue(headers[j]);
            cell.setCellStyle(style);
        }

        for (int i = 0; i < list.size(); i++) {
            row = sheet.createRow(i + 1);
            StockLine stockLine = list.get(i);
            row.createCell(0).setCellValue(stockLine.getProductName());
            row.createCell(1).setCellValue(stockLine.getNum());
            row.createCell(2).setCellValue(stockLine.getType() == 1 ? "入库" : "出库");
            row.createCell(3).setCellValue(stockLine.getWarehouseName());
            row.createCell(4).setCellValue(DateFormatUtils.format(stockLine.getCreatedAt(), "yyyy-MM-dd"));
            row.createCell(5).setCellValue(stockLine.getMinNumber());
        }
        return wb;
    }


}