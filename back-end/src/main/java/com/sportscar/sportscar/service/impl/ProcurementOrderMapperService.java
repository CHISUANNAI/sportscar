package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.Invoice_detail;
import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.mapper.ProcurementOrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcurementOrderMapperService {
    @Autowired
    ProcurementOrderMapper procurementOrderMapper;
    public Procurement_order getByOrderId(int orderId){
        return procurementOrderMapper.getProcurement(orderId);
    }
    public Procurement_order SelectPOBysubpo(Integer sub_orderID){
        return procurementOrderMapper.SelectPOBysubpo(sub_orderID);
    };
    public List<Integer> SelectPO(Integer orderID){return  procurementOrderMapper.SelectPO(orderID);}
    public Material SelectMaterialBysub(Integer materialID) {
        return procurementOrderMapper.SelectMaterialBysub(materialID);
    }
    public Invoice_detail SelectInvoiceDetailBysub(Integer sub_orderID) {
        return procurementOrderMapper.SelectInvoiceDetailBysub(sub_orderID);
    }
}
