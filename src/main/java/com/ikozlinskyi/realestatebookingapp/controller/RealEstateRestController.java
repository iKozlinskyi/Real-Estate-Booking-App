package com.ikozlinskyi.realestatebookingapp.controller;

import com.ikozlinskyi.realestatebookingapp.entity.*;
import com.ikozlinskyi.realestatebookingapp.service.PhotoServiceImpl;
import com.ikozlinskyi.realestatebookingapp.service.RealEstateServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RealEstateRestController {

  private RealEstateServiceImpl realEstateService;
  private PhotoServiceImpl photoService;

  @Autowired
  public RealEstateRestController(RealEstateServiceImpl realEstateService, PhotoServiceImpl photoService) {
    this.realEstateService = realEstateService;
    this.photoService = photoService;
  }

  @GetMapping("/real-estate")
  public List<RealEstate> findAll() {
    return this.realEstateService.findAll();
  }

  @GetMapping("/real-estate/{realEstateId}")
  public RealEstate findById(@PathVariable int realEstateId) {

    //Also performs check if RealEstate exists, throws RealEstateNotFoundException otherwise
    RealEstate foundRealEstate = realEstateService.findById(realEstateId);

    return foundRealEstate;
  }

  @PostMapping("/real-estate")
  public RealEstate addRealEstate(@RequestBody RealEstate newRealEstate) {
    newRealEstate.setId(0);

    List<Photo> newPhotos = newRealEstate.getPhotos();
    newRealEstate.refreshPhotos(newPhotos);

    //This user is a stub for future Spring Security User
    User stubUser = new User("John", "john_donn", (byte) 1);
    newRealEstate.setAuthor(stubUser);

    realEstateService.save(newRealEstate);

    return newRealEstate;
  }

  @PutMapping("/real-estate/{realEstateId}")
  public RealEstate updateRealEstate(@PathVariable int realEstateId,
                                     @RequestBody RealEstate editedRealEstate) {

    //Also performs check if RealEstate exists, throws RealEstateNotFoundException otherwise
    RealEstate storedRealEstate = this.realEstateService.findById(realEstateId);

    //Deleting saved photos
    List<Photo> storedPhotos = storedRealEstate.getPhotos();
    storedPhotos.forEach(photo -> photoService.delete(photo));

    //Setting id to edit existing object
    editedRealEstate.setId(realEstateId);

    //Adding new photos from RequestBody
    List<Photo> editedPhotos = editedRealEstate.getPhotos();
    editedPhotos.forEach(photo -> photo.setRealEstate(editedRealEstate));

    //This user is a stub for future Spring Security User
    User stubUser = new User("John", "john_donn", (byte) 1);
    editedRealEstate.setAuthor(stubUser);

    realEstateService.save(editedRealEstate);

    return editedRealEstate;
  }


  @DeleteMapping("/real-estate/{realEstateId}")
  public String deleteRealEstate(@PathVariable int realEstateId) {

    //Also performs check if RealEstate exists, throws RealEstateNotFoundException otherwise
    RealEstate foundRealEstate = realEstateService.findById(realEstateId);

    realEstateService.deleteById(realEstateId);

    return "Deleted real estate id - " + realEstateId;
  }
}
