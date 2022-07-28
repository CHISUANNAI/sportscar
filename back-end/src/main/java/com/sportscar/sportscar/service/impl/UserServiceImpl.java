package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.User;
import com.sportscar.sportscar.mapper.UserMapper;
import com.sportscar.sportscar.service.IUserService;
import com.sportscar.sportscar.service.ex.InsertException;
import com.sportscar.sportscar.service.ex.UsernameDuplicatedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.UUID;

/** 用户模块业务层的实现类 */
@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public void reg(User user) {
        String username =user.getUserName();
        User result = userMapper.findByName(username);
        if(result != null){
            throw new UsernameDuplicatedException("用户名被占用");
        }
        //密码加密处理的实现：盐值+password+盐值 ---- md5算法进行加密，盐值为一个随机字符串
        String oldPassword = user.getPassword();
        String salt = UUID.randomUUID().toString().toUpperCase();
        String md5Password = getMD5Password(oldPassword,salt);
        user.setPassword(md5Password);
        //补全用户数据：salt,status
        user.setSalt(salt);
        user.setStatus(1);
        Integer rows = userMapper.insert(user);
        if(rows != 1){
            throw new InsertException("注册时产生未知异常");
        }
    }

    /** 定义一个md5算法的加密处理 */
    private String getMD5Password(String password, String salt){
        for(int i = 0; i < 3; i++){
            password = DigestUtils.md5DigestAsHex((salt+password+salt).getBytes()).toUpperCase();
        }
        return password;
    }
}