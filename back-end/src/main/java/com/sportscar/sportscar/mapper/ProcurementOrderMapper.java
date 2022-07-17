package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.procurement_order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface ProcurementOrderMapper {
    @Select("SELECT * FROM sportscar.procurement_order where(orderID=#{orderID});")
    public procurement_order getProcurement(int orderID);
}
