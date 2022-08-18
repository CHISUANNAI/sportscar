package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.bean.Invoice;
import com.sportscar.sportscar.bean.Invoice_detail;
import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.mapper.InvoiceDetailMapper;
import com.sportscar.sportscar.mapper.InvoiceMapper;
import com.sportscar.sportscar.mapper.ProcurementOrderMapper;
import com.sportscar.sportscar.util.Result;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/invoice")
public class InvoiceController {
    @Resource
    InvoiceMapper invoiceMapper;
    @Resource
    InvoiceDetailMapper invoiceDetailMapper;

    /**接口1：根据大订单id查询没开过发票详情单的小订单详情 **/
    @GetMapping("/id")
    public Result<?> getid(@RequestParam String orderID){
        List<Procurement_order> procument_order=invoiceMapper.getsubid(orderID);
        String Orderid=invoiceMapper.getid(orderID);
        if(Orderid!=null){
        return Result.success(procument_order);
        }
        else {
            return  Result.error("1","不存在该订单号");
        }
    }

//    @GetMapping("/getorderid")
//    public Result<?> getorderid(@RequestParam String sub_orderID){
//        String Orderid=invoiceMapper.getorderid(sub_orderID);
//        return Result.success(Orderid);
//    }


    /**接口2：用户输入发票信息，生成发票单和发票详情单 **/
    @PostMapping("/addinvoice")
    public Result<?> addinvoice(@RequestBody Map<String,String>map){
        /**生成发票单 **/
        Invoice invoice=new Invoice();
        invoice.setOrderid(invoiceMapper.getorderid(map.get("sub_orderID")));
        invoice.setDescription(map.get("description"));
        invoice.setCompanyname(map.get("companyName"));
        invoice.setReceive_date(new Date());
        invoice.setStorage_location(map.get("storage_location"));
        invoiceMapper.insert(invoice);
        Integer invoiceid=invoice.getInvoiceid();


        /**生成发票详情单 **/ /**未解决：同时点两个子订单开发票 需结合前端 **/
        Invoice_detail invoice_detail=new Invoice_detail();
        invoice_detail.setInvoiceid(invoiceid);
        invoice_detail.setSuborderid(map.get("sub_orderID"));
        invoice_detail.setSupplierid(invoiceMapper.getsupplierid(map.get("sub_orderID")));
        invoice_detail.setUserid(invoiceMapper.getuserid(map.get("sub_orderID")));
        invoice_detail.setMaterialid(invoiceMapper.getmaterailid(map.get("sub_orderID")));
        invoice_detail.setAmount(invoiceMapper.getamount(map.get("sub_orderID")));
        invoice_detail.setPrice(invoiceMapper.getprice(map.get("sub_orderID")));
        invoiceDetailMapper.insert(invoice_detail);

        return Result.success();
    }


}
