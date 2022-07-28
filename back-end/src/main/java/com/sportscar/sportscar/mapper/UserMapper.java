package com.sportscar.sportscar.mapper;

import com.sportscar.sportscar.bean.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
/** 员工（用户）模块的持久层接口 */
public interface UserMapper {
    /**
     * 插入用户的数据
     * @param user 用户的数据
     * @return 受影响的行数
     */
    Integer insert(User user);

    /**
     * 根据用户名来查询用户数据
     * @param userName 用户名
     * @return 找到则返回用户数据，否则返回null值
     */
    User findByName(String userName);
}
