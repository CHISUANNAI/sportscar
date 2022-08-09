package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.bean.ReceiveProduct;
import com.sportscar.sportscar.bean.ReceiveProductDetail;
import com.sportscar.sportscar.bean.StorageRecord;
import com.sportscar.sportscar.mapper.ReceiveProductDetailMapper;
import com.sportscar.sportscar.mapper.ReceiveProductMapper;
import com.sportscar.sportscar.mapper.StorageRecordMapper;
import lombok.var;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class StorageRecordService {
    @Autowired
    StorageRecordMapper storageRecordMapper;

    public JSONObject getMaterialStock(Integer materialID) throws ParseException {
        List<String> storageLocation;
        List<StorageRecord> storageInfo=new ArrayList<StorageRecord>();;
        JSONObject object = new JSONObject();
        //1.查询物料的所有库存地
        try {
            storageLocation = storageRecordMapper.selectStorageLocation(materialID);
        } catch (Exception e) {
            object.put("status", 500);
            object.put("desc", "查询失败！");
            return object;
        }
        //2.查询每种库存地的最新库存记录
        for(int i=0;i<storageLocation.size();i++) {
            storageInfo.add(storageRecordMapper.selectReceiveByOrderID(materialID,storageLocation.get(i)).get(0));
        }
        if(storageLocation.size()!=0)
            object.put("location", storageLocation);
        ArrayList<JSONObject> barchart = new ArrayList();
        for(int i=0;i<storageLocation.size();i++){
            JSONObject barchartdetail = new JSONObject();
            barchartdetail.put("name",storageLocation.get(i));
            barchartdetail.put("value",storageInfo.get(i).getNewInventory());
            barchart.add(barchartdetail);
        }
        object.put("barchart", barchart);
        object.put("data", storageInfo);
        object.put("status", 200);
        object.put("desc", "查询成功");

        return object;
    }
    public JSONObject getHistoryStock(Integer materialID,String storageLocation) throws ParseException {
        JSONObject object = new JSONObject();
        //1.获取当前时间月份
        var today=new Date();
        Date date1 = new Date(System.currentTimeMillis());
        System.out.println(today);
        Integer month=today.getMonth()+1;
        Integer year=today.getYear()+1900;
        System.out.println(month);
        System.out.println(year);
        List<Integer> years=new ArrayList<Integer>();
        List<Integer> months=new ArrayList<Integer>();
        for(int i=0;i<12;i++){
            years.add(year);
            months.add(month);
            month=month-1;
            if(month==0) {
                month = 12;
                year = year - 1;
            }
        }
        //此时years和months为倒序的
        //2.从去年当月的下一月开始，获取每月的最新库存记录
        List<String> timeline=new ArrayList<String>();
        List<Integer> monthStorage=new ArrayList<Integer>();
        List<Integer> monthInStorage=new ArrayList<Integer>();
        for(int i=11;i>=0;i--){
            timeline.add(years.get(i).toString()+"-"+months.get(i).toString());//增加时间轴坐标
            Integer nextMonth=months.get(i)+1;
            Integer nextYear=years.get(i);//获取本月区间
            if(nextMonth==13){
                nextMonth=1;
                nextYear++;
            }
            StorageRecord storageRecord;
            if(storageRecordMapper.selectReceiveByMonth(years.get(i),nextYear,months.get(i),nextMonth,materialID,storageLocation).size()>0) {
                storageRecord = storageRecordMapper.selectReceiveByMonth(years.get(i), nextYear, months.get(i), nextMonth,materialID,storageLocation).get(0);
                monthStorage.add(storageRecord.getNewInventory());
            }
            else{
                if(i==11) {
                    monthStorage.add(0);//第一个月，库存设为零
                }
                else //后面的月份，如果本月没有库存记录，则置为上个月库存量
                    monthStorage.add(monthStorage.get(10-i));//二月份，i=10，加入1月份的最新库存
                                                             //三月份，i=9，加入2月份的最新库存
            }
            if(storageRecordMapper.selectStorageByMonth(years.get(i),nextYear,months.get(i),nextMonth,materialID,storageLocation)!=null)
                monthInStorage.add(storageRecordMapper.selectStorageByMonth(years.get(i),nextYear,months.get(i),nextMonth,materialID,storageLocation));
            else monthInStorage.add(0);
        }
        object.put("monthin", monthInStorage);
        object.put("timeline", timeline);
        object.put("data", monthStorage);
        object.put("status", 200);
        object.put("desc", "查询成功");
        return object;
    }


}
