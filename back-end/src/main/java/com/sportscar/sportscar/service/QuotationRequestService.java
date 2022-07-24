package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Quotation_request;
import com.sportscar.sportscar.mapper.QuotationRequestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuotationRequestService {
    @Autowired
    QuotationRequestMapper quotationRequestMapper;
    public int addQuotationRequest(Quotation_request quotation_request){
        return quotationRequestMapper.addQuotationRequest(quotation_request);
    }
    public int addQuotationRequestAll(List<Quotation_request> quotation_requestList){
        return quotationRequestMapper.addQuotationRequestAll(quotation_requestList);
    }
    public int deleteQuotationRequestByRfqId(String rfqID){
        return quotationRequestMapper.deleteQuotationRequestByRfqId(rfqID);
    }
    public int deleteQuotationRequestByRfqIdSeries(List<Quotation_request> quotation_requestList){
        return quotationRequestMapper.deleteQuotationRequestByRfqIdSeries(quotation_requestList);
    };
    public List<Quotation_request> showAllQuatationRequest(Integer userID){
        return quotationRequestMapper.showAllQuatationRequest(userID);
    };
    public List<Quotation_request> selectQuatationRequestByID(List<Quotation_request> quotation_requestList){
        return quotationRequestMapper.selectQuatationRequestByID(quotation_requestList);
    };
    public List<Quotation_request> SelectQuatationRequestByField(Quotation_request quotation_request){
        return quotationRequestMapper.SelectQuatationRequestByField(quotation_request);
    };
}
