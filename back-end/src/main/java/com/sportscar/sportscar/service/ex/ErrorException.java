package com.sportscar.sportscar.service.ex;

/** 数据插入过程中产生的异常 */
public class ErrorException extends ServiceException{
    public ErrorException() {
        super();
    }

    public ErrorException(String message) {
        super(message);
    }

    public ErrorException(String message, Throwable cause) {
        super(message, cause);
    }

    public ErrorException(Throwable cause) {
        super(cause);
    }

    protected ErrorException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
