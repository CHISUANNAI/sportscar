package com.sportscar.sportscar.bean;

import lombok.Data;

@Data
public class Procurement_order {
    private Integer sub_orderID;
    private Integer orderID;
    private String rfqID;
    private Integer supplierID;
    private Integer userID;
    private Integer materialID;
    private Integer amount;
    private Float price;
}
