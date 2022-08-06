package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Invoice_detail;
import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.bean.Procurement_order;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.List;

public interface IProcurementOrderService {
    public int createProcurementOrder(String[] rfqID,
                                      Integer[] supplierID,
                                      Integer[] materialID,
                                      HttpServletRequest request);
    public Integer deleteProcurementOrderSeriesBySub_orderID(String[] sub_orderID,HttpServletRequest request);
    public List<Procurement_order> selectPOBySubOrderID(String[] sub_orderID,HttpServletRequest request);
    public List<Procurement_order> selectAllPO(HttpServletRequest request);
    public List<Procurement_order> selectPOByOrderID(String[] OrderID,HttpServletRequest request);
    public Integer deleteProcurementOrderSeriesByOrderID(String[] OrderID,HttpServletRequest request);
    public List<Procurement_order> selectPOByField(String rfqID,
                                                   Integer supplierID,
                                                   Integer materialID,
                                                   String date,
                                                   HttpServletRequest request) throws ParseException;
    /**yss*/
    public List<Integer> SelectPO(Integer orderID);
    public Material SelectMaterialBysub(Integer materialID);
    public Invoice_detail SelectInvoiceDetailBysub(Integer sub_orderID);
    public Procurement_order SelectPOBysubpo(Integer sub_orderID);
}
