package com.sportscar.sportscar.service.ex;

/** 供应商数据不存在的异常 */
public class MaterialNotFoundException extends ServiceException {
    public MaterialNotFoundException() {
        super();
    }

    public MaterialNotFoundException(String message) {
        super(message);
    }

    public MaterialNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MaterialNotFoundException(Throwable cause) {
        super(cause);
    }

    protected MaterialNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
