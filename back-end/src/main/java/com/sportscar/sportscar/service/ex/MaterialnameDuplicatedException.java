package com.sportscar.sportscar.service.ex;

/** 物料名称被占用的异常 */
public class MaterialnameDuplicatedException extends ServiceException{
    public MaterialnameDuplicatedException() {
        super();
    }

    public MaterialnameDuplicatedException(String message) {
        super(message);
    }

    public MaterialnameDuplicatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public MaterialnameDuplicatedException(Throwable cause) {
        super(cause);
    }

    protected MaterialnameDuplicatedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
