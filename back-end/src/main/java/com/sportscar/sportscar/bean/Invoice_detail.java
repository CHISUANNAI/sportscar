package com.sportscar.sportscar.bean;
import lombok.Data;

@Data
public class Invoice_detail {
    private Integer sub_invoiceID;
    private Integer invoiceID;
    private Integer sub_orderID;
    private String supplierName;
    private Integer userID;
    private Integer materialID;
    private Integer amount;
    private Float price;

}
