package com.sportscar.sportscar.controller;

import com.alibaba.fastjson.JSONObject;
import com.sportscar.sportscar.bean.Quotation_request;
import com.sportscar.sportscar.service.IQuotationRequestService;
import com.sportscar.sportscar.service.impl.QuotationRequestServiceImlp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
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
    IQuotationRequestService QuotationRequestService;
    @ResponseBody
    @GetMapping("/AddQuatationRequest")
    public JSONObject AddQuatationRequest(@RequestParam("supplierID") Integer[] supplierID,
                                          @RequestParam("materialID") Integer[] materialID,
                                          @RequestParam("amount") Integer[] amount,
                                          @RequestParam("date_limit") String[] date_limit,
                                          HttpServletRequest request
                                          ) throws ParseException {
        JSONObject object=new JSONObject();
        int code=0;
        try {
           code= QuotationRequestService.addQuotationRequestAll(supplierID,materialID,amount,date_limit,request);
        }catch (Exception e){
            object.put("status",500);
            object.put("desc",e.getMessage());
            System.out.println(e);
            return object;
        }
        if(code>0){
            object.put("status",200);
            object.put("desc","成功插入数据");
            return object;
        }else if(code==0){
            object.put("status",500);
            object.put("desc","插入数据失败");
            return object;
        }else {
            object.put("status",500);
            object.put("desc","请登录后再操作！");
            return object;
        }
    }

    @ResponseBody
    @GetMapping("/DeleteQuatationRequest")
    public JSONObject DeleteQuatationRequest(@RequestParam("rfqID") String[] rfqID,HttpServletRequest request){
        JSONObject object=new JSONObject();
        int code=0;
        try {
            code= QuotationRequestService.deleteQuotationRequestByRfqIdSeries(rfqID,request);
        }catch (Exception e){
            object.put("status",500);
            object.put("desc",e.getMessage());
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
    public JSONObject ShowAllQuatationRequest(HttpServletRequest request){
        JSONObject result=new JSONObject();
        List<Quotation_request> quotationRequestList=new LinkedList<>();
        try{
            quotationRequestList= QuotationRequestService.showAllQuatationRequest(request);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc",e.getMessage());
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
    public JSONObject SelectQuatationRequestByID(@RequestParam("rfqID") String[] rfqID,HttpServletRequest request){
        JSONObject result=new JSONObject();
        List<Quotation_request> resultQuotation_requestList=new LinkedList<>();
        try {
            resultQuotation_requestList= QuotationRequestService.selectQuatationRequestByID(rfqID,request);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc",e.getMessage());
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
                                                    @RequestParam("limitedDate") String limitedDate,
                                                    HttpServletRequest request) throws ParseException {
        JSONObject result=new JSONObject();
        List<Quotation_request> quotation_requestResult=new LinkedList<>();
        try {
            quotation_requestResult= QuotationRequestService.SelectQuatationRequestByField(supplierID,materialID,date,limitedDate,request);
        }catch (Exception e){
            result.put("status",500);
            result.put("desc",e.getMessage());
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
    @ResponseBody
    @GetMapping("/SelectQuatationRequestByState")
    public JSONObject SelectQuatationRequestByState(HttpServletRequest request){
        //session
        JSONObject result=new JSONObject();
        List<Quotation_request> quotationRequestList=new LinkedList<>();
        //session
        Object sessionuserID=request.getSession().getAttribute("userID");
        try{
            quotationRequestList=QuotationRequestService.SelectQuatationRequestByState(Integer.parseInt(sessionuserID.toString()));
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


}
