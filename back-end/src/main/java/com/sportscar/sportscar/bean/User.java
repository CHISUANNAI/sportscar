package com.sportscar.sportscar.bean;

import lombok.Data;

/** 员工（用户）的实体类 */
@Data
public class User {
    private Integer userID;
    private String userName;
    private String password;
    private String salt;
    private String phone;
    private String email;
    private Integer gender;
    private String avatar;
    private Integer status;
}
