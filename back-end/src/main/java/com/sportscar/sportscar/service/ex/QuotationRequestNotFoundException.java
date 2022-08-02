package com.sportscar.sportscar.service.ex;

/** 报价订单不存在的异常 */
public class QuotationRequestNotFoundException extends ServiceException{
    public QuotationRequestNotFoundException() {
        super();
    }

    public QuotationRequestNotFoundException(String message) {
        super(message);
    }

    public QuotationRequestNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public QuotationRequestNotFoundException(Throwable cause) {
        super(cause);
    }

    protected QuotationRequestNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
