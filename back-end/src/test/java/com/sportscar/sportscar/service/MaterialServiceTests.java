package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.service.ex.ServiceException;
import com.sportscar.sportscar.service.impl.IMaterialService;
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
            Material material = new Material();
            material.setMaterialName("物料再测试");
            material.setDescription("嘎嘎嘎嘎嘎嘎嘎嘎");
            materialService.cre(material);
            System.out.println("OK");
        } catch (ServiceException e) {
            System.out.println(e.getClass().getSimpleName());
            System.out.println(e.getMessage());
        }
    }

}
