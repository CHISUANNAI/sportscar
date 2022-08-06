package com.sportscar.sportscar.bean;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class Procurement_order {
    private String subOrderID;
    private String orderID;
    private String rfqID;
    private Integer supplierID;
    private Integer userID;
    private Integer amount;
    private Integer materialID;
    private Float price;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date date;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date day;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date nextday;
}
