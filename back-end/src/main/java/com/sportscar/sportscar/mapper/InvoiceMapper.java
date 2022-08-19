package com.sportscar.sportscar.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sportscar.sportscar.bean.Invoice;
import com.sportscar.sportscar.bean.Procurement_order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface InvoiceMapper extends BaseMapper<Invoice> {
    @Select("select sub_orderID,supplierID,materialID,amount,price from procurement_order p where p.orderID=#{orderID} " +
            "and sub_orderID not in(select i.sub_orderID from invoice_detail i,procurement_order p where p.sub_orderID=i.sub_orderID and p.orderID=#{orderID})")
    List<Procurement_order> getsubid(String orderID);

    @Select("select distinct orderID from procurement_order p where p.orderID=#{orderID} ")
    String getid(String orderID);

    @Select("select distinct orderID from procurement_order p where p.sub_orderID=#{sub_orderID} ")
    String getorderid(String sub_orderID);


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
