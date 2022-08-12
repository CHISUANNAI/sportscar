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
    public void create(){
        try {
            supplierService.create("供应商再测试","中国上海","英语",1003);
            System.out.println("OK");
        } catch (ServiceException e) {
            System.out.println(e.getClass().getSimpleName());
            System.out.println(e.getMessage());
        }
    }

}
