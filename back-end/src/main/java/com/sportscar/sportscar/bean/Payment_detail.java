package com.sportscar.sportscar.bean;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.util.Date;

@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
@Data
public class Payment_detail {
    /** 账单的实体类 */
    private Integer paymentID;
    private Integer orderID;
    private Date  post_time;
    private Float price;
}
