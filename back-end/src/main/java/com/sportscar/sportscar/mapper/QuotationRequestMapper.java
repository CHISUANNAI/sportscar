package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.Quotation_request;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface QuotationRequestMapper {
    int addQuotationRequest(Quotation_request quotation_request);
    int addQuotationRequestAll(List<Quotation_request> quotation_requestList);
    int deleteQuotationRequestByRfqId(String rfqID);
    int deleteQuotationRequestByRfqIdSeries(List<Quotation_request> quotation_requestList);
    List<Quotation_request> showAllQuatationRequest(Integer userID);
    List<Quotation_request> selectQuatationRequestByID(List<Quotation_request> quotation_requestList);
    List<Quotation_request> SelectQuatationRequestByField(Quotation_request quotation_request);
}
