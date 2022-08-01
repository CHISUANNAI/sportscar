package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.Material;
import org.apache.ibatis.annotations.Mapper;

/** 物料模块的持久层接口 */
@Mapper
public interface MaterialMapper {

    Integer insert(Material material);

    Material findByName(String materialName);

    Material findByID(Integer materialID);
}
