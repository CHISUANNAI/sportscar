package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.Supplier;

/** 供应商模块业务层接口 */
public interface ISupplierService {

    void cre(Supplier supplier);

    //用于判断某供应商是否存在
    Integer ifSupplierExist(Integer supplierID);
}
