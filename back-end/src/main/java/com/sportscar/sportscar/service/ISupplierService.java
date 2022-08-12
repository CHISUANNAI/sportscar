package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Supplier;

import java.util.List;

/** 供应商模块业务层接口 */
public interface ISupplierService {

    List<Supplier> load();

    Supplier create(String supplierName,String region,String language,Integer clerkVendor);

    void delete(Integer supplierID);

    void update(Integer supplierID,String supplierName,String region,String language,Integer clerkVendor);

    //用于判断某供应商是否存在
    Integer ifSupplierExist(Integer supplierID);
}
