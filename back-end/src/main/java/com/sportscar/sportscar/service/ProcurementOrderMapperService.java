package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.procurement_order;
import com.sportscar.sportscar.mapper.ProcurementOrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProcurementOrderMapperService {
    @Autowired
    ProcurementOrderMapper procurementOrderMapper;
    public procurement_order getByOrderId(int orderId){
        return procurementOrderMapper.getProcurement(orderId);
    }
}
