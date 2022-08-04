package com.sportscar.sportscar.bean;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import java.util.Date;

@Data
public class Quotation_request {
    private Integer userID;
    private String rfqID;
    private Integer supplierID;
    private String supplierName;
    private Integer materialID;
    private Integer amount;
    private Float price;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date limitedDate;
    private Integer state;
}
