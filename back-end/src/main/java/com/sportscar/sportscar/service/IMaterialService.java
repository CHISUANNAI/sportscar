package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Material;

import java.util.List;

/** 物料模块业务层接口 */
public interface IMaterialService {

    List<Material> load();

    Material create(String materialName,String description,String factory,Float weight);

    void delete(Integer materialID);

    void update(Integer materialID,String materialName,String description,String factory,Float weight);

}
