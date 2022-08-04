package com.sportscar.sportscar.mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.bean.ReceiveProduct;
import com.sportscar.sportscar.bean.StorageRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface StorageRecordMapper extends BaseMapper<StorageRecord> {

    //根据物料id和仓储地点查询最新库存量（数据按时间降序）
    @Select("SELECT * FROM sportscar.storage_record WHERE materialID=#{materialID} " +
            "and storage_location=#{storageLocation} ORDER BY time desc;")
    List<StorageRecord> selectReceiveByOrderID(Integer materialID,String storageLocation);

    //根据物料id查询所有仓储地点
    @Select("SELECT distinct storage_location FROM sportscar.storage_record where materialID=#{materialID}")
    List<String> selectStorageLocation(Integer materialID);

    //根据年、月查找该月所有入库记录（数据按时间降序）
    @Select("SELECT * FROM `storage_record` where materialID=#{materialID} and storage_location=#{storageLocation} and time >= " +
            " '${year}-${month}-1 00:00:00' AND time< '${nextYear}-${nextMonth}-1 00:00:00' order by time desc")
    List<StorageRecord> selectReceiveByMonth(Integer year,Integer nextYear,Integer month,Integer nextMonth,Integer materialID,String storageLocation);

    //根据年、月查找该月所有入库量（数据按时间降序）
    @Select("SELECT sum(amount) FROM `storage_record` where materialID=#{materialID} and storage_location=#{storageLocation} and time >= " +
            " '${year}-${month}-1 00:00:00' AND time< '${nextYear}-${nextMonth}-1 00:00:00' order by time desc")
    Integer selectStorageByMonth(Integer year,Integer nextYear,Integer month,Integer nextMonth,Integer materialID,String storageLocation);

}
