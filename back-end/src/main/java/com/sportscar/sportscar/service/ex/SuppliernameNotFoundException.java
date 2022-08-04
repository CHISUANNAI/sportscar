package com.sportscar.sportscar.service.ex;

/** 供应商名称不存在的异常 */
public class SuppliernameNotFoundException extends ServiceException{
    public SuppliernameNotFoundException() {
        super();
    }

    public SuppliernameNotFoundException(String message) {
        super(message);
    }

    public SuppliernameNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public SuppliernameNotFoundException(Throwable cause) {
        super(cause);
    }

    protected SuppliernameNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
