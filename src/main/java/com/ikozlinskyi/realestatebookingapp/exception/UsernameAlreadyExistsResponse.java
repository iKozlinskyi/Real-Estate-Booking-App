package com.ikozlinskyi.realestatebookingapp.exception;

public class UsernameAlreadyExistsResponse {

    private String message;

    public UsernameAlreadyExistsResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
