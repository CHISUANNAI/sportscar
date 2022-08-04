package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.Material;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class MaterialMapperTests {

    @Autowired
    private MaterialMapper materialMapper;

    @Test
    public void insert(){
        Material material = new Material();
        material.setMaterialName("测试物料");
        material.setDescription("比吧蹦吧啦啦啦");
        Integer rows = this.materialMapper.insert(material);
        System.out.println(rows);
    }

    @Test
    public void findByName(){
        Material material = materialMapper.findByName("维苏威火山灰");
        System.out.println(material);
    }

}
