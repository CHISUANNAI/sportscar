package com.sportscar.sportscar.service.ex;

/** 员工编号不存在的异常 */
public class ClerkNotFoundException extends ServiceException {
    public ClerkNotFoundException() {
        super();
    }

    public ClerkNotFoundException(String message) {
        super(message);
    }

    public ClerkNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ClerkNotFoundException(Throwable cause) {
        super(cause);
    }

    protected ClerkNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
