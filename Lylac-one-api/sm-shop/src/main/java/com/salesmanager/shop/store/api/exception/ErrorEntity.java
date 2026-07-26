package com.salesmanager.shop.store.api.exception;

/**
 * DTO representing an error response in the API.
 * Contains an error code and a descriptive message.
 */
public class ErrorEntity {
    private String errorCode;
    private String message;
    public String getErrorCode() {
      return errorCode;
    }
    public void setErrorCode(String errorCode) {
      this.errorCode = errorCode;
    }
    public String getMessage() {
      return message;
    }
    public void setMessage(String message) {
      this.message = message;
    }
}
