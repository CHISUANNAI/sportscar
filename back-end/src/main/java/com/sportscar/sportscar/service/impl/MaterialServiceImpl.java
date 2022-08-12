package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.Material;
import com.sportscar.sportscar.mapper.MaterialMapper;
import com.sportscar.sportscar.service.IMaterialService;
import com.sportscar.sportscar.service.ex.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/** 物料模块业务层的实现类 */
@Service
public class MaterialServiceImpl implements IMaterialService {
    @Autowired
    private MaterialMapper materialMapper;

    @Override
    public List<Material> load(){
        List<Material> result = materialMapper.findAll();
        if(result == null){
            throw new MaterialNotFoundException("物料信息不存在");
        }
        return result;
    }

    @Override
    public Material create(String materialName, String description, String factory, Float weight) {
        Material result = materialMapper.findByName(materialName);
        if(result != null){
            throw new MaterialnameDuplicatedException("物料名称被占用");
        }
        Material material = new Material();
        material.setMaterialName(materialName);
        material.setDescription(description);
        material.setFactory(factory);
        material.setWeight(weight);
        Integer rows = materialMapper.insert(material);
        if(rows != 1){
            throw new InsertException("创建时产生未知异常");
        }
        return materialMapper.findByName(material.getMaterialName());
    }

    @Override
    public void delete(Integer materialID){
        Material material = materialMapper.findByID(materialID);
        if(material == null){
            throw new MaterialNotFoundException("物料不存在");
        }
        Integer rows = materialMapper.delete(materialID);
        if(rows != 1){
            throw new DeleteException("删除时产生未知异常");
        }
    }

    @Override
    public void update(Integer materialID,String materialName,String description,String factory,Float weight){
        Material test = materialMapper.findByID(materialID);
        if(test == null){
            throw new MaterialNotFoundException("物料信息不存在");
        }
        test.setMaterialName(materialName);
        test.setDescription(description);
        test.setFactory(factory);
        test.setWeight(weight);
        Integer rows = materialMapper.update(test);
        if(rows != 1){
            throw new UpdateException("修改时产生未知异常");
        }
    }

}
