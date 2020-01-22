package com.ikozlinskyi.realestatebookingapp.service;

import com.ikozlinskyi.realestatebookingapp.entity.RealEstate;
import com.ikozlinskyi.realestatebookingapp.repository.IRealEstateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RealEstateServiceImpl implements IRealEstateService {

  private IRealEstateRepository realEstateRepository;

  @Autowired
  public RealEstateServiceImpl(IRealEstateRepository realEstateRepository) {
    this.realEstateRepository = realEstateRepository;
  }

  @Override
  public List<RealEstate> findAll() {
    return realEstateRepository.findAll();
  }

  @Override
  public RealEstate findById(int id) {
    Optional<RealEstate> result = realEstateRepository.findById(id);

    RealEstate foundRealEstate = null;

    if (result.isPresent()) {
      foundRealEstate = result.get();
    } else {
      throw new RuntimeException("Could not find real estate with given id" + id);
    }

    return foundRealEstate;
  }

  @Override
  public void save(RealEstate realEstate) {
    realEstateRepository.save(realEstate);
  }

  @Override
  public void deleteById(int id) {
    realEstateRepository.deleteById(id);
  }

  @Override
  public void delete(RealEstate realEstate) {
    realEstateRepository.delete(realEstate);
  }
}
