package com.sportscar.sportscar.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sportscar.sportscar.bean.Invoice_detail;
import com.sportscar.sportscar.bean.Payment_detail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PaymentMapper extends BaseMapper<Payment_detail> {
    @Select("select sum(price) from procurement_order p where p.orderID=#{orderID}")
    Float countprice(String orderID);

    @Select("select sub_orderID,supplierID,userID,materialID,amount,price from invoice_detail i where i.sub_orderID in " +
            "(select sub_orderID from procurement_order p where p.orderID=#{orderID}) ")
    List<Invoice_detail> getinvoice(String orderID);

    @Select("select count(*) from payment_detail p where p.orderID=#{orderID}")
    Integer countpayment(String orderID);


}
