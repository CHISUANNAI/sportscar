package com.sportscar.sportscar.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** 定义一个拦截器 */
public class LoginInterceptor implements HandlerInterceptor {
    /**
     * 检测session中是否有userID数据，有则放行，否则重定向到登录页面
     * @param request 请求对象
     * @param response 响应对象
     * @param handler 处理器（url+Controller：映射）
     * @return 返回值为true则放行，返回值为false则拦截
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Object obj = request.getSession().getAttribute("userID");
        if(obj == null){
            response.sendRedirect("/templates/demo.html");   //根据实际目录结构更改
            return false;
        }
        return true;
    }
}
