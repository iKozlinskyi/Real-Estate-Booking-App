package com.ikozlinskyi.realestatebookingapp.service;

import com.ikozlinskyi.realestatebookingapp.entity.RealEstate;

import java.util.List;

public interface IRealEstateService {

  List<RealEstate> findAll();

  RealEstate findById(int id);

  void save(RealEstate realEstate);

  void deleteById(int id);

  void delete(RealEstate realEstate);
}
