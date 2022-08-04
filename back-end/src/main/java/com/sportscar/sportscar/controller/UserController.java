package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.bean.User;
import com.sportscar.sportscar.service.IUserService;
import com.sportscar.sportscar.util.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("users")
public class UserController extends BaseController {
    @Autowired
    private IUserService userService;

    @RequestMapping("reg")
    public JsonResult<Void> reg(User user){
        userService.reg(user);
        return new JsonResult<>(OK);
    }

    @RequestMapping("login")
    public JsonResult<User> login(String userName, String password, HttpSession session){
        User result = userService.login(userName,password);
        session.setAttribute("userID",result.getUserID());
        session.setAttribute("userName",result.getUserName());
        return new JsonResult<>(OK,result);
    }

    @RequestMapping("load")
    public JsonResult<List<User>> load(){
        List<User> data = userService.load();
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("delete")
    public JsonResult<List<User>> delete(Integer userID){
        List<User> data = userService.delete(userID);
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("update")
    public JsonResult<List<User>> updateUsers(User user){
        List<User> data = userService.updateUsers(user);
        return new JsonResult<>(OK,data);
    }

    @RequestMapping("changePw")
    public JsonResult<Void> changePassword(String userName,String password){
        userService.changePassword(userName,password);
        return new JsonResult<>(OK);
    }
    @RequestMapping("changeIn")
    public JsonResult<User> changeUser(User user){
        User result = userService.changeUser(user);
        return new JsonResult<>(OK,result);
    }
}
