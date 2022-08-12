package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.service.ex.ServiceException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class MaterialServiceTests {
    @Autowired
    private IMaterialService materialService;

    @Test
    public void cre(){
        try {
            materialService.create("物料名","描述哈哈哈",null,null);
            System.out.println("OK");
        } catch (ServiceException e) {
            System.out.println(e.getClass().getSimpleName());
            System.out.println(e.getMessage());
        }
    }

}
