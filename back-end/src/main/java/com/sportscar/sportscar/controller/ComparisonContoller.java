package com.sportscar.sportscar.controller;

import com.alibaba.fastjson.JSONObject;
import com.sportscar.sportscar.bean.Comparison;
import org.springframework.beans.factory.annotation.Autowired;
import com.sportscar.sportscar.service.impl.ComparisonService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ComparisonContoller {
    @Autowired
    ComparisonService comparisonService;

    @ResponseBody
    @GetMapping("/addComparison")
    public JSONObject addComparison(@RequestParam("rfqID") String[] rfqID
    ) throws ParseException {
        JSONObject object=new JSONObject();
        List<Comparison> ComparisonLi=new ArrayList<>();
        String comparisonID;
        Date dNow = new Date( );
        SimpleDateFormat ft = new SimpleDateFormat ("yyyyMMddhhmmss");
        SimpleDateFormat ym = new SimpleDateFormat ("yyyy-MM-dd");
        comparisonID="com"+ft.format(dNow);
        //字符串转data
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        for(int i = 0; i<rfqID.length; i++){
            Comparison acomparison=new Comparison();
            acomparison.setUserID(1);
            acomparison.setRfqID(rfqID[i]);
            acomparison.setComparisonID(comparisonID);
            ComparisonLi.add(acomparison);
        }
        System.out.println(ComparisonLi);
        int code=0;
        try {
            code=comparisonService.addComparisonAll(ComparisonLi);

        }catch (Exception e){
            object.put("status",500);
            object.put("desc","插入数据失败");
            System.out.println(e);
            return object;
        }
        if(code!=0){
            object.put("status",200);
            object.put("desc","成功插入数据");
            return object;
        }
        object.put("status",500);
        object.put("desc","插入数据失败");
        return object;
    }
}
