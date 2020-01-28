package com.ikozlinskyi.realestatebookingapp.repository;

import com.ikozlinskyi.realestatebookingapp.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IReservationRepository extends JpaRepository<Reservation, Integer> {

  List<Reservation> findByBookedRealEstateId(int realEstateId);
}
