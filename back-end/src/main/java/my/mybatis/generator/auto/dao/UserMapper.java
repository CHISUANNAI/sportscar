package my.mybatis.generator.auto.dao;

import java.util.List;
import my.mybatis.generator.auto.entity.User;
import my.mybatis.generator.auto.entity.UserExample;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user
     *
     * @mbg.generated Mon Jul 25 10:58:29 GMT+08:00 2022
     */
    long countByExample(UserExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user
     *
     * @mbg.generated Mon Jul 25 10:58:29 GMT+08:00 2022
     */
    int deleteByExample(UserExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user
     *
     * @mbg.generated Mon Jul 25 10:58:29 GMT+08:00 2022
     */
    int insert(User row);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user
     *
     * @mbg.generated Mon Jul 25 10:58:29 GMT+08:00 2022
     */
    int insertSelective(User row);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user
     *
     * @mbg.generated Mon Jul 25 10:58:29 GMT+08:00 2022
     */
    List<User> selectByExample(UserExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user
     *
     * @mbg.generated Mon Jul 25 10:58:29 GMT+08:00 2022
     */
    int updateByExampleSelective(@Param("row") User row, @Param("example") UserExample example);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table user
     *
     * @mbg.generated Mon Jul 25 10:58:29 GMT+08:00 2022
     */
    int updateByExample(@Param("row") User row, @Param("example") UserExample example);
}