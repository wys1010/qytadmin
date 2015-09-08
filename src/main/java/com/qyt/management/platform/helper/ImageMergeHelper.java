package com.qyt.management.platform.helper;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.Transparency;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;

import javax.imageio.ImageIO;


/**
 * @author zheng.sk
 * @description  图片合成工具类
 * @date 2014年11月26日 下午1:24:04
 * @version 1.0
 */
public class ImageMergeHelper {

	
	
	  /**
	   * @des 将第二张图片，合并到第一张图片上
	   * @param ImageOnePath 第一张图片全路径
	   * @param ImageTwoPath 第二张图片全路径
	   * @param newImagePath 合成的图片全路径
	   * @param x  图片合成时，起始 x 坐标
	   * @param y  图片合成时，起始 y 坐标
	   * @return   true:图片合成成功; false:图片合成失败
	   */
	  public static boolean mergeImage(String ImageOnePath,String ImageTwoPath,String newImagePath,int x,int y)
	  {
	      try
	      {
	        //读取第一张图片
	        File fileOne = new File(ImageOnePath);
	        BufferedImage imageOne = ImageIO.read(fileOne);
	        int width = imageOne.getWidth();//图片宽度
	        int height = imageOne.getHeight();//图片高度
	        //从图片中读取RGB
	        int[] imageArrayOne = new int[width*height];
	        imageArrayOne = imageOne.getRGB(0,0,width,height,imageArrayOne,0,width);
	        
	        //对第二张图片做相同的处理
	        File fileTwo = new File(ImageTwoPath);
	        BufferedImage imageTwo = ImageIO.read(fileTwo);
	        int widthTwo = imageTwo.getWidth();//图片宽度
	        int heightTwo = imageTwo.getHeight();//图片高度

	        
	      //创建java2D对象  
            Graphics2D g2d=imageTwo.createGraphics();  
            //设置透明度  
            imageTwo =g2d.getDeviceConfiguration().createCompatibleImage(width, height, Transparency.TRANSLUCENT);
            g2d.dispose();  
            g2d = imageTwo.createGraphics();
		        int[] imageArrayTwo = new int[widthTwo*heightTwo];
		        imageArrayTwo = imageTwo.getRGB(0,0,widthTwo,heightTwo,imageArrayTwo,0,widthTwo);
	        
	        //生成新图片
	        BufferedImage imageNew = new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
	        imageNew.setRGB(0,0,width,height,imageArrayOne,0,width);//设置左半部分的RGB
	        imageNew.setRGB(x,y,widthTwo,heightTwo,imageArrayTwo,0,widthTwo);//设置右半部分的RGB
	        File outFile = new File(newImagePath);
	        ImageIO.write(imageNew, "png", outFile);//写图片
	        return true;

	      }
	      catch(Exception e)
	      {
	        e.printStackTrace();
	        return false;
	      }
	  }
	
	
	   
		  /**
		   * @des 将第二张图片，合并到第一张图片上
		   * @param imageOneByte 第一张图片byte
		   * @param imageTwoPath 第二张图片全路径
		   * @return   合成图片的byte[]
		 * @throws IOException 
		   */
		  public static byte[] mergeImage(byte[] imageOneByte,String imageTwoPath) throws IOException
		  {
			  
		        //对第一张图片做相同的处理
		    	ByteArrayInputStream in1 = new ByteArrayInputStream(imageOneByte);
		    	BufferedImage imageOne = ImageIO.read(in1); 
		        int widthOne = imageOne.getWidth();//图片宽度
		        int heightOne = imageOne.getHeight();//图片高度
		        int[] imageArrayOne = new int[widthOne*heightOne];
		        imageArrayOne = imageOne.getRGB(0,0,widthOne,heightOne,imageArrayOne,0,widthOne);
			  
		        //读取第二张图片
		        //实例化url
	            URL url = new URL(imageTwoPath);
	            //载入图片到输入流
	            BufferedInputStream bis = new BufferedInputStream(url.openStream());
		        BufferedImage imageTwo = ImageIO.read(bis);
		        int widthTwo = imageTwo.getWidth();//图片宽度
		        int heightTwo = imageTwo.getHeight();//图片高度
		        //从图片中读取RGB
		        int[] imageArrayTwo = new int[widthTwo*heightTwo];
		        imageArrayTwo = imageTwo.getRGB(0,0,widthTwo,heightTwo,imageArrayTwo,0,widthTwo);
		        
		        int x = widthOne - widthTwo-60;
		        int y = heightOne - heightTwo-60;
		        //生成新图片
		        BufferedImage imageNew = new BufferedImage(widthOne,heightOne,BufferedImage.TYPE_INT_RGB);
		        imageNew.setRGB(0,0,widthOne,heightOne,imageArrayOne,0,widthOne);//设置左半部分的RGB
		        imageNew.setRGB(x,y,widthTwo,heightTwo,imageArrayTwo,0,widthTwo);//设置右半部分的RGB
		        ByteArrayOutputStream out = new ByteArrayOutputStream();
		        ImageIO.write(imageNew, "png",  out);//写图片
		        return out.toByteArray();

		  }
		  
		  
		  /**
		   * @des 将2张图片合并，第二张图片，合并到第一张图片上
		   * @param imageOneByte  第一张图片byte[] 
		   * @param imageTwoByte  第二张图片byte[] 
		   * @param x   图片合成时，起始 x 坐标
		   * @param y   图片合成时，起始 y 坐标
		   * @return    合成图片的byte[]
		   * @throws IOException
		   */
		  public static byte[] mergeImage(byte[] imageOneByte,byte[] imageTwoByte,int x,int y) throws IOException
		  {
		        //读取第一张图片
		    	ByteArrayInputStream in1 = new ByteArrayInputStream(imageOneByte);
		    	BufferedImage imageOne = ImageIO.read(in1); 
		        int width = imageOne.getWidth();//图片宽度
		        int height = imageOne.getHeight();//图片高度
		        //从图片中读取RGB
		        int[] imageArrayOne = new int[width*height];
		        imageArrayOne = imageOne.getRGB(0,0,width,height,imageArrayOne,0,width);
		        
		        //对第二张图片做相同的处理
		    	ByteArrayInputStream in2 = new ByteArrayInputStream(imageTwoByte);
		    	BufferedImage imageTwo = ImageIO.read(in2); 
		        int widthTwo = imageTwo.getWidth();//图片宽度
		        int heightTwo = imageTwo.getHeight();//图片高度
		        int[] imageArrayTwo = new int[widthTwo*heightTwo];
		        imageArrayTwo = imageTwo.getRGB(0,0,widthTwo,heightTwo,imageArrayTwo,0,widthTwo);
		        
		        //生成新图片
		        BufferedImage imageNew = new BufferedImage(width,height,BufferedImage.TYPE_INT_RGB);
		        imageNew.setRGB(0,0,width,height,imageArrayOne,0,width);//设置左半部分的RGB
		        imageNew.setRGB(x,y,widthTwo,heightTwo,imageArrayTwo,0,widthTwo);//设置右半部分的RGB
		        ByteArrayOutputStream out = new ByteArrayOutputStream();
		        ImageIO.write(imageNew, "png",  out);//写图片
		        return out.toByteArray();

		  }
		  
		  
		  
		    /** 
		     * 合同印章合并，将印章水印放到原图片的右下角   
		     *  ---- 当alpha==1时文字不透明（和在图片上直接输入文字效果一样） 
		     * @param srcImageByte  源图片byte
		     * @param appendImagePath   水印图片路径
		     * @return byte[]  返回结果图片
		     * @throws IOException  
		     */  
		  public static byte[] alphaImage2Image(byte[] srcImageByte,String appendImagePath) throws IOException{  
			    	ByteArrayInputStream in = new ByteArrayInputStream(srcImageByte);
			    	BufferedImage image = ImageIO.read(in); 
			        int srcImageWidth = image.getWidth();
			        int srcImageHeight = image.getHeight();
		            //创建java2D对象  
		            Graphics2D g2d=image.createGraphics();  
		            //用源图像填充背景  
		            g2d.drawImage(image, 0, 0, image.getWidth(), image.getHeight(), null, null);  
		            //设置透明度  
		            float alpha = 1.0F; 
		            AlphaComposite ac = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, alpha);  
		            g2d.setComposite(ac);  
		            
		            //设置水印图片的起始x/y坐标、宽度、高度  
		            URL url = new URL(appendImagePath);
		            BufferedInputStream bis = new BufferedInputStream(url.openStream());
			        BufferedImage appendImage = ImageIO.read(bis);
			        int appendImageWidth = appendImage.getWidth();
			        int appendImageHeight = appendImage.getHeight();
			        int x = srcImageWidth - appendImageWidth -60;
			        int y = srcImageHeight - appendImageHeight -60;
		            g2d.drawImage(appendImage, x, y, appendImageWidth, appendImageHeight, null, null);  
		            g2d.dispose();  
			        ByteArrayOutputStream out = new ByteArrayOutputStream();
			        ImageIO.write(image, "png",  out);//写图片
			        return out.toByteArray();
		    }



    /**
     * 合同印章合并，将印章水印放到自定义位置
     *  ---- 当alpha==1时文字不透明（和在图片上直接输入文字效果一样）
     * @param srcImageByte  源图片byte
     * @param appendImagePath   水印图片路径
     * @param xOffset     水印图片的起始x坐标
     * @param yOffset     水印图片的起始y坐标
     * @return byte[]  返回结果图片
     * @throws IOException
     */
    public static byte[] alphaImage2Image(byte[] srcImageByte,String appendImagePath, int xOffset, int yOffset) throws IOException{
        ByteArrayInputStream in = new ByteArrayInputStream(srcImageByte);
        BufferedImage image = ImageIO.read(in);
        int srcImageWidth = image.getWidth();
        int srcImageHeight = image.getHeight();
        //创建java2D对象
        Graphics2D g2d=image.createGraphics();
        //用源图像填充背景
        g2d.drawImage(image, 0, 0, image.getWidth(), image.getHeight(), null, null);
        //设置透明度
        float alpha = 1.0F;
        AlphaComposite ac = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, alpha);
        g2d.setComposite(ac);

        //设置水印图片的起始x/y坐标、宽度、高度
        URL url = new URL(appendImagePath);
        BufferedInputStream bis = new BufferedInputStream(url.openStream());
        BufferedImage appendImage = ImageIO.read(bis);
        int appendImageWidth = appendImage.getWidth();
        int appendImageHeight = appendImage.getHeight();
//        int x = srcImageWidth - appendImageWidth -60;
//        int y = srcImageHeight - appendImageHeight -60;
        g2d.drawImage(appendImage, xOffset, yOffset, appendImageWidth, appendImageHeight, null, null);
        g2d.dispose();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        ImageIO.write(image, "png",  out);//写图片
        return out.toByteArray();
    }




    /**
		     * 在源图像上设置图片水印   
		     *  ---- 当alpha==1时文字不透明（和在图片上直接输入文字效果一样） 
		     * @param srcImagePath  源图片路径 
		     * @param appendImagePath   水印图片路径 
		     * @param alpha 透明度 
		     * @param x     水印图片的起始x坐标 
		     * @param y     水印图片的起始y坐标 
		     * @param width 水印图片的宽度 
		     * @param height        水印图片的高度 
		     * @param imageFormat   图像写入图片格式 
		     * @param toPath    图像写入路径 
		     * @throws IOException  
		     */  
		  public static void alphaImage2Image(String srcImagePath,String appendImagePath,  
		            float alpha,int x,int y,int width,int height,  
		            String imageFormat,String toPath) throws IOException{  
		        FileOutputStream fos = null;  
		        try {  
		            BufferedImage image = ImageIO.read(new File(srcImagePath));  
		            //创建java2D对象  
		            Graphics2D g2d=image.createGraphics();  
		            //用源图像填充背景  
		            g2d.drawImage(image, 0, 0, image.getWidth(), image.getHeight(), null, null);  
		            //设置透明度  
		            AlphaComposite ac = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, alpha);  
		            g2d.setComposite(ac);  
		            //设置水印图片的起始x/y坐标、宽度、高度  
		            BufferedImage appendImage = ImageIO.read(new File(appendImagePath));  
		            g2d.drawImage(appendImage, x, y, width, height, null, null);  
		            g2d.dispose();  
		            fos=new FileOutputStream(toPath);  
		            ImageIO.write(image, imageFormat, fos);  
		        } catch (Exception e) {  
		           e.printStackTrace();  
		        }finally{  
		            if(fos!=null){  
		                fos.close();  
		            }  
		        }  
		    }  
		  
		 public static void main(String[] args) throws IOException {
			  String ImageOnePath = "d://a.png";
			  String ImageTwoPath = "d://b.png";
			  String newImagePath = "d://out.png";
			  float alpha = 1.0F; 
//			  mergeImage(ImageOnePath,ImageTwoPath,newImagePath,100, 170);
			  alphaImage2Image(ImageOnePath, ImageTwoPath, alpha, 100, 170, 300, 300, "png", newImagePath);
			  System.out.println("ok");
		 }
	
}
