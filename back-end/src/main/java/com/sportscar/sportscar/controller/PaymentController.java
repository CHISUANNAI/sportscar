package com.sportscar.sportscar.controller;


import com.sportscar.sportscar.mapper.InvoiceDetailMapper;
import com.sportscar.sportscar.mapper.InvoiceMapper;
import com.sportscar.sportscar.mapper.PaymentMapper;
import com.sportscar.sportscar.util.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Resource
    PaymentMapper paymentMapper;
    @Resource
    InvoiceMapper invoiceMapper;
    @Resource
    InvoiceDetailMapper invoiceDetailMapper;

    /**接口1：根据大订单id查找采购订单内所有子订单金额的和 **/
    @GetMapping("/count")
    public Result<?> count(@RequestParam String orderID){
        String Orderid=invoiceMapper.getid(orderID);
        Float countprice=paymentMapper.countprice(orderID);
        if(Orderid!=null){
            return  Result.success(countprice);
        }
        else{
            return  Result.error("1","不存在该订单号");
        }

    }
}
