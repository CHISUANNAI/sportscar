package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.service.ReceiveProductService;
import com.sportscar.sportscar.service.StorageRecordService;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;

@Controller
public class storageRecordController {

    @Autowired
    StorageRecordService storageRecordService;
    /*
    根据物料id查询物料信息、所有工厂和仓储地点的库存信息
     */
    @ResponseBody
    @GetMapping("/getMaterialStock")
    public JSONObject getMaterialStock(@RequestParam("materialID") Integer materialID
                                          ) throws ParseException {
        return storageRecordService.getMaterialStock(materialID);
    }
    /*
       根据物料id和仓储地，查询过去十二个月的历史库存信息
        */
    @ResponseBody
    @GetMapping("/getHistoryStock")
    public JSONObject getHistoryStock(@RequestParam("materialID") Integer materialID,
                                      @RequestParam("storageLocation") String storageLocation
    ) throws ParseException {
        return storageRecordService.getHistoryStock(materialID,storageLocation);
    }

}
