package com.ikozlinskyi.realestatebookingapp.repository;

import com.ikozlinskyi.realestatebookingapp.entity.RealEstate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRealEstateRepository extends JpaRepository<RealEstate, Integer> {
}
