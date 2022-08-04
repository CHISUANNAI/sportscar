package com.sportscar.sportscar.bean;

import lombok.Data;

/** 供应商的实体类 */
@Data
public class Supplier {
    private Integer supplierID;
    private String supplierName;
    private String region;
    private String language;
    private Integer clerkVendor;
}
