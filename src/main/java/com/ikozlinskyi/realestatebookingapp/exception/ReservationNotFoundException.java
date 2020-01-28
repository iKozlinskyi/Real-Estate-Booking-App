package com.ikozlinskyi.realestatebookingapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ReservationNotFoundException extends RuntimeException {
  public ReservationNotFoundException(String message) {
    super(message);
  }
}
