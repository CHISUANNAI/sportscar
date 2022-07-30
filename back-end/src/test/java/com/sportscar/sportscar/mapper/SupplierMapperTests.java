package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.Supplier;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class SupplierMapperTests {

    @Autowired
    private SupplierMapper supplierMapper;

    @Test
    public void insert(){
        Supplier supplier = new Supplier();
        supplier.setSupplierName("测试供应商");
        supplier.setRegion("江西省南昌市");
        Integer rows = this.supplierMapper.insert(supplier);
        System.out.println(rows);
    }

    @Test
    public void findByName(){
        Supplier supplier = supplierMapper.findByName("wuhu");
        System.out.println(supplier);
    }

}
