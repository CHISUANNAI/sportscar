package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.bean.User;
import com.sportscar.sportscar.service.IUserService;
import com.sportscar.sportscar.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("users")
public class UserController extends BaseController {
    @Autowired
    private IUserService userService;

    @RequestMapping("reg")
    public JsonResult<User> reg(@RequestParam String userName,String password,Integer gender,String phone,String email){
        User data = userService.reg(userName,password,gender,phone,email);
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("login")
    public JsonResult<User> login(@RequestParam String userName, String password, HttpSession session){
        User data = userService.login(userName,password);
        session.setAttribute("userID",data.getUserID());
        session.setAttribute("userName",data.getUserName());
        System.out.println(session.getAttribute("userID"));
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("load")
    public JsonResult<List<User>> load(){
        List<User> data = userService.load();
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("create")
    public JsonResult<User> create(@RequestParam String userName,Integer gender,String phone,String email){
        User data = userService.create(userName,gender,phone,email);
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("delete")
    public JsonResult<Void> delete(@RequestParam Integer userID){
        userService.delete(userID);
        return new JsonResult<>(OK);
    }

    @RequestMapping("update")
    public JsonResult<Void> updateUsers(@RequestParam Integer userID,String userName,Integer gender,String phone,String email,Integer status){
        userService.updateUsers(userID,userName,gender,phone,email,status);
        return new JsonResult<>(OK);
    }

    @RequestMapping("changePw")
    public JsonResult<Void> changePassword(@RequestParam String userName,String old,String password){
        userService.changePassword(userName,old,password);
        return new JsonResult<>(OK);
    }
    @RequestMapping("changeIn")
    public JsonResult<User> changeUser(@RequestParam Integer userID,String userName,Integer gender,String phone,String email,String avatar){
        User data = userService.changeUser(userID,userName,gender,phone,email,avatar);
        return new JsonResult<>(OK,data);
    }
}
