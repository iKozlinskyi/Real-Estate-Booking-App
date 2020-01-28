package com.ikozlinskyi.realestatebookingapp.exception;

public class ReservationNotFoundResponse {
  private String message;

  public ReservationNotFoundResponse(String message) {
    this.message = message;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }
}
