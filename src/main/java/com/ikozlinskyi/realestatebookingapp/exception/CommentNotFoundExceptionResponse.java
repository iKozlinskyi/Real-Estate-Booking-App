package com.ikozlinskyi.realestatebookingapp.exception;

public class CommentNotFoundExceptionResponse {

    private String message;

    public CommentNotFoundExceptionResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
