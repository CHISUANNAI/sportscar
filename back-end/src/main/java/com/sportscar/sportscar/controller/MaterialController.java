package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.service.IMaterialService;
import com.sportscar.sportscar.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("materials")
public class MaterialController extends BaseController {
    @Autowired
    private IMaterialService materialService;

    @RequestMapping("load")
    public JsonResult<List<Material>> load(){
        List<Material> data = materialService.load();
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("create")
    public JsonResult<Material> create(@RequestParam String materialName, String description, String factory, Float weight){
        Material data = materialService.create(materialName,description,factory,weight);
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("delete")
    public JsonResult<Void> delete(@RequestParam Integer materialID){
        materialService.delete(materialID);
        return new JsonResult<>(OK);
    }

    @RequestMapping("update")
    public JsonResult<Void> update(@RequestParam Integer materialID,String materialName,String description,String factory,Float weight){
        materialService.update(materialID,materialName,description,factory,weight);
        return new JsonResult<>(OK);
    }

}
