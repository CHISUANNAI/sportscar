package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.Supplier;
import org.apache.ibatis.annotations.Mapper;

/** 供应商模块的持久层接口 */
@Mapper
public interface SupplierMapper {

    Integer insert(Supplier supplier);

    Supplier findByName(String supplierName);

    //判断某供应商是否存在
    Integer ifSupplierExist(Integer supplierID);
    //查询供应商
    Supplier findByID(Integer supplierID);
}
