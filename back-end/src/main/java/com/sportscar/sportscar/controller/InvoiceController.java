package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.mapper.InvoiceDetailMapper;
import com.sportscar.sportscar.mapper.InvoiceMapper;
import com.sportscar.sportscar.mapper.ProcurementOrderMapper;
import com.sportscar.sportscar.util.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("/invoice")
public class InvoiceController {
    @Resource
    InvoiceMapper invoiceMapper;
    InvoiceDetailMapper invoiceDetailMapper;

    /**接口1：根据大订单id查询没开过发票详情单的小订单id **/
    @GetMapping("/id")
    public Result<?> getid(@RequestParam String orderID){
        List<String> Suborderid=invoiceMapper.getsubid(orderID);
        String Orderid=invoiceMapper.getid(orderID);
        if(Orderid!=null){
        return Result.success(Suborderid);
        }
        else {
            return  Result.error("1","不存在该订单号");
        }
    }

}
