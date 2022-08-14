package com.sportscar.sportscar.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
@Data
/** 发票单的实体类 */
public class Invoice {
    @TableId(value="invoiceid",type= IdType.AUTO)
    private Integer invoiceid;
    private String orderid;
    private String storage_location;
    private Date receive_date;
    private String description;
    private String companyname;
}
