package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.Supplier;
import com.sportscar.sportscar.bean.User;
import com.sportscar.sportscar.mapper.SupplierMapper;
import com.sportscar.sportscar.mapper.UserMapper;
import com.sportscar.sportscar.service.ISupplierService;
import com.sportscar.sportscar.service.ex.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/** 供应商模块业务层的实现类 */
@Service
public class SupplierServiceImpl implements ISupplierService {
    @Autowired
    private SupplierMapper supplierMapper;
    @Autowired
    private UserMapper userMapper;

    @Override
    public List<Supplier> load(){
        List<Supplier> result = supplierMapper.findAll();
        if(result == null){
            throw new SupplierNotFoundException("供应商信息不存在");
        }
        return result;
    }

    @Override
    public Supplier create(String supplierName,String region,String language,Integer clerkVendor) {
        if (clerkVendor != null){
            User exist = userMapper.findByID(clerkVendor);
            if(exist == null){
                throw new ClerkNotFoundException("供应商对应员工编号不存在");
            }
        }
        Supplier result = supplierMapper.findByName(supplierName);
        if(result != null){
            throw new SuppliernameDuplicatedException("供应商名称被占用");
        }
        Supplier supplier = new Supplier();
        supplier.setSupplierName(supplierName);
        supplier.setRegion(region);
        supplier.setLanguage(language);
        supplier.setClerkVendor(clerkVendor);
        Integer rows = supplierMapper.insert(supplier);
        if(rows != 1){
            throw new InsertException("创建时产生未知异常");
        }
        return supplierMapper.findByName(supplier.getSupplierName());
    }

    @Override
    public void delete(Integer supplierID){
        Supplier supplier = supplierMapper.findByID(supplierID);
        if(supplier == null){
            throw new SupplierNotFoundException("供应商不存在");
        }
        Integer rows = supplierMapper.delete(supplierID);
        if(rows != 1){
            throw new DeleteException("删除时产生未知异常");
        }
    }

    @Override
    public void update(Integer supplierID,String supplierName,String region,String language,Integer clerkVendor){
        Supplier test = supplierMapper.findByID(supplierID);
        if(test == null){
            throw new SupplierNotFoundException("用户账号不存在");
        }
        test.setSupplierName(supplierName);
        test.setRegion(region);
        test.setLanguage(language);
        test.setClerkVendor(clerkVendor);
        Integer rows = supplierMapper.update(test);
        if(rows != 1){
            throw new UpdateException("修改时产生未知异常");
        }
    }

    //用于判断某供应商是否存在
    @Override
    public Integer ifSupplierExist(Integer supplierID){
        return supplierMapper.ifSupplierExist(supplierID);
    }

}
