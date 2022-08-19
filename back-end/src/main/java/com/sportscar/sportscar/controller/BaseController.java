package com.sportscar.sportscar.controller;

import com.sportscar.sportscar.service.ex.*;
import com.sportscar.sportscar.util.JsonResult;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpSession;

/** 控制层类的基类 */
public class BaseController {
    /** 操作成功的状态码 */
    public static final int OK = 200;

    @ExceptionHandler(ServiceException.class)
    public JsonResult<Void> handleException(Throwable e){
        JsonResult<Void> result = new JsonResult<>(e);
        if(e instanceof UsernameDuplicatedException) {
            result.setState(4000);
            result.setMessage("用户名被占用");
        }else if(e instanceof UserNotFoundException){
            result.setState(4001);
            result.setMessage("用户数据不存在");
        }else if(e instanceof PasswordNotMatchException){
            result.setState(4002);
            result.setMessage("用户密码错误");
        }else if(e instanceof InsertException){
            result.setState(5000);
            result.setMessage("创建时产生未知异常");
        }else if(e instanceof DeleteException){
            result.setState(5001);
            result.setMessage("删除时产生未知异常");
        }else if(e instanceof UpdateException){
            result.setState(5002);
            result.setMessage("修改时产生未知异常");
        }else if(e instanceof SuppliernameDuplicatedException){
            result.setState(6000);
            result.setMessage("供应商名称被占用");
        }else if(e instanceof SupplierNotFoundException){
            result.setState(6001);
            result.setMessage("供应商数据不存在");
        }else if(e instanceof ClerkNotFoundException){
            result.setState(6002);
            result.setMessage("供应商对应员工编号不存在");
        }else if(e instanceof MaterialnameDuplicatedException) {
            result.setState(7000);
            result.setMessage("物料名称被占用");
        }else if(e instanceof MaterialNotFoundException){
            result.setState(7001);
            result.setMessage("物料数据不存在");
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
