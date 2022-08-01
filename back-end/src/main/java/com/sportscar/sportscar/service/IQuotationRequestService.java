package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Quotation_request;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.List;

public interface IQuotationRequestService {
    public List<Quotation_request> showAllQuatationRequest(HttpServletRequest request);
    public int addQuotationRequest(Quotation_request quotation_request);
    public int addQuotationRequestAll(Integer[] supplierID,
                                      Integer[] materialID,
                                      Integer[] amount,
                                      String[] date_limit,
                                      HttpServletRequest request) throws ParseException;
    public int deleteQuotationRequestByRfqId(String rfqID);
    public int deleteQuotationRequestByRfqIdSeries(String[] rfqID,HttpServletRequest request);
    public List<Quotation_request> selectQuatationRequestByID(String[] rfqID,HttpServletRequest request);
    public List<Quotation_request> SelectQuatationRequestByField(Integer supplierID,
                                                                 Integer materialID,
                                                                 String date,
                                                                 String limitedDate,
                                                                 HttpServletRequest request) throws ParseException;
}
