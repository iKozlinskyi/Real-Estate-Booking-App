package com.ikozlinskyi.realestatebookingapp.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.ikozlinskyi.realestatebookingapp.JSONView.ReservationViews;
import com.ikozlinskyi.realestatebookingapp.entity.*;
import com.ikozlinskyi.realestatebookingapp.exception.UserDoesNotHavePermissionException;
import com.ikozlinskyi.realestatebookingapp.service.RealEstateServiceImpl;
import com.ikozlinskyi.realestatebookingapp.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RealEstateRestController {

  private RealEstateServiceImpl realEstateService;

  private UserServiceImpl userService;

  @Autowired
  public RealEstateRestController(RealEstateServiceImpl realEstateService, UserServiceImpl userService) {
    this.realEstateService = realEstateService;
    this.userService = userService;
  }

  @GetMapping("/real-estate")
  @JsonView(ReservationViews.ByRealEstate.class)
  public List<RealEstate> findAll() {
    return this.realEstateService.findAll();
  }

  @GetMapping("/real-estate/{realEstateId}")
  @JsonView(ReservationViews.ByRealEstate.class)
  public RealEstate findById(@PathVariable int realEstateId) {
    //Also performs check if RealEstate exists, throws RealEstateNotFoundException otherwise
    return realEstateService.findById(realEstateId);
  }

  @PostMapping("/real-estate")
  public RealEstate addRealEstate(@AuthenticationPrincipal Principal principal,
                                  @RequestBody RealEstate newRealEstate) {
    newRealEstate.setId(0);

    List<Photo> newPhotos = newRealEstate.getPhotos();
    newRealEstate.refreshPhotos(newPhotos);

    User authorizedUser = userService.findByUsername(principal.getName());
    newRealEstate.setAuthor(authorizedUser);

    realEstateService.save(newRealEstate);

    return newRealEstate;
  }

  @PutMapping("/real-estate/{realEstateId}")
  public RealEstate updateRealEstate(@AuthenticationPrincipal Principal principal,
                                     @PathVariable int realEstateId,
                                     @RequestBody RealEstate editedRealEstate) {
    //Also performs check if RealEstate exists, throws RealEstateNotFoundException otherwise
    RealEstate storedRealEstate = this.realEstateService.findById(realEstateId);

    User authorizedUser = this.userService.findByUsername(principal.getName());

    checkPermission(principal, storedRealEstate);

    //Setting id to edit existing object
    editedRealEstate.setId(realEstateId);

    editedRealEstate.setAuthor(authorizedUser);

    //Adding new photos from RequestBody
    List<Photo> editedPhotos = editedRealEstate.getPhotos();
    editedRealEstate.refreshPhotos(editedPhotos);

    realEstateService.save(editedRealEstate);

    return editedRealEstate;
  }


  @DeleteMapping("/real-estate/{realEstateId}")
  public String deleteRealEstate(@AuthenticationPrincipal Principal principal,
                                 @PathVariable int realEstateId) {

    //Also performs check if RealEstate exists, throws RealEstateNotFoundException otherwise
    RealEstate storedRealEstate = this.realEstateService.findById(realEstateId);

    checkPermission(principal, storedRealEstate);

    realEstateService.deleteById(realEstateId);

    return "Deleted real estate id - " + realEstateId;
  }

  private void checkPermission(Principal authorisedPrincipal, RealEstate realEstate) {
    User authorizedUser = this.userService.findByUsername(authorisedPrincipal.getName());
    long authorizedUserId = authorizedUser.getId();
    long resourceAuthorId = realEstate.getAuthor().getId();

    if (authorizedUserId != resourceAuthorId) {
      throw new UserDoesNotHavePermissionException("Current user '" + authorizedUser.getUsername() + "' does not have" +
                                                       " permission to perform request.");
    }
  }
}
