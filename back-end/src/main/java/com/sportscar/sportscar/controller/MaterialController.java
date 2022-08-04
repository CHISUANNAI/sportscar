package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.service.IMaterialService;
import com.sportscar.sportscar.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("materials")
public class MaterialController extends BaseController {
    @Autowired
    private IMaterialService materialService;

    @RequestMapping("cre")
    public JsonResult<Void> cre(Material material){
        materialService.cre(material);
        return new JsonResult<>(OK);
    }

}
