package com.ikozlinskyi.realestatebookingapp.exception;

public class RealEstateNotFoundExceptionResponse {

    private String message;

    public RealEstateNotFoundExceptionResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
