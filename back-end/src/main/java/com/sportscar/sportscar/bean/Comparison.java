package com.sportscar.sportscar.bean;

import lombok.Data;

@Data
public class Comparison {
    private String comparisonID;
    private String rfqID;
    private Integer userID;

    public Integer getUserID() {
        return this.userID;
    }
    public String getRfqID() {
        return this.rfqID;
    }
    public String getComparisonID() {
        return this.comparisonID;
    }
}
