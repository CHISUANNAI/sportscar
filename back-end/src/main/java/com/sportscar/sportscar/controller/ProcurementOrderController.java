package com.sportscar.sportscar.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sportscar.sportscar.bean.Invoice_detail;
import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.bean.Procurement_order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.text.ParseException;
import java.util.*;
import com.sportscar.sportscar.service.impl.ProcurementOrderMapperService;

@Controller
public class ProcurementOrderController {
    @Autowired
    ProcurementOrderMapperService procurementOrderMapperService;

    @ResponseBody
    @GetMapping("/SelectPO")
    public JSONObject SelectPO(@RequestParam("orderID") Integer orderID
    ) throws ParseException {
        JSONObject result=new JSONObject();
        List<Integer> subli=new LinkedList<>();
        List<Procurement_order> POli=new ArrayList<>();
        List<Invoice_detail> IVli=new ArrayList<>();
        List<Material> MAli=new ArrayList<>();
        List<JSONArray> alldata=new ArrayList<>(); //单据流汇总数组
        subli=procurementOrderMapperService.SelectPO(orderID);
        //搜索的订单有可能是大订单或小订单，分情况进行订单查询
        if(subli.size()==0)//输入的不是大订单
            try{
                Procurement_order PO=new Procurement_order();
                Material MA=new Material();
                Invoice_detail IV=new Invoice_detail();
                PO=procurementOrderMapperService.SelectPOBysubpo(orderID);
                MA=procurementOrderMapperService.SelectMaterialBysub(PO.getMaterialID());
                IV=procurementOrderMapperService.SelectInvoiceDetailBysub(orderID);
                System.out.println(IV+"快了快了"+PO);
                POli.add(PO);
                MAli.add(MA);
                IVli.add(IV);
            }catch (Exception e){
                result.put("status",500);
                result.put("desc","该订单号不存在");
                System.out.println(e);
                return result;
            }
        else
            try{
                Procurement_order PO=new Procurement_order();
                Material MA=new Material();
                Invoice_detail IV=new Invoice_detail();
                PO=procurementOrderMapperService.SelectPOBysubpo(orderID);
                MA=procurementOrderMapperService.SelectMaterialBysub(PO.getMaterialID());
                IV=procurementOrderMapperService.SelectInvoiceDetailBysub(orderID);
                System.out.println(IV+"快了快了"+PO);
                POli.add(PO);
                MAli.add(MA);
                IVli.add(IV);
            }catch (Exception e){
                result.put("status",500);
                result.put("desc","查询失败");
                System.out.println(e);
                return result;
            }
        JSONArray polijson  = (JSONArray) JSONArray.toJSON(POli);
        JSONArray malijson  = (JSONArray) JSONArray.toJSON(MAli);
        JSONArray ivlijson  = (JSONArray) JSONArray.toJSON(IVli);
        alldata.add(polijson);
        alldata.add(malijson);
        alldata.add(ivlijson);
        result.put("status",200);
        result.put("desc","查询成功");
        result.put("data",alldata);
        return result;

    }
//    @ResponseBody
//    @GetMapping("/SelectPOBysubpo")
//    public JSONObject SelectPOBysubpo(@RequestParam("sub_orderID") Integer sub_orderID
//    ) throws ParseException {
//        JSONObject result=new JSONObject();
//        Procurement_order PO=new Procurement_order();
//        try{
//            PO=procurementOrderMapperService.SelectPOBysubpo(sub_orderID);
//        }catch (Exception e){
//            result.put("status",500);
//            result.put("desc","查询失败");
//            System.out.println(e);
//            return result;
//        }
//        result.put("status",200);
//        result.put("desc","查询成功");
//        result.put("data",PO);
//        return result;
//
//    }
}
