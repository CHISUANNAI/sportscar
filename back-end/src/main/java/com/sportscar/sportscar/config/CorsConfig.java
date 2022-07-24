package com.sportscar.sportscar.config;

import org.springframework.context.annotation.Configuration;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// An highlighted block
@Configuration
public class CorsConfig implements Filter {

    public void init(FilterConfig filterConfig) throws ServletException {
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");//设置允许跨域的域名，需要发送cookie信息，所以此处需要指定具体的域名，
        httpResponse.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST");//允许跨域的请求方式
        /**
         * ajax请求的时候如果带有xhrFields:{withCredentials:true}，
         * 那么服务器后台在配置跨域的时候就必须要把Access-Control-Allow-Credentials这个请求头加上去
         */
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true");//允许发送Cookie信息
        httpResponse.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // 支持HTTP 1.1.
        httpResponse.setHeader("Pragma", "no-cache"); // 支持HTTP 1.0. response.setHeader("Expires", "0");
        chain.doFilter(request, response);
    }

    public void destroy() {
        // TODO Auto-generated method stub
    }
}