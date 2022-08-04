package com.sportscar.sportscar.service.ex;

/** 报价订单不存在的异常 */
public class QuotationRequestFinishedException extends ServiceException{
    public QuotationRequestFinishedException() {
        super();
    }

    public QuotationRequestFinishedException(String message) {
        super(message);
    }

    public QuotationRequestFinishedException(String message, Throwable cause) {
        super(message, cause);
    }

    public QuotationRequestFinishedException(Throwable cause) {
        super(cause);
    }

    protected QuotationRequestFinishedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
