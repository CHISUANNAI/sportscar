package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.Material;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/** 物料模块的持久层接口 */
@Mapper
public interface MaterialMapper {

    Integer insert(Material material);

    Integer delete(Integer materialID);

    Integer update(Material material);

    Material findByName(String materialName);

    Material findByID(Integer materialID);

    List<Material> findAll();
}
