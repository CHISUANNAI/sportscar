package com.sportscar.sportscar.service.impl;

import com.sportscar.sportscar.bean.User;
import com.sportscar.sportscar.mapper.SupplierMapper;
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
    @Autowired
    private SupplierMapper supplierMapper;

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
    public User create(String userName,Integer gender,String phone,String email){
        User result = userMapper.findByName(userName);
        if(result != null){
            throw new UsernameDuplicatedException("用户名被占用");
        }
        String oldPassword = "000000";
        String salt = UUID.randomUUID().toString().toUpperCase();
        String md5Password = getMD5Password(oldPassword,salt);
        User user = new User();
        user.setUserName(userName);
        user.setPassword(md5Password);
        user.setSalt(salt);
        user.setPhone(phone);
        user.setEmail(email);
        user.setGender(gender);
        user.setStatus(1);
        Integer rows = userMapper.insert(user);
        if(rows != 1){
            throw new InsertException("创建时产生未知异常");
        }
        return userMapper.findByName(user.getUserName());
    }

    @Override
    public void delete(Integer userID){
        User user = userMapper.findByID(userID);
        if(user == null){
            throw new UserNotFoundException("用户账号不存在");
        }
        supplierMapper.clear(userID);
        Integer rows = userMapper.delete(userID);
        if(rows != 1){
            throw new DeleteException("删除时产生未知异常");
        }
    }

    @Override
    public void updateUsers(Integer userID,String userName,Integer gender,String phone,String email,Integer status){
        User test = userMapper.findByID(userID);
        if(test == null){
            throw new UserNotFoundException("用户账号不存在");
        }
        test.setUserName(userName);
        test.setGender(gender);
        test.setPhone(phone);
        test.setEmail(email);
        test.setStatus(status);
        Integer rows = userMapper.updateUser(test);
        if(rows != 1){
            throw new UpdateException("修改时产生未知异常");
        }
    }

    @Override
    public void changePassword(String userName, String old, String password){
        User user = userMapper.findByName(userName);
        if(user == null){
            throw new UserNotFoundException("用户账号不存在");
        }
        String salt = user.getSalt();
        String newMd5Password = getMD5Password(password, salt);
        String oldMd5Password = getMD5Password(old, salt);
        if(!oldMd5Password.equals(user.getPassword())){
            throw new PasswordNotMatchException("初始密码错误");
        }
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
        return userMapper.findByID(userID);
    }

    /** 定义一个md5算法的加密处理 */
    private String getMD5Password(String password, String salt){
        for(int i = 0; i < 3; i++){
            password = DigestUtils.md5DigestAsHex((salt+password+salt).getBytes()).toUpperCase();
        }
        return password;
    }
}
