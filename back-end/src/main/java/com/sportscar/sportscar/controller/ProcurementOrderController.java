package com.sportscar.sportscar.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sportscar.sportscar.bean.Invoice_detail;
import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.service.IProcurementOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.text.ParseException;
import java.util.*;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("ProcurementOrder")
public class ProcurementOrderController {

    @Autowired
    IProcurementOrderService iprocurementOrderService;
    /**测试url /ProcurementOrder/ProcurementOrderTest */
    @RequestMapping("ProcurementOrderTest")
    public String ProcurementOrderTest(){
        return "ProcurementOrderTest";
    }

    /**yss*/
    @ResponseBody
    @GetMapping("SelectPO")
    public JSONObject SelectPO(@RequestParam("orderID") String orderID
    ) throws ParseException {
        JSONObject result=new JSONObject();
        List<String> subli=new LinkedList<>();
        List<Procurement_order> POli=new ArrayList<>();
        List<Invoice_detail> IVli=new ArrayList<>();
        List<Material> MAli=new ArrayList<>();
        List<JSONArray> alldata=new ArrayList<>(); //单据流汇总数组
        subli=iprocurementOrderService.SelectPO(orderID);
        System.out.println(subli);
        System.out.println("995");
        //搜索的订单有可能是大订单或小订单，分情况进行订单查询
        if(subli.size()==0)//输入的不是大订单
            try{
                Procurement_order PO=new Procurement_order();
                Material MA=new Material();
                Invoice_detail IV=new Invoice_detail();
                PO=iprocurementOrderService.SelectPOBysubpo(orderID);
                MA=iprocurementOrderService.SelectMaterialBysub(PO.getMaterialID());
                IV=iprocurementOrderService.SelectInvoiceDetailBysub(orderID);
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
                for (int i=0;i<subli.size();i++){
                    PO=iprocurementOrderService.SelectPOBysubpo(subli.get(i));
                    System.out.println(IV+"快了快了"+PO);
                    MA=iprocurementOrderService.SelectMaterialBysub(PO.getMaterialID());
                    IV=iprocurementOrderService.SelectInvoiceDetailBysub(subli.get(i));
                    POli.add(PO);
                    MAli.add(MA);
                    IVli.add(IV);
                }
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
    /**创建采购订单 /ProcurementOrder/ProcurementOrderTest */
    @ResponseBody
    @RequestMapping("CreateProcurementOrder")
    public JSONObject CreateProcurementOrder(@RequestParam("rfqID") String[] rfqID,
                                             @RequestParam("supplierID") Integer[] supplierID,
                                             @RequestParam("materialID") Integer[] materialID,
                                             HttpServletRequest request){
        JSONObject result=new JSONObject();
        int code;
        try {
            code=iprocurementOrderService.createProcurementOrder(rfqID,supplierID,materialID,request);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc",e.getMessage());
            System.out.println(e);
            return result;
        }
        if(code!=0){
            result.put("status",200);
            result.put("desc","订单创建成功");
            return result;
        }
        result.put("status",500);
        result.put("desc","订单创建失败");
        return result;
    }
    /**根据小订单号删除*/
    @ResponseBody
    @RequestMapping("deleteProcurementOrderSeriesBySub_orderID")
    public JSONObject deleteProcurementOrderSeriesBySub_orderID(@RequestParam("sub_orderID") String[] sub_orderID,
                                                                HttpServletRequest request){
        JSONObject result=new JSONObject();
        Integer code;
        try {
            code=iprocurementOrderService.deleteProcurementOrderSeriesBySub_orderID(sub_orderID,request);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc",e.getMessage());
            System.out.println(e);
            return result;
        }
        if(code==null){
            result.put("status",500);
            result.put("desc","无法删除不存在的数据");
            return result;
        }
        result.put("status",200);
        result.put("desc","删除成功");
        return result;
    }
    /**根据小订单号查询PO*/
    @ResponseBody
    @RequestMapping("selectPOBySubOrderID")
    public JSONObject selectPOBySubOrderID(String[] sub_orderID,HttpServletRequest request){
        JSONObject result=new JSONObject();
        List<Procurement_order> procurement_orderList=new LinkedList<>();
        try {
             procurement_orderList=iprocurementOrderService.selectPOBySubOrderID(sub_orderID,request);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc",e.getMessage());
            System.out.println(e);
            return result;
        }
        if(procurement_orderList.size()==0){
            result.put("status",500);
            result.put("desc","未查询到相关数据");
            return result;
        }
        result.put("status",200);
        result.put("desc","查询成功");
        result.put("data",procurement_orderList);
        return result;
    }
    /**查询所有PO*/
    @ResponseBody
    @RequestMapping("selectAllPO")
    public JSONObject selectAllPO(HttpServletRequest request){
        JSONObject result=new JSONObject();
        List<Procurement_order> procurement_orderList=new LinkedList<>();
        try {
            procurement_orderList=iprocurementOrderService.selectAllPO(request);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc",e.getMessage());
            System.out.println(e);
            return result;
        }
        result.put("status",200);
        result.put("desc","查询成功");
        result.put("data",procurement_orderList);
        return result;
    }
    /**根据大订单号查询PO*/
    @ResponseBody
    @RequestMapping("selectPOByOrderID")
    public JSONObject selectPOByOrderID(@RequestParam("OrderID") String[] OrderID,
                                        HttpServletRequest request){
        JSONObject result=new JSONObject();
        List<Procurement_order> procurement_orderList=new LinkedList<>();
        try {
            procurement_orderList=iprocurementOrderService.selectPOByOrderID(OrderID,request);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc",e.getMessage());
            System.out.println(e);
            return result;
        }
        result.put("status",200);
        result.put("desc","查询成功");
        result.put("data",procurement_orderList);
        return result;
    }
    /**根据订单号删除订单*/
    @ResponseBody
    @RequestMapping("deleteProcurementOrderSeriesByOrderID")
    public JSONObject deleteProcurementOrderSeriesByOrderID(@RequestParam("OrderID") String[] OrderID,
                                                            HttpServletRequest request){
        JSONObject result=new JSONObject();
        Integer code;
        try {
            code=iprocurementOrderService.deleteProcurementOrderSeriesByOrderID(OrderID,request);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc",e.getMessage());
            System.out.println(e);
            return result;
        }
        if(code==null){
            result.put("status",500);
            result.put("desc","无法删除不存在的数据");
            return result;
        }
        result.put("status",200);
        result.put("desc","删除成功");
        return result;
    }
    /**根据字段选择购买订单*/
    @ResponseBody
    @RequestMapping("selectPOByField")
    public JSONObject selectPOByField(@RequestParam("rfqID") String rfqID,
                                      @RequestParam(value = "supplierID",defaultValue = "-1") Integer supplierID,
                                      @RequestParam(value = "materialID",defaultValue = "-1") Integer materialID,
                                      @RequestParam("date") String date,
                                      HttpServletRequest request){
        JSONObject result=new JSONObject();
        List<Procurement_order> procurement_orderList=new LinkedList<>();
        try {
            procurement_orderList=iprocurementOrderService.selectPOByField(rfqID,supplierID,materialID,date,request);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc",e.getMessage());
            System.out.println(e);
            return result;
        }
        result.put("status",200);
        result.put("desc","查询成功");
        result.put("data",procurement_orderList);
        return result;
    }
}


