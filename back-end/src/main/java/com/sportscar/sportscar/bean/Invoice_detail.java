package com.sportscar.sportscar.bean;
import lombok.Data;

@Data
/** 发票详情单的实体类 */
public class Invoice_detail {
    private Integer sub_invoiceID;
    private Integer invoiceID;
    private String sub_orderID;
    private String supplierName;
    private Integer userID;
    private Integer materialID;
    private Integer amount;
    private Float price;

}
