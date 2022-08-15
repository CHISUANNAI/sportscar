package com.sportscar.sportscar.mapper;


import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sportscar.sportscar.bean.Payment_detail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface PaymentMapper extends BaseMapper<Payment_detail> {
    @Select("select sum(price) from procurement_order p where p.orderID=#{orderID}")
    Float countprice(String orderID);


}
