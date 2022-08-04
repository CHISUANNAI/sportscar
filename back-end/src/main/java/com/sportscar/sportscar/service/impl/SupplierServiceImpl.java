package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.Supplier;
import com.sportscar.sportscar.bean.User;
import com.sportscar.sportscar.mapper.SupplierMapper;
import com.sportscar.sportscar.mapper.UserMapper;
import com.sportscar.sportscar.service.ISupplierService;
import com.sportscar.sportscar.service.ex.ClerkNotFoundException;
import com.sportscar.sportscar.service.ex.InsertException;
import com.sportscar.sportscar.service.ex.SuppliernameDuplicatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/** 供应商模块业务层的实现类 */
@Service
public class SupplierServiceImpl implements ISupplierService {
    @Autowired
    private SupplierMapper supplierMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public void cre(Supplier supplier) {
        Integer clerkID = supplier.getClerkVendor();
        if (clerkID != null){
            User exist = userMapper.findByID(clerkID);
            if(exist == null){
                throw new ClerkNotFoundException("供应商对应员工编号不存在");
            }
        }
        String supplierName =supplier.getSupplierName();
        Supplier result = supplierMapper.findByName(supplierName);
        if(result != null){
            throw new SuppliernameDuplicatedException("供应商名称被占用");
        }
        Integer rows = supplierMapper.insert(supplier);
        if(rows != 1){
            throw new InsertException("创建时产生未知异常");
        }
    }

    //用于判断某供应商是否存在
    @Override
    public Integer ifSupplierExist(Integer supplierID){
        return supplierMapper.ifSupplierExist(supplierID);
    }

}
