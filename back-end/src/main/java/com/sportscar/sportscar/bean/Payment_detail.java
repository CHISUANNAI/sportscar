package com.sportscar.sportscar.bean;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.util.Date;

@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
@Data
public class Payment_detail {
    /** 账单的实体类 */
    @TableId(value="paymentID",type= IdType.AUTO)
    private Integer paymentID;
    private String orderid;
    private Date  post_time;
    private Float price;
}
