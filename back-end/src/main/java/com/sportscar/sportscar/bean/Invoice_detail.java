package com.sportscar.sportscar.bean;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
/** 发票详情单的实体类 */
public class Invoice_detail {
    @TableId(value="sub_invoiceID",type= IdType.AUTO)
    private Integer sub_invoiceID;
    private Integer invoiceid;
    private String sub_orderid;
    private Integer supplierid;
    private Integer userid;
    private Integer materialid;
    private Integer amount;
    private Float price;

}
