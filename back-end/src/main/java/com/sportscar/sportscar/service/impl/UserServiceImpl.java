package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.User;
import com.sportscar.sportscar.mapper.UserMapper;
import com.sportscar.sportscar.service.IUserService;
import com.sportscar.sportscar.service.ex.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.util.List;
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

    @Override
    public User login(String userName, String password) {
        User result = userMapper.findByName(userName);
        if(result == null){
            throw new UserNotFoundException("用户账号不存在");
        }
        //判断密码是否正确
        String salt = result.getSalt();
        String newMd5Password = getMD5Password(password, salt);
        if(!newMd5Password.equals(result.getPassword())){
            throw new PasswordNotMatchException("用户密码错误");
        }
        return result;
    }

    @Override
    public List<User> load(){
        List<User> result = userMapper.findAll();
        if(result == null){
            throw new UserNotFoundException("用户账号不存在");
        }
        return result;
    }

    @Override
    public List<User> delete(Integer userID){
        User user = userMapper.findByID(userID);
        if(user == null){
            throw new UserNotFoundException("用户账号不存在");
        }
        Integer rows = userMapper.delete(userID);
        if(rows != 1){
            throw new DeleteException("删除时产生未知异常");
        }
        List<User> result = userMapper.findAll();
        return result;
    }

    @Override
    public List<User> updateUsers(User user){
        String username =user.getUserName();
        User test = userMapper.findByName(username);
        if(test == null){
            throw new UserNotFoundException("用户账号不存在");
        }
        Integer rows = userMapper.updateUser(user);
        if(rows != 1){
            throw new UpdateException("修改时产生未知异常");
        }
        List<User> result = userMapper.findAll();
        return result;
    }

    @Override
    public void changePassword(String userName, String password){
        User user = userMapper.findByName(userName);
        if(user == null){
            throw new UserNotFoundException("用户账号不存在");
        }
        String salt = user.getSalt();
        String newMd5Password = getMD5Password(password, salt);
        Integer rows = userMapper.updatePassword(userName,newMd5Password);
        if(rows != 1){
            throw new UpdateException("修改时产生未知异常");
        }
    }

    @Override
    public User changeUser(User user){
        Integer userID = user.getUserID();
        User test = userMapper.findByID(userID);
        if(test == null){
            throw new UserNotFoundException("用户账号不存在");
        }
        Integer rows = userMapper.updateUser(user);
        if(rows != 1){
            throw new UpdateException("修改时产生未知异常");
        }
        User result = userMapper.findByID(userID);
        return result;
    }

    /** 定义一个md5算法的加密处理 */
    private String getMD5Password(String password, String salt){
        for(int i = 0; i < 3; i++){
            password = DigestUtils.md5DigestAsHex((salt+password+salt).getBytes()).toUpperCase();
        }
        return password;
    }
}
