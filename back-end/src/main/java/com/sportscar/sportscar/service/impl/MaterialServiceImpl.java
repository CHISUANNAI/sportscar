package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.mapper.MaterialMapper;
import com.sportscar.sportscar.service.IMaterialService;
import com.sportscar.sportscar.service.ex.InsertException;
import com.sportscar.sportscar.service.ex.MaterialnameDuplicatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/** 物料模块业务层的实现类 */
@Service
public class MaterialServiceImpl implements IMaterialService {
    @Autowired
    private MaterialMapper materialMapper;

    @Override
    public void cre(Material material) {
        String materialName =material.getMaterialName();
        Material result = materialMapper.findByName(materialName);
        if(result != null){
            throw new MaterialnameDuplicatedException("物料名称被占用");
        }
        Integer rows = materialMapper.insert(material);
        if(rows != 1){
            throw new InsertException("创建时产生未知异常");
        }
    }

}
