package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.bean.Quotation_request;
import com.sportscar.sportscar.mapper.MaterialMapper;
import com.sportscar.sportscar.mapper.QuotationRequestMapper;
import com.sportscar.sportscar.mapper.SupplierMapper;
import com.sportscar.sportscar.service.IQuotationRequestService;
import com.sportscar.sportscar.service.ex.MaterialnameNotFoundException;
import com.sportscar.sportscar.service.ex.NotLoggedInException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sportscar.sportscar.service.ex.SuppliernameNotFoundException;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class QuotationRequestServiceImlp implements IQuotationRequestService {
    @Autowired
    QuotationRequestMapper quotationRequestMapper;
    @Autowired
    SupplierMapper supplierMapper;
    @Autowired
    MaterialMapper materialMapper;
    @Override
    public int addQuotationRequest(Quotation_request quotation_request){
        return quotationRequestMapper.addQuotationRequest(quotation_request);
    }
    @Override
    public int addQuotationRequestAll(Integer[] supplierID,
                                      Integer[] materialID,
                                      Integer[] amount,
                                      String[] date_limit,
                                      HttpServletRequest request) throws ParseException {
        List<Quotation_request> quotation_requestLi=new ArrayList<>();
        String rfqID;
        Random r = new Random();
        Object SessionUserID = request.getSession().getAttribute("userID");
        Integer userID;
        //日期
        Date dNow = new Date( );
        SimpleDateFormat ft = new SimpleDateFormat ("yyyyMMddhhmmss");
        SimpleDateFormat ym = new SimpleDateFormat ("yyyy-MM-dd");
        //字符串转data
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        //String dateStr = "2019-01-03 10:59:27";
        //Date date = simpleDateFormat.parse(dateStr);
        if(SessionUserID == null){
            return -1;
        }
        try {
            userID=Integer.parseInt(SessionUserID.toString());

        }catch (Exception e){
            System.out.println(e);
            return -1;
        }
        rfqID="rfq"+ft.format(dNow)+userID;
        for(int i = 0; i<supplierID.length; i++){
            Quotation_request quotation_request=new Quotation_request();
            quotation_request.setUserID(userID);
            quotation_request.setRfqID(rfqID);
            Integer ifSupplierExist=supplierMapper.ifSupplierExist(supplierID[i]);
            if(ifSupplierExist==null){
                throw new SuppliernameNotFoundException("不存在此供应商");
            }
            quotation_request.setSupplierID(supplierID[i]);
            quotation_request.setSupplierName(supplierMapper.findByID(supplierID[i]).getSupplierName());
            Material material=new Material();
            material=materialMapper.findByID(materialID[i]);
            if(material==null){
                throw new MaterialnameNotFoundException("不存在此物料");
            }
            quotation_request.setMaterialID(materialID[i]);
            quotation_request.setAmount(amount[i]);
            quotation_request.setPrice(500+r.nextFloat()*500);
            quotation_request.setDate(dNow);
            quotation_request.setLimitedDate(simpleDateFormat.parse(date_limit[0]));
//            quotation_request.setDate_limit(dNow);
            quotation_request.setState(0);
            quotation_requestLi.add(quotation_request);
        }
        return quotationRequestMapper.addQuotationRequestAll(quotation_requestLi);
    }
    @Override
    public int deleteQuotationRequestByRfqId(String rfqID){
        return quotationRequestMapper.deleteQuotationRequestByRfqId(rfqID);
    }
    @Override
    public int deleteQuotationRequestByRfqIdSeries(String[] rfqID,HttpServletRequest request){
        Object sessionuserID=request.getSession().getAttribute("userID");
        if(sessionuserID==null){
            throw new NotLoggedInException("请登录后再操作！");
        }
        Integer userID=Integer.parseInt(sessionuserID.toString());
        List<Quotation_request> quotation_requestList=new LinkedList<>();
        for(int i=0;i<rfqID.length;i++){
            Quotation_request quotation_request=new Quotation_request();
            quotation_request.setRfqID(rfqID[i]);
            quotation_request.setUserID(userID);
            quotation_requestList.add(quotation_request);
        }
        return quotationRequestMapper.deleteQuotationRequestByRfqIdSeries(quotation_requestList);
    };
    @Override
    public List<Quotation_request> selectQuatationRequestByID(String[] rfqID,HttpServletRequest request){
        Object sessionuserID=request.getSession().getAttribute("userID");
        if(sessionuserID==null){
            throw new NotLoggedInException("请登录后再操作！");
        }
        Integer userID=Integer.parseInt(sessionuserID.toString());
        List<Quotation_request> quotation_requestList=new LinkedList<>();
        List<Quotation_request> resultQuotation_requestList=new LinkedList<>();
        for(int i=0;i<rfqID.length;i++){
            Quotation_request quotation_request=new Quotation_request();
            quotation_request.setUserID(userID);
            quotation_request.setRfqID(rfqID[i]);
            quotation_requestList.add(quotation_request);
        }
        return quotationRequestMapper.selectQuatationRequestByID(quotation_requestList);
    };
    @Override
    public List<Quotation_request> SelectQuatationRequestByField(Integer supplierID,
                                                                 Integer materialID,
                                                                 String date,
                                                                 String limitedDate,
                                                                 HttpServletRequest request) throws ParseException {
        Object sessionuserID=request.getSession().getAttribute("userID");
        if(sessionuserID==null){
            throw new NotLoggedInException("请登录后再操作！");
        }
        Integer userID=Integer.parseInt(sessionuserID.toString());
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
        return quotationRequestMapper.SelectQuatationRequestByField(quotation_request);
    }

    @Override
    public List<Quotation_request> SelectQuatationRequestByState(Integer userID) {
        return quotationRequestMapper.SelectQuatationRequestByState(userID);
    };



    @Override
    public List<Quotation_request> showAllQuatationRequest(HttpServletRequest request) {
        Object sessionuserID=request.getSession().getAttribute("userID");
        if(sessionuserID==null){
            throw new NotLoggedInException("请登录后再操作！");
        }
        Integer userID=Integer.parseInt(sessionuserID.toString());
        return quotationRequestMapper.showAllQuatationRequest(userID);
    };


}
