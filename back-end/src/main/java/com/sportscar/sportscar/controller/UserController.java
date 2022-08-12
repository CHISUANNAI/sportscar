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
    public JsonResult<Void> reg(@RequestBody User user){
        userService.reg(user);
        return new JsonResult<>(OK);
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
    public JsonResult<Void> changePassword(@RequestParam String userName,String password){
        userService.changePassword(userName,password);
        return new JsonResult<>(OK);
    }
    @RequestMapping("changeIn")
    public JsonResult<User> changeUser(@RequestBody User user){
        User result = userService.changeUser(user);
        return new JsonResult<>(OK,result);
    }
}
