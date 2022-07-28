package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserMapperTests {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void insert(){
        User user = new User();
        user.setUserName("测试小明");
        user.setPassword("123456");
        user.setStatus(1);
        Integer rows = this.userMapper.insert(user);
        System.out.println(rows);
    }

    @Test
    public void findByName(){
        User user = userMapper.findByName("张三");
        System.out.println(user);
    }

}
