package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.mapper.ProcurementOrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProcurementOrderMapperService {
    @Autowired
    ProcurementOrderMapper procurementOrderMapper;
    public Procurement_order getByOrderId(int orderId){
        return procurementOrderMapper.getProcurement(orderId);
    }
}
