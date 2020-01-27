package com.ikozlinskyi.realestatebookingapp.exception;

public class UserDoesNotHavePermissionResponse {

  String message;

  public UserDoesNotHavePermissionResponse(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
