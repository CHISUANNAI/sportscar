package com.sportscar.sportscar.service.ex;

/** 物料名称不存在的异常 */
public class MaterialnameNotFoundException extends ServiceException{
    public MaterialnameNotFoundException() {
        super();
    }

    public MaterialnameNotFoundException(String message) {
        super(message);
    }

    public MaterialnameNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public MaterialnameNotFoundException(Throwable cause) {
        super(cause);
    }

    protected MaterialnameNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
