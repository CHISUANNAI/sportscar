package com.sportscar.sportscar.service;

import com.sportscar.sportscar.bean.User;

/** 用户模块业务层接口 */
public interface IUserService {
    /**
     * 用户注册方法
     * @param user 用户的数据对象
     */
    void reg(User user);

    /**
     * 用户登录方法
     * @param userName 用户名
     * @param password 用户密码
     */
    User login(String userName, String password);
}
