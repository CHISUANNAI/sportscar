package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.bean.ReceiveProduct;
import com.sportscar.sportscar.bean.ReceiveProductDetail;
import com.sportscar.sportscar.bean.StorageRecord;
import com.sportscar.sportscar.mapper.ReceiveProductDetailMapper;
import com.sportscar.sportscar.mapper.ReceiveProductMapper;
import com.sportscar.sportscar.mapper.StorageRecordMapper;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ReceiveProductService {
    @Autowired
    ReceiveProductDetailMapper receiveProductDetailMapper;
    @Autowired
    ReceiveProductMapper receiveProductMapper;
    @Autowired
    StorageRecordMapper storageRecordMapper;
    public JSONObject getOrderStatus(String orderID) throws ParseException {
        List<Procurement_order> receiveInfo;
        JSONObject object = new JSONObject();
        try {
            //查询小订单信息
            receiveInfo = receiveProductMapper.selectOrderByID(orderID);
        } catch (Exception e) {
            object.put("status", 500);
            object.put("desc", "查询失败！");
            return object;
        }
        System.out.println("1");
        if(receiveInfo.size()==0)
        {
            object.put("status", 300);
            object.put("desc", "不存在该订单！");
            return object;
        }
        System.out.println(receiveInfo);
        JSONArray jsonObject = JSONArray.fromObject(receiveInfo);
        for (int i = 0; i < receiveInfo.size(); i++) {
            ReceiveProductDetail detail;
            try {
                detail = receiveProductDetailMapper.selectReceiveByID(receiveInfo.get(i).getSubOrderID());
                jsonObject.getJSONObject(i).put("receiveDate", detail.getReceiveDate());
                jsonObject.getJSONObject(i).put("storageLocation", detail.getStorageLocation());
                jsonObject.getJSONObject(i).put("status", detail.getStatus());
            } catch (Exception e) {
                jsonObject.getJSONObject(i).put("status", "未收货");
                jsonObject.getJSONObject(i).put("receiveDate", null);
                jsonObject.getJSONObject(i).put("storageLocation", null);
            }
        }
        System.out.println(jsonObject);
        object.put("data", jsonObject);
        object.put("status", 200);
        object.put("desc", "查询成功");
        return object;
    }

    public JSONObject ReceiveProduct(String orderID,String subOrderID,String storageLocation) throws ParseException {
        JSONObject object = new JSONObject();
        //1.如果没有大的收货单，创建大收货单，并创建所有的小收货单，复制信息
        if(receiveProductMapper.selectReceiveByOrderID(orderID)==null) {
            //创建大收货单
            ReceiveProduct newReceiveProduct=new ReceiveProduct();
            newReceiveProduct.setStatus("未完成");
            newReceiveProduct.setOrderid(orderID);
            try {
                receiveProductMapper.insert(newReceiveProduct);
            } catch (Exception f) {
                System.out.println(f);
                object.put("status", 500);
                object.put("desc", "收货单创建失败！");
                return object;
            }
            Integer receiveid=receiveProductMapper.selectReceiveByOrderID(orderID).getReceiveid();
            //查询小订单信息，复制到小收货单
            List<Procurement_order> receiveInfo;
            try {
                //查询小订单信息
                receiveInfo = receiveProductMapper.selectOrderByID(orderID);
            } catch (Exception f) {
                object.put("status", 500);
                object.put("desc", "查询订单详情失败！");
                return object;
            }
            try {
                for (int i = 0; i < receiveInfo.size(); i++) {
                    ReceiveProductDetail newReceiveProductDetail = new ReceiveProductDetail();
                    newReceiveProductDetail.setReceiveid(receiveid);
                    newReceiveProductDetail.setSubOrderid(receiveInfo.get(i).getSubOrderID());
                    newReceiveProductDetail.setSupplierid(receiveInfo.get(i).getSupplierID());
                    newReceiveProductDetail.setUserid(receiveInfo.get(i).getUserID());
                    newReceiveProductDetail.setAmount(receiveInfo.get(i).getAmount());
                    newReceiveProductDetail.setMaterialid(receiveInfo.get(i).getMaterialID());
                    newReceiveProductDetail.setStorageLocation(null);
                    newReceiveProductDetail.setReceiveDate(null);
                    newReceiveProductDetail.setStatus("未收货");
                    receiveProductDetailMapper.insert(newReceiveProductDetail);
                }
            }catch (Exception m) {
                object.put("status", 500);
                object.put("desc", "创建收货详情失败！");
                return object;
            }
        }
        //2.对这个id对应的小收货单进行收货操作
        ReceiveProductDetail receiveProductDetail=receiveProductDetailMapper.selectReceiveByID(subOrderID);
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date(System.currentTimeMillis());
        receiveProductDetail.setReceiveDate(date);
        receiveProductDetail.setStatus("已收货");
        receiveProductDetail.setStorageLocation(storageLocation);
        receiveProductDetailMapper.updateById(receiveProductDetail);

        //3.同时，生成入库单
        StorageRecord storageRecord=new StorageRecord();
        storageRecord.setSubReceiveid(receiveProductDetail.getSubReceiveid());
        storageRecord.setMaterialid(receiveProductDetail.getMaterialid());
        storageRecord.setAmount(receiveProductDetail.getAmount());
        storageRecord.setStorageLocation(receiveProductDetail.getStorageLocation());
        SimpleDateFormat formatter2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date1 = new Date(System.currentTimeMillis());
        storageRecord.setTime(date1);
          //查询最新库存量
        List<StorageRecord> newstorage= storageRecordMapper.selectReceiveByOrderID(receiveProductDetail.getMaterialid(),receiveProductDetail.getStorageLocation());
        if(newstorage.size()==0)
            storageRecord.setNewInventory(receiveProductDetail.getAmount());
        else{
            Integer newStorageAmount=newstorage.get(0).getNewInventory();
            storageRecord.setNewInventory(receiveProductDetail.getAmount()+newStorageAmount);
        }
        try{
            storageRecordMapper.insert(storageRecord);
        }catch(Exception m) {
            object.put("status", 500);
            object.put("desc", "创建入库单失败！");
            System.out.println(m);
            return object;
        }

        //4.查询所有小收货单的状态，如果均为已收货，则更新大收货单状态为已收货
        ReceiveProduct receive=receiveProductMapper.selectReceiveByOrderID(orderID);
        Integer receiveID=receive.getReceiveid();//找到收货单id
        List<ReceiveProductDetail> details;
        details=receiveProductDetailMapper.selectAllReceiveByID(receiveID);
        Integer flag=0;
        for(int i = 0; i < details.size(); i++) {
            if(details.get(i).getStorageLocation()==null) {
                flag = 1;//存在未收货项目
            }
        }

        if(flag==0) {
            ReceiveProduct receiveProduct2 = receiveProductMapper.selectReceiveByOrderID(orderID);
            receiveProduct2.setStatus("已完成");
            receiveProductMapper.updateById(receiveProduct2);
        }
            object.put("status", 200);
            object.put("desc", "成功创建！");
            return object;
    }
    public JSONObject CheckReceive(String orderID) throws ParseException {
        JSONObject object = new JSONObject();
        try {
            //1.根据订单号查找大收货单
            ReceiveProduct receiveProduct = receiveProductMapper.selectReceiveByOrderID(orderID);
            object.put("receive", receiveProduct);
            //2.根据收货单号查询所有小收货单
            List<ReceiveProductDetail> receiveProductDetails = receiveProductDetailMapper.selectAllReceiveByID(receiveProduct.getReceiveid());
            object.put("detail", receiveProductDetails);
            object.put("status", 200);
            object.put("desc", "查询成功！");
            return object;
        } catch (Exception e) {
            object.put("status", 300);
            object.put("desc", "订单不存在！");
        }

        return object;
    }

}
