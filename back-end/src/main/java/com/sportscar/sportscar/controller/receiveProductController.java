package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.bean.ReceiveProductDetail;
import com.sportscar.sportscar.mapper.ReceiveProductDetailMapper;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import com.sportscar.sportscar.bean.Procurement_order;
import com.sportscar.sportscar.bean.ReceiveProduct;
import com.sportscar.sportscar.mapper.ReceiveProductMapper;
import com.sportscar.sportscar.service.ReceiveProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.text.ParseException;
import java.util.*;

@Controller
//@RequestMapping("/receiveGoods")
public class receiveProductController {

    @Autowired
    ReceiveProductService receiveProductService;
    /*
    根据订单号查询所有小订单的收货状态等信息
     */
    @ResponseBody
    @GetMapping("/getOrderStatus")
    public JSONObject getOrderStatus(@RequestParam("orderID") String orderID
                                          ) throws ParseException {
        return receiveProductService.getOrderStatus(orderID);
    }

    /*
    根据小订单号进行货物的收货处理
    */
    @ResponseBody
    @GetMapping("/receiveProduct")
    public JSONObject ReceiveProduct(@RequestParam("orderID") String orderID,@RequestParam("subOrderID")
            String subOrderID,@RequestParam("storageLocation") String storageLocation) throws ParseException {
        return receiveProductService.ReceiveProduct(orderID,subOrderID,storageLocation);
    }
    /*
    根据订单号查询收货单和收货详情
    */
    @ResponseBody
    @GetMapping("/checkReceive")
    public JSONObject CheckReceive(@RequestParam("orderID") String orderID) throws ParseException {
        return receiveProductService.CheckReceive(orderID);
    }
}
