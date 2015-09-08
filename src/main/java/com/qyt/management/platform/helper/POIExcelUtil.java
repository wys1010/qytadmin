package com.qyt.management.platform.helper;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

import com.qyt.management.platform.exception.BusinessException;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


/** 
 * * 
 * @version 1.0
 * @description  解析excel
 * @author zheng.shk
 * @created 2014-5-26 下午4:44:00
 */

public class POIExcelUtil {

	   /** 总行数 */
    private int totalRows = 0;
    
    /** 总列数 */
    private int totalCells = 0;
    
    
    /**限制的总行数*/
    private int limitTotalRows =65536;
    
    /** 构造方法 */
    public POIExcelUtil()
    {}
    
    private DecimalFormat df = new DecimalFormat("0.00");
    
    /**
     * <ul>
     * <li>Description:[根据文件名读取excel文件]</li>
     * <li>Created by [Huyvanpull] [Jan 20, 2010]</li>
     * <li>Midified by [modifier] [modified time]</li>
     * <ul>
     * 
     * @param fileName
     * @return
     * @throws BusinessException 
     * @throws Exception
     */
    public List<ArrayList<String>> read(String fileName) throws BusinessException
    {
        List<ArrayList<String>> dataLst = new ArrayList<ArrayList<String>>();
        
        try
        {
            boolean isExcel2003 = true;
            /** 对文件的合法性进行验证 */
            if (fileName.matches("^.+\\.(?i)(xlsx)$"))
            {
                isExcel2003 = false;
            }
            
        	File file = new File(fileName);
            /** 调用本类提供的根据流读取的方法 */
            dataLst = read(new FileInputStream(file), isExcel2003);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
        
        /** 返回最后读取的结果 */
        return dataLst;
    }
    
    /**
     * <ul>
     * <li>Description:[根据流读取Excel文件]</li>
     * <li>Midified by [modifier] [modified time]</li>
     * <ul>
     * 
     * @param inputStream
     * @param isExcel2003
     * @return
     * @throws BusinessException 
     */
    public List<ArrayList<String>> read(InputStream inputStream,boolean isExcel2003) throws BusinessException
    {
        List<ArrayList<String>> dataLst = null;
        try
        {
            /** 根据版本选择创建Workbook的方式 */
            Workbook wb = isExcel2003 ? new HSSFWorkbook(inputStream)
                    : new XSSFWorkbook(inputStream);
            dataLst = read(wb);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        return dataLst;		
    }
    
    /**
     * <ul>
     * <li>Description:[得到总行数]</li>
     * <li>Midified by [modifier] [modified time]</li>
     * <ul>
     * 
     * @return
     */
    public int getTotalRows()
    {
        return totalRows;
    }
    
    /**
     * <ul>
     * <li>Description:[得到总列数]</li>
     * <ul>
     * 
     * @return
     */
    public int getTotalCells()
    {
        return totalCells;
    }

    public List<ArrayList<String>> read(Workbook wb) throws BusinessException {
        return read(wb, 1);
    }

    /**
     * <li>Description:[读取数据]</li>
     * 
     * @param wb
     * @return
     * @throws BusinessException 
     */
    public List<ArrayList<String>> read(Workbook wb, int rowStart) throws BusinessException
    {
        List<ArrayList<String>> dataLst = new ArrayList<ArrayList<String>>();
        
        /** 得到第一个shell */
        Sheet sheet = wb.getSheetAt(0);
        this.totalRows = sheet.getPhysicalNumberOfRows();
        if (this.totalRows >= 1 && sheet.getRow(0) != null)
        {
            this.totalCells = sheet.getRow(0).getPhysicalNumberOfCells();
        }
        
        /** 循环Excel的行  zheng.sk,如果去掉第一行，则从1开始循环*/
        for (int r = rowStart; r < this.totalRows; r++)
        {
            Row row = sheet.getRow(r);
            //如果每行第一列为空则默认这列都为空
            if (row == null || row.getCell(0) == null)
            {
                continue;
            }
            
            ArrayList<String> rowLst = new ArrayList<String>();
            /** 循环Excel的列   */
            for (short c = 0; c < this.getTotalCells(); c++)
            {
                Cell cell = row.getCell(c);
                String cellValue = "";
                if (cell == null)
                {
                    rowLst.add(cellValue);
                    continue;
                }
                  //zheng.sk  对于数字的类型转换
                if(Cell.CELL_TYPE_NUMERIC==cell.getCellType()){
                    //读取excel整数的时候默认会加个小数点,为了不让加小数点特作此判断
                    String numberValue = String.valueOf(cell.getNumericCellValue());
                    if(numberValue.contains(".")){
                        String[] splitStr = numberValue.split("\\.");
                        String round  = splitStr[0];
                        String decimal  = splitStr[1];
                        if (Integer.valueOf(decimal) == 0){
                            rowLst.add(round);
                        }else{
                            rowLst.add(String.valueOf(df.format(cell.getNumericCellValue())));
                        }
                    }else{
                        rowLst.add(numberValue);
                    }
                }else{
                	rowLst.add(cell.getStringCellValue());
                }
            }
            dataLst.add(rowLst);
        }
        return dataLst;
    }
    
    
    public void validateExcel(String  fileName) throws BusinessException, FileNotFoundException, IOException{
        /** 检查文件名是否为空或者是否是Excel格式的文件 */
        if (fileName == null || !fileName.matches("^.+\\.(?i)((xls)|(xlsx))$"))
        {
        	throw new BusinessException("文件不是excel格式");
        }
        boolean isExcel2003 = true;
        if (fileName.matches("^.+\\.(?i)(xlsx)$"))
        {
            isExcel2003 = false;
        }
        
    	File file = new File(fileName);
		Workbook wb = isExcel2003 ? new HSSFWorkbook(new FileInputStream(file))
					  : new XSSFWorkbook(new FileInputStream(file));
	    Sheet sheet = wb.getSheetAt(0);
	    this.totalRows = sheet.getPhysicalNumberOfRows();
	    if((totalRows-1)>limitTotalRows){
	        	file.delete();
	        	throw new BusinessException("excel数据总行数不能超过"+limitTotalRows+"");
	    }
	    if(totalRows<2){
	        	file.delete();
	        	throw new BusinessException("excel数据总行数不能少于1");
	    }	        
        
    }
    
    
    public Workbook validateExcel(String  fileName,InputStream is) throws BusinessException, FileNotFoundException, IOException{
        /** 检查文件名是否为空或者是否是Excel格式的文件 */
        if (fileName == null || !fileName.matches("^.+\\.(?i)((xls)|(xlsx))$"))
        {
        	throw new BusinessException("文件不是excel格式");
        }
        boolean isExcel2003 = true;
        if (fileName.matches("^.+\\.(?i)(xlsx)$"))
        {
            isExcel2003 = false;
        }
        
		Workbook wb = isExcel2003 ? new HSSFWorkbook(is): new XSSFWorkbook(is);
	    Sheet sheet = wb.getSheetAt(0);
	    this.totalRows = sheet.getPhysicalNumberOfRows();
	    if((totalRows-1)>limitTotalRows){
	        	throw new BusinessException("excel数据总行数不能超过"+limitTotalRows+"");
	    }
	    if(totalRows<2){
	        	throw new BusinessException("excel数据总行数不能少于1");
	    }	        
        return wb;
    }

    public List<ArrayList<String>> readEx(Workbook wb, int rowStart) throws BusinessException
    {
        List<ArrayList<String>> dataLst = new ArrayList<ArrayList<String>>();

        /** 得到第一个shell */
        Sheet sheet = wb.getSheetAt(0);
        this.totalRows = sheet.getPhysicalNumberOfRows();
        if (this.totalRows >= 1 && sheet.getRow(0) != null)
        {
            this.totalCells = sheet.getRow(0).getPhysicalNumberOfCells();
        }

        /** 循环Excel的行  zheng.sk,如果去掉第一行，则从1开始循环*/
        for (int r = rowStart; r < this.totalRows; r++)
        {
            Row row = sheet.getRow(r);

            ArrayList<String> rowLst = new ArrayList<String>();
            /** 循环Excel的列   */
            for (short c = 0; c < this.getTotalCells(); c++)
            {
                Cell cell = row.getCell(c);
                String cellValue = "";
                if (cell == null)
                {
                    rowLst.add(cellValue);
                    continue;
                }

                cell.setCellType(Cell.CELL_TYPE_STRING);

                if(Cell.CELL_TYPE_NUMERIC==cell.getCellType()){
                    //读取excel整数的时候默认会加个小数点,为了不让加小数点特作此判断
                    String numberValue = String.valueOf(cell.getNumericCellValue());
                    rowLst.add(numberValue);
                }else{
                    rowLst.add(cell.getStringCellValue());
                }
            }
            dataLst.add(rowLst);
        }
        return dataLst;
    }

    /**
     * <ul>
     * <li>Description:[测试main方法]</li>
     * <li>Midified by [modifier] [modified time]</li>
     * <ul>
     * 
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception
    {
        List<ArrayList<String>> dataLst = new POIExcelUtil().read("E:/priceFile/sellerPrices.xlsx");
        System.out.println("rowSize:"+dataLst.size());
        for(int i=0;i<dataLst.size();i++){
        	ArrayList<String> cellLst = dataLst.get(i);
        	System.out.println("cellSize:"+cellLst.size());
        	for(int j=0;j<cellLst.size();j++){
        		System.out.print(cellLst.get(j)+"|");
        	}
        }
        System.out.println("OK");
    }
}
