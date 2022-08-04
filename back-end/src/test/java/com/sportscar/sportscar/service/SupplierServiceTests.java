package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Supplier;
import com.sportscar.sportscar.service.ex.ServiceException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class SupplierServiceTests {
    @Autowired
    private ISupplierService supplierService;

    @Test
    public void cre(){
        try {
            Supplier supplier = new Supplier();
            supplier.setSupplierName("供应商再测试");
            supplier.setLanguage("英语");
            supplier.setClerkVendor(1003);
            supplierService.cre(supplier);
            System.out.println("OK");
        } catch (ServiceException e) {
            System.out.println(e.getClass().getSimpleName());
            System.out.println(e.getMessage());
        }
    }

}
