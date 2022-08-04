package com.sportscar.sportscar.bean;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@TableName("storage_record")
@Data
public class StorageRecord {

    @TableId(type = IdType.AUTO)
    private Integer storageid;
    private Integer subReceiveid;
    private Integer materialid;
    private Integer amount;
    private String storageLocation;
    private Integer newInventory;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date time;

    public Integer getStorageid() {
        return storageid;
    }

    public void setStorageid(Integer storageid) {
        this.storageid = storageid;
    }

    public Integer getSubReceiveid() {
        return subReceiveid;
    }

    public void setSubReceiveid(Integer subReceiveid) {
        this.subReceiveid = subReceiveid;
    }

    public Integer getMaterialName() {
        return materialid;
    }

    public void setMaterialName(Integer materialid) {
        this.materialid = materialid;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getStorageLocation() {
        return storageLocation;
    }

    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation == null ? null : storageLocation.trim();
    }

    public Integer getNewInventory() {
        return newInventory;
    }

    public void setNewInventory(Integer newInventory) {
        this.newInventory = newInventory;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
