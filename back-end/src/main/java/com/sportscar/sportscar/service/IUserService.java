package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.User;

import java.util.List;

/** 用户模块业务层接口 */
public interface IUserService {

    User reg(String userName,String password,Integer gender,String phone,String email);

    User login(String userName, String password);

    //以下为员工展示页面
    List<User> load();

    User create(String userName,Integer gender,String phone,String email);

    void delete(Integer userID);

    void updateUsers(Integer userID,String userName,Integer gender,String phone,String email,Integer status);

    //以下为个人信息页面
    void changePassword(String userName, String old, String password);

    User changeUser(Integer userID,String userName,Integer gender,String phone,String email,String avatar);
}
