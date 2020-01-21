package com.ikozlinskyi.realestatebookingapp.controller;

import com.ikozlinskyi.realestatebookingapp.entity.RealEstate;
import com.ikozlinskyi.realestatebookingapp.service.RealEstateServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RealEstateRestController {

  private RealEstateServiceImpl realEstateService;

  @Autowired
  public RealEstateRestController(RealEstateServiceImpl realEstateService) {
    this.realEstateService = realEstateService;
  }

  @GetMapping("/real-estate")
  public List<RealEstate> findAll() {
    return this.realEstateService.findAll();
  }

  @GetMapping("/real-estate/{realEstateId}")
  public RealEstate findById(@PathVariable int realEstateId) {
    return realEstateService.findById(realEstateId);
  }

  @PostMapping("real-estate")
  public RealEstate addRealEstate(@RequestBody RealEstate realEstate) {
    realEstate.setId(0);

    realEstateService.save(realEstate);

    return realEstate;
  }

  @PutMapping("/real-estate")
  public RealEstate updateRealEstate(@RequestBody RealEstate realEstate) {

    realEstateService.save(realEstate);

    return realEstate;
  }


  @DeleteMapping("/real-estate/{realEstateId}")
  public String deleteRealEstate(@PathVariable int realEstateId) {

    RealEstate tempRealEstate = realEstateService.findById(realEstateId);

    if (tempRealEstate == null) {
      throw new RuntimeException("RealEstate id not found - " + realEstateId);
    }

    realEstateService.deleteById(realEstateId);

    return "Deleted real estate id - " + realEstateId;
  }
}
