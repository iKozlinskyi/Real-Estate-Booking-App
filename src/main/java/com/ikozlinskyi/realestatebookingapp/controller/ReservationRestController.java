package com.ikozlinskyi.realestatebookingapp.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.ikozlinskyi.realestatebookingapp.JSONView.ReservationViews;
import com.ikozlinskyi.realestatebookingapp.entity.RealEstate;
import com.ikozlinskyi.realestatebookingapp.entity.Reservation;
import com.ikozlinskyi.realestatebookingapp.entity.User;
import com.ikozlinskyi.realestatebookingapp.exception.UserDoesNotHavePermissionException;
import com.ikozlinskyi.realestatebookingapp.service.RealEstateServiceImpl;
import com.ikozlinskyi.realestatebookingapp.service.ReservationServiceImpl;
import com.ikozlinskyi.realestatebookingapp.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/real-estate/{realEstateId}")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ReservationRestController {

  @Autowired
  private ReservationServiceImpl reservationService;

  @Autowired
  private UserServiceImpl userService;

  @Autowired
  private RealEstateServiceImpl realEstateService;

  @GetMapping("/reservations")
  @JsonView(ReservationViews.ByRealEstate.class)
  public List<Reservation> getReservationsByRealEstateId(@PathVariable int realEstateId) {
    return this.reservationService.getReservationsForRealEstateId(realEstateId);
  }

  @PostMapping("/reservations")
  public ResponseEntity<?> addReservation(@AuthenticationPrincipal Principal principal,
                                       @PathVariable int realEstateId,
                                       @RequestBody Reservation newReservation) {
    newReservation.setId(0);

    User authorizedUser = this.userService.findByUsername(principal.getName());
    newReservation.setBookedUser(authorizedUser);

    RealEstate foundRealEstate = this.realEstateService.findById(realEstateId);
    foundRealEstate.addReservation(newReservation);

    this.reservationService.save(newReservation);

    return new ResponseEntity<>(HttpStatus.OK);
  }

  @DeleteMapping("/reservations/{reservationId}")
  public String removeComment(@AuthenticationPrincipal Principal principal,
                              @PathVariable int reservationId) {

    //Also performs check if comment exists, throws CommentNotFoundException otherwise
    Reservation foundReservation = this.reservationService.findById(reservationId);

    checkPermission(principal, foundReservation);

    reservationService.deleteById(reservationId);

    return "Successfully removed reservation with id - " + reservationId;
  }

  private void checkPermission(Principal authorisedPrincipal, Reservation reservation) {
    User authorizedUser = this.userService.findByUsername(authorisedPrincipal.getName());
    long authorizedUserId = authorizedUser.getId();
    long resourceAuthorId = reservation.getBookedUser().getId();

    if (authorizedUserId != resourceAuthorId) {
      throw new UserDoesNotHavePermissionException("Current user '" + authorizedUser.getUsername() + "' does not have" +
                                                       " permission to perform request.");
    }
  }
}
