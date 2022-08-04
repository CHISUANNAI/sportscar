package com.sportscar.sportscar.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@TableName("receive_product_detail")
@Data
public class ReceiveProductDetail {
    @TableId(type = IdType.AUTO)
    private Integer subReceiveid;
    private Integer receiveid;
    private Integer subOrderid;
    private Integer supplierid;
    private Integer userid;
    private Integer amount;
    private Integer materialid;
    private String storageLocation;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date receiveDate;
    private String status;

    public Integer getSubReceiveid() {
        return subReceiveid;
    }

    public void setSubReceiveid(Integer subReceiveid) {
        this.subReceiveid = subReceiveid;
    }

    public Integer getReceiveid() {
        return receiveid;
    }

    public void setReceiveid(Integer receiveid) {
        this.receiveid = receiveid;
    }

    public Integer getSubOrderid() {
        return subOrderid;
    }

    public void setSubOrderid(Integer subOrderid) {
        this.subOrderid = subOrderid;
    }

    public Integer getSupplierid() {
        return supplierid;
    }
    public void setSupplierid(Integer supplierid) {
        this.supplierid = supplierid;
    }
    public Integer getUserid() {
        return userid;
    }
    public void setUserid(Integer userid) {
        this.userid = userid;
    }
    public Integer getAmount() {
        return amount;
    }
    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getMaterialid() {
        return materialid;
    }

    public void setMaterialid(Integer materialid) {
        this.materialid = materialid;
    }
    public String getStorageLocation() {
        return storageLocation;
    }

    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation == null ? null : storageLocation.trim();
    }

    public Date getReceiveDate() {
        return receiveDate;
    }

    public void setReceiveDate(Date receiveDate) {
        this.receiveDate = receiveDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }



}
