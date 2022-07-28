package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.service.ex.*;
import com.sportscar.sportscar.util.JsonResult;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpSession;

/** 控制层类的基类 */
public class BaseController {
    /** 操作成功的状态码 */
    public static final int OK = 100;

    @ExceptionHandler(ServiceException.class)
    public JsonResult<Void> handleException(Throwable e){
        JsonResult<Void> result = new JsonResult<>(e);
        if(e instanceof UsernameDuplicatedException) {
            result.setState(4000);
            result.setMessage("用户名被占用异常");
        }else if(e instanceof InsertException){
            result.setState(5000);
            result.setMessage("注册时产生未知异常");
        }
        return result;
    }

    protected final Integer getUidFromSession(HttpSession session){
        return Integer.valueOf(session.getAttribute("userID").toString());
    }

    protected final String getUsernameFromSession(HttpSession session){
        return session.getAttribute("userName").toString();
    }
}
