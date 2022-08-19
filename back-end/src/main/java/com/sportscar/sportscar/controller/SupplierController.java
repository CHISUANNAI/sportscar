package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.bean.Supplier;
import com.sportscar.sportscar.service.ISupplierService;
import com.sportscar.sportscar.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("suppliers")
public class SupplierController extends BaseController {
    @Autowired
    private ISupplierService supplierService;

    @RequestMapping("load")
    public JsonResult<List<Supplier>> load(){
        List<Supplier> data = supplierService.load();
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("create")
    public JsonResult<Supplier> create(@RequestParam String supplierName,String region,String language,Integer clerkVendor){
        Supplier data = supplierService.create(supplierName,region,language,clerkVendor);
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("delete")
    public JsonResult<Void> delete(@RequestParam Integer supplierID){
        supplierService.delete(supplierID);
        return new JsonResult<>(OK);
    }

    @RequestMapping("update")
    public JsonResult<Void> update(@RequestParam Integer supplierID,String supplierName,String region,String language,Integer clerkVendor){
        supplierService.update(supplierID,supplierName,region,language,clerkVendor);
        return new JsonResult<>(OK);
    }

}
