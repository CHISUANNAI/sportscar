package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.bean.Invoice_detail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface ProcurementOrderMapper {
    @Select("SELECT * FROM sportscar.procurement_order where(orderID=#{orderID});")
    public Procurement_order getProcurement(int orderID);
    Procurement_order SelectPOBysubpo(Integer sub_orderID);
    List<Integer> SelectPO(Integer orderID);
    Material SelectMaterialBysub(Integer materialID);
    Invoice_detail SelectInvoiceDetailBysub(Integer sub_orderID);
}
