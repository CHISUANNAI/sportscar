package com.sportscar.sportscar.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sportscar.sportscar.bean.Invoice_detail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import java.util.List;
@Mapper
public interface InvoiceDetailMapper extends BaseMapper<Invoice_detail> {

    @Select("select supplierID  from  procurement_order p where p.sub_orderID=#{sub_orderID}")
    Integer  getsupplierid(String sub_orderID);

    @Select("select userID  from  procurement_order p where p.sub_orderID=#{sub_orderID}")
    Integer getuserid(String sub_orderID);

    @Select("select materialID  from  procurement_order p where p.sub_orderID=#{sub_orderID}")
    Integer getmaterailid(String sub_orderID);

    @Select("select amount from  procurement_order p where p.sub_orderID=#{sub_orderID}")
    Integer getamount(String sub_orderID);

    @Select("select price from  procurement_order p where p.sub_orderID=#{sub_orderID}")
    Float getprice(String sub_orderID);



}