package com.sportscar.sportscar.service.ex;

/** 供应商名称被占用的异常 */
public class SuppliernameDuplicatedException extends ServiceException{
    public SuppliernameDuplicatedException() {
        super();
    }

    public SuppliernameDuplicatedException(String message) {
        super(message);
    }

    public SuppliernameDuplicatedException(String message, Throwable cause) {
        super(message, cause);
    }

    public SuppliernameDuplicatedException(Throwable cause) {
        super(cause);
    }

    protected SuppliernameDuplicatedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
