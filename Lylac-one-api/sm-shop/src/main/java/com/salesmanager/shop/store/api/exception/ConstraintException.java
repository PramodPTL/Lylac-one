package com.salesmanager.shop.store.api.exception;

/**
 * Exception thrown when a data constraint violation occurs.
 * Typically used to wrap persistence or validation constraint errors.
 */
public class ConstraintException extends GenericRuntimeException {

    /**
   * 
   */
		
	
  private static final long serialVersionUID = 1L;
  
  private static final String CONSTRAINT_ERROR_CODE = "506";

    public ConstraintException(String message) {
        super(CONSTRAINT_ERROR_CODE, message);
    }

    public ConstraintException(String message, Throwable exception) {
        super(CONSTRAINT_ERROR_CODE,message, exception);
    }


}
