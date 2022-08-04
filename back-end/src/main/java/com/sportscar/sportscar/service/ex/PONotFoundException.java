package com.sportscar.sportscar.service.ex;

/** 未知错误的异常 */
public class PONotFoundException extends ServiceException{
    public PONotFoundException() {
        super();
    }

    public PONotFoundException(String message) {
        super(message);
    }

    public PONotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public PONotFoundException(Throwable cause) {
        super(cause);
    }

    protected PONotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
