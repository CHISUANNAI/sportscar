package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.bean.comparison;
import com.sportscar.sportscar.bean.procurement_order;
import com.sportscar.sportscar.service.ComparisonService;
import com.sportscar.sportscar.service.ProcurementOrderMapperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Controller
public class demoController {

    //返回json
    @ResponseBody
    @GetMapping("/demoJson")
    public String demoJson() {
        String s="{name:wuhu}";
       return s;
    }
    //get请求
    @GetMapping("/demoHtml")
    public String demoHtml() {

        return "demo";
    }
    //post请求
    /*@PostMapping("/url")
    public String name(@RequestParam("email") param1,
                             @RequestParam("password") param2) {

        return "数据";
    }*/
    //配置版mybatis数据交互
    @Autowired
    ComparisonService comparisonService;
    @ResponseBody
    @GetMapping("/comparison")
    public comparison getById(){
        return comparisonService.getComparisonById(1);
    }
    //注解版mybatis数据交互
    @Autowired
    ProcurementOrderMapperService procurementOrderMapperService;
    @ResponseBody
    @GetMapping("/procurement_order")
    public procurement_order getProcurementOrderById(){
        return procurementOrderMapperService.getByOrderId(1235);
    }
}
