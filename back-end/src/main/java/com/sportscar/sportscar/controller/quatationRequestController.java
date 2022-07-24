package com.sportscar.sportscar.controller;

import com.alibaba.fastjson.JSONObject;
import com.sportscar.sportscar.bean.Quotation_request;
import com.sportscar.sportscar.service.QuotationRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class quatationRequestController {
    @GetMapping("/quatationRequesttest")
    public String quatationRequesttest(){
        return "rfqTest";
    }

    @Autowired
    QuotationRequestService quotationRequestService;
    @ResponseBody
    @GetMapping("/AddQuatationRequest")
    public JSONObject AddQuatationRequest(@RequestParam("supplierID") Integer[] supplierID,
                                          @RequestParam("materialID") Integer[] materialID,
                                          @RequestParam("amount") Integer[] amount,
                                          @RequestParam("date_limit") String[] date_limit
                                          ) throws ParseException {
        JSONObject object=new JSONObject();
        List<Quotation_request> quotation_requestLi=new ArrayList<>();
        String rfqID;
        //日期
        Date dNow = new Date( );
        SimpleDateFormat ft = new SimpleDateFormat ("yyyyMMddhhmmss");
        SimpleDateFormat ym = new SimpleDateFormat ("yyyy-MM-dd");
        rfqID="rfq"+ft.format(dNow);
        //字符串转data
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        //String dateStr = "2019-01-03 10:59:27";
        //Date date = simpleDateFormat.parse(dateStr);
        Random r = new Random();
        for(int i = 0; i<supplierID.length; i++){
            Quotation_request quotation_request=new Quotation_request();
            //session
            quotation_request.setUserID(1);
            quotation_request.setRfqID(rfqID);
            //supplierID与materialID之后再进行检查
            quotation_request.setSupplierID(supplierID[i]);
            //先用supplierName替代
            quotation_request.setSupplierName("supplierName");
            quotation_request.setMaterialID(materialID[i]);
            quotation_request.setAmount(amount[i]);
            quotation_request.setPrice(500+r.nextInt(500));
            quotation_request.setDate(dNow);
            quotation_request.setLimitedDate(simpleDateFormat.parse(date_limit[0]));
//            quotation_request.setDate_limit(dNow);
            quotation_request.setState(1);
            quotation_requestLi.add(quotation_request);
        }
        int code=0;
        try {
           code=quotationRequestService.addQuotationRequestAll(quotation_requestLi);
        }catch (Exception e){
            object.put("status",500);
            object.put("desc","插入数据失败");
            System.out.println(e);
            return object;
        }
        if(code!=0){
            object.put("status",200);
            object.put("desc","成功插入数据");
            return object;
        }
        object.put("status",500);
        object.put("desc","插入数据失败");
            return object;
    }

    @ResponseBody
    @GetMapping("/DeleteQuatationRequest")
    public JSONObject DeleteQuatationRequest(@RequestParam("rfqID") String[] rfqID){
        JSONObject object=new JSONObject();
        int code=0;
        //session
        Integer userID=1;
        List<Quotation_request> quotation_requestList=new LinkedList<>();
        for(int i=0;i<rfqID.length;i++){
            Quotation_request quotation_request=new Quotation_request();
            quotation_request.setRfqID(rfqID[i]);
            quotation_request.setUserID(userID);
            quotation_requestList.add(quotation_request);
        }
        try {
            code=quotationRequestService.deleteQuotationRequestByRfqIdSeries(quotation_requestList);
        }catch (Exception e){
            object.put("status",500);
            object.put("desc","删除数据失败");
            System.out.println(e);
            return object;
        }
        if(code==0){
            object.put("status",500);
            object.put("desc","不存在此数据，无需删除");
            return object;
        }
        object.put("status",200);
        object.put("desc","成功删除数据");
        return object;
    }

    @ResponseBody
    @GetMapping("/ShowAllQuatationRequest")
    public JSONObject ShowAllQuatationRequest(){
        JSONObject result=new JSONObject();
        List<Quotation_request> quotationRequestList=new LinkedList<>();
        //session
        Integer userID=1;
        try{
            quotationRequestList=quotationRequestService.showAllQuatationRequest(userID);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc","查询失败");
            System.out.println(e);
            return result;
        }
        result.put("status",200);
        result.put("desc","查询成功");
        result.put("data",quotationRequestList);
        return result;
    }

    @ResponseBody
    @GetMapping("/SelectQuatationRequestByID")
    public JSONObject SelectQuatationRequestByID(@RequestParam("rfqID") String[] rfqID){
        //session
        Integer userID=1;
        JSONObject result=new JSONObject();
        List<Quotation_request> quotation_requestList=new LinkedList<>();
        List<Quotation_request> resultQuotation_requestList=new LinkedList<>();
        for(int i=0;i<rfqID.length;i++){
            Quotation_request quotation_request=new Quotation_request();
            quotation_request.setUserID(userID);
            quotation_request.setRfqID(rfqID[i]);
            quotation_requestList.add(quotation_request);
        }
        try {
            resultQuotation_requestList=quotationRequestService.selectQuatationRequestByID(quotation_requestList);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc","查询失败");
            System.out.println(e);
            return result;
        }
        result.put("status",200);
        result.put("desc","查询成功");
        result.put("data",resultQuotation_requestList);
        return result;
    }

    @ResponseBody
    @GetMapping("/SelectQuatationRequestByField")
    public JSONObject SelectQuatationRequestByField(@RequestParam(value = "supplierID",defaultValue = "-1") Integer supplierID,
                                                    @RequestParam(value = "materialID",defaultValue = "-1") Integer materialID,
                                                    @RequestParam(value = "date") String date,
                                                    @RequestParam("limitedDate") String limitedDate) throws ParseException {
        //session
        Integer userID=1;
        Quotation_request quotation_request=new Quotation_request();
        quotation_request.setUserID(userID);
        quotation_request.setSupplierID(supplierID);
        quotation_request.setMaterialID(materialID);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        if (date!=null&&!date.isEmpty()){
            quotation_request.setDate(simpleDateFormat.parse(date));
        }
        if (limitedDate!=null&&!limitedDate.isEmpty()){
            quotation_request.setLimitedDate(simpleDateFormat.parse(limitedDate));
        }
        JSONObject result=new JSONObject();
        List<Quotation_request> quotation_requestResult=new LinkedList<>();
        try {
            quotation_requestResult=quotationRequestService.SelectQuatationRequestByField(quotation_request);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc","查询失败");
            System.out.println(e);
            return result;
        }
        if(quotation_requestResult.size()==0){
            result.put("status",200);
            result.put("desc","未查询到相关数据");
            return result;
        }
        result.put("status",200);
        result.put("desc","查询成功");
        result.put("data",quotation_requestResult);
        return result;
    }
}
