package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.Invoice_detail;
import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.bean.Quotation_request;
import com.sportscar.sportscar.mapper.ProcurementOrderMapper;
import com.sportscar.sportscar.mapper.QuotationRequestMapper;
import com.sportscar.sportscar.service.IProcurementOrderService;
import com.sportscar.sportscar.service.ex.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ProcurementOrderServiceImpl implements IProcurementOrderService {
    @Autowired
    ProcurementOrderMapper procurementOrderMapper;
    @Autowired
    QuotationRequestMapper quotationRequestMapper;
    //    public Procurement_order getByOrderId(int orderId){
//        return procurementOrderMapper.getProcurement(orderId);
//    }
    public int createProcurementOrder(String[] rfqID,
                                      Integer[] supplierID,
                                      Integer[] materialID,
                                      HttpServletRequest request){
        Object sessionuserID=request.getSession().getAttribute("userID");
        if(sessionuserID==null){
            throw new NotLoggedInException("请登录后再操作！");
        }
        Integer userID=Integer.parseInt(sessionuserID.toString());
        Date dNow = new Date( );
        SimpleDateFormat ft = new SimpleDateFormat ("yyyyMMddhhmmss");
        SimpleDateFormat ym = new SimpleDateFormat ("yyyy-MM-dd");
        String orderID="o"+ft.format(dNow)+userID;
        List<Procurement_order> procurement_orderList=new LinkedList<>();
        //SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh-mm-ss");
        for(int i=0;i<rfqID.length;i++){
            Procurement_order procurement_order=new Procurement_order();
            String subOrderID="so"+ft.format(dNow)+Integer.toString(0)+Integer.toString(i)+userID;
            procurement_order.setSubOrderID(subOrderID);
            procurement_order.setOrderID(orderID);
            procurement_order.setRfqID(rfqID[i]);
            procurement_order.setSupplierID(supplierID[i]);
            procurement_order.setUserID(userID);
            procurement_order.setMaterialID(materialID[i]);
            procurement_order.setDate(dNow);
            Quotation_request quotation_request=quotationRequestMapper.SelectQuatationRequestByPrimaryKey(rfqID[i]
                    ,supplierID[i],materialID[i],userID);
            if(quotation_request==null){
                throw new QuotationRequestNotFoundException("不存在此报价单");
            }
            Integer count=quotationRequestMapper.isFinished(rfqID[i]
                    ,supplierID[i],materialID[i],userID);
            if(count!=null){
                throw new QuotationRequestFinishedException("不可重复发起订单");
            }
            quotationRequestMapper.updateQuatationRequestStateByPrimaryKey(rfqID[i]
                    ,supplierID[i],materialID[i],userID,1);
            procurement_order.setAmount(quotation_request.getAmount());
            procurement_order.setPrice(quotation_request.getPrice());
            procurement_orderList.add(procurement_order);
        }
        return procurementOrderMapper.insertProcurementOrderSeries(procurement_orderList);
    };
    public Integer deleteProcurementOrderSeriesBySub_orderID(String[] sub_orderID,HttpServletRequest request){
        Object sessionuserID=request.getSession().getAttribute("userID");
        if(sessionuserID==null){
            throw new NotLoggedInException("请登录后再操作！");
        }
        Integer userID=Integer.parseInt(sessionuserID.toString());
        List<Procurement_order> procurement_orderList=new LinkedList<>();
        for(int i=0;i<sub_orderID.length;i++){
            Procurement_order procurement_order=new Procurement_order();
            procurement_order.setSubOrderID(sub_orderID[i]);
            procurement_order.setUserID(userID);
            procurement_orderList.add(procurement_order);
        }
        List<Procurement_order> selectSrocurement_orderList=new LinkedList<>();
        selectSrocurement_orderList=procurementOrderMapper.selectPOBySubOrderID(procurement_orderList);
        Integer code=procurementOrderMapper.deleteProcurementOrderSeriesBySub_orderID(procurement_orderList);
        if (code==0){
            throw new PONotFoundException("无需删除不存在的数据");
        }
        for(int i=0;i<selectSrocurement_orderList.size();i++){
            quotationRequestMapper.updateQuatationRequestStateByPrimaryKey(selectSrocurement_orderList.get(i).getRfqID(),
                    selectSrocurement_orderList.get(i).getSupplierID(),selectSrocurement_orderList.get(i).getMaterialID(),
                    userID,0);
        }
        return code;
    }
    public List<Procurement_order> selectPOBySubOrderID(String[] sub_orderID,HttpServletRequest request){
        Object sessionuserID=request.getSession().getAttribute("userID");
        if(sessionuserID==null){
            throw new NotLoggedInException("请登录后再操作！");
        }
        Integer userID=Integer.parseInt(sessionuserID.toString());
        List<Procurement_order> procurement_orderList=new LinkedList<>();
        List<Procurement_order> resultList=new LinkedList<>();
        for(int i=0;i<sub_orderID.length;i++){
            Procurement_order procurement_order=new Procurement_order();
            procurement_order.setUserID(userID);
            procurement_order.setSubOrderID(sub_orderID[i]);
            procurement_orderList.add(procurement_order);
        }
        resultList=procurementOrderMapper.selectPOBySubOrderID(procurement_orderList);
        if (resultList==null){
            throw new NotFoundException("不存在相关数据");
        }
        return resultList;
    };
    public List<Procurement_order> selectAllPO(HttpServletRequest request){
        Object sessionuserID=request.getSession().getAttribute("userID");
        if(sessionuserID==null){
            throw new NotLoggedInException("请登录后再操作！");
        }
        Integer userID=Integer.parseInt(sessionuserID.toString());
        List<Procurement_order> resultProcurement_orderList=new LinkedList<>();
        resultProcurement_orderList=procurementOrderMapper.selectAllPO(userID);
        if(resultProcurement_orderList.size()==0){
            throw new NotFoundException("未找到相关数据");
        }
        return resultProcurement_orderList;
    }
    public List<Procurement_order> selectPOByOrderID(String[] OrderID,HttpServletRequest request){
        Object sessionuserID=request.getSession().getAttribute("userID");
        if(sessionuserID==null){
            throw new NotLoggedInException("请登录后再操作！");
        }
        Integer userID=Integer.parseInt(sessionuserID.toString());
        List<Procurement_order> procurement_orderList=new LinkedList<>();
        List<Procurement_order> resultProcurement_orderList=new LinkedList<>();
        for(int i=0;i<OrderID.length;i++){
            Procurement_order procurement_order=new Procurement_order();
            procurement_order.setOrderID(OrderID[i]);
            procurement_order.setUserID(userID);
            procurement_orderList.add(procurement_order);
        }
        resultProcurement_orderList=procurementOrderMapper.selectPOByOrderID(procurement_orderList);
        if(resultProcurement_orderList.size()==0){
            throw new NotFoundException("未找到相关数据");
        }
        return resultProcurement_orderList;
    }
    public Integer deleteProcurementOrderSeriesByOrderID(String[] OrderID,HttpServletRequest request){
        Object sessionuserID=request.getSession().getAttribute("userID");
        if(sessionuserID==null){
            throw new NotLoggedInException("请登录后再操作！");
        }
        Integer userID=Integer.parseInt(sessionuserID.toString());
        List<Procurement_order> procurement_orderList=new LinkedList<>();
        for(int i=0;i<OrderID.length;i++){
            Procurement_order procurement_order=new Procurement_order();
            procurement_order.setOrderID(OrderID[i]);
            procurement_order.setUserID(userID);
            procurement_orderList.add(procurement_order);
        }
        List<Procurement_order> selectSrocurement_orderList=new LinkedList<>();
        selectSrocurement_orderList=procurementOrderMapper.selectPOByOrderID(procurement_orderList);
        Integer code=procurementOrderMapper.deleteProcurementOrderSeriesByOrderID(procurement_orderList);
        if (code==0){
            throw new PONotFoundException("无需删除不存在的数据");
        }
        for(int i=0;i<selectSrocurement_orderList.size();i++){
            quotationRequestMapper.updateQuatationRequestStateByPrimaryKey(selectSrocurement_orderList.get(i).getRfqID(),
                    selectSrocurement_orderList.get(i).getSupplierID(),selectSrocurement_orderList.get(i).getMaterialID(),
                    userID,0);
        }
        return code;
    };
    public List<Procurement_order> selectPOByField(String rfqID,
                                                   Integer supplierID,
                                                   Integer materialID,
                                                   String date,
                                                   HttpServletRequest request) throws ParseException {
        Object sessionuserID=request.getSession().getAttribute("userID");
        if(sessionuserID==null){
            throw new NotLoggedInException("请登录后再操作！");
        }
        Integer userID=Integer.parseInt(sessionuserID.toString());
        Procurement_order procurement_order=new Procurement_order();
        if(rfqID.length()!=0){
        procurement_order.setRfqID(rfqID);}
        procurement_order.setUserID(userID);
        procurement_order.setSupplierID(supplierID);
        procurement_order.setMaterialID(materialID);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = new GregorianCalendar();
        Date nextday=simpleDateFormat.parse(date);
        calendar.setTime(nextday);
        calendar.add(calendar.DATE,1);//1表示明天,-1表示昨天
        nextday=calendar.getTime();
        System.out.println(nextday);
        if (date!=null&&!date.isEmpty()){
            procurement_order.setDay(simpleDateFormat.parse(date));
            procurement_order.setNextday(nextday);
        }
        List<Procurement_order> procurement_orderList=new LinkedList<>();
        procurement_orderList=procurementOrderMapper.selectPOByField(procurement_order);
        if(procurement_orderList==null||procurement_orderList.size()==0){
            throw new NotFoundException("未找到相关数据");
        }
        return procurement_orderList;
    };
    /**yss*/
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