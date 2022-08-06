package com.sportscar.sportscar.config;

import com.sportscar.sportscar.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

/** 拦截器的注册 */
@Configuration
public class LoginInterceptorConfig implements WebMvcConfigurer {

    /** 配置拦截器 */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        HandlerInterceptor interceptor = new LoginInterceptor();

        List<String> patterns = new ArrayList<>();  //白名单集合
        patterns.add("/templates/demo.html");
        patterns.add("/templates/rfqTest.html");
        patterns.add("/users/reg");
        patterns.add("/users/login");
        patterns.add("/users/load");
        patterns.add("/users/delete");
        patterns.add("/users/update");
        patterns.add("/users/changePw");
        patterns.add("/users/changeIn");
        patterns.add("/suppliers/cre");
        patterns.add("/materials/cre");
        patterns.add("/receiveProduct");
        patterns.add("/checkReceive");
        patterns.add("/getMaterialStock");
        patterns.add("/getHistoryStock");
        patterns.add("/getOrderStatus");

        registry.addInterceptor(interceptor)
                .addPathPatterns("/**")
                .excludePathPatterns(patterns);
    }
}
