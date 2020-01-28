package com.ikozlinskyi.realestatebookingapp.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler
    public final ResponseEntity<RealEstateNotFoundExceptionResponse> handleProjectNotFoundException(RealEstateNotFoundException ex){
        RealEstateNotFoundExceptionResponse exceptionResponse = new RealEstateNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<CommentNotFoundExceptionResponse> handleCommentNotFound(CommentNotFoundException ex){
        CommentNotFoundExceptionResponse exceptionResponse = new CommentNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public final ResponseEntity<UsernameAlreadyExistsResponse> handleUsernameAlreadyExists(UsernameAlreadyExistsException ex){
        UsernameAlreadyExistsResponse exceptionResponse = new UsernameAlreadyExistsResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<UserDoesNotHavePermissionResponse> handleUserDoesNotHavePermission(UserDoesNotHavePermissionException ex){
        UserDoesNotHavePermissionResponse exceptionResponse = new UserDoesNotHavePermissionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<ReservationNotFoundResponse> handleReservationNotFound(ReservationNotFoundException ex){
        ReservationNotFoundResponse exceptionResponse = new ReservationNotFoundResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}
