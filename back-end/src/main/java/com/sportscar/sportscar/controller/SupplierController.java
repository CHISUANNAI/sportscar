package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.bean.Supplier;
import com.sportscar.sportscar.service.ISupplierService;
import com.sportscar.sportscar.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("suppliers")
public class SupplierController extends BaseController {
    @Autowired
    private ISupplierService supplierService;

    @RequestMapping("cre")
    public JsonResult<Void> cre(Supplier supplier){
        supplierService.cre(supplier);
        return new JsonResult<>(OK);
    }

}
