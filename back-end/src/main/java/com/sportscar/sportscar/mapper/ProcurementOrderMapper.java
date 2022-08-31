package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.bean.Invoice_detail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import java.util.List;

@Mapper
public interface ProcurementOrderMapper {
//    @Select("SELECT * FROM sportscar.procurement_order where(orderID=#{orderID});")
//    public Procurement_order getProcurement(int orderID);
    /**yss*/
    Procurement_order SelectPOBysubpo(String sub_orderID);
    List<String> SelectPO(String orderID);
    Material SelectMaterialBysub(Integer materialID);
    Invoice_detail SelectInvoiceDetailBysub(String sub_orderID);
    //    public Procurement_order getProcurement(int orderID);
    /**dkn*/
    public int insertProcurementOrderSeries(List<Procurement_order> procurement_orderList);
    public Integer deleteProcurementOrderSeriesBySub_orderID(List<Procurement_order> procurement_orderList);
    public List<Procurement_order> selectPOBySubOrderID(List<Procurement_order> procurement_orderList);
    public List<Procurement_order> selectAllPO(Integer userID);
    public List<Procurement_order> selectPOByOrderID(List<Procurement_order> procurement_orderList);
    public Integer deleteProcurementOrderSeriesByOrderID(List<Procurement_order> procurement_orderList);
    public  List<Procurement_order> selectPOByField(Procurement_order procurement_order);
}
