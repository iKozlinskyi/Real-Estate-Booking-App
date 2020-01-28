package com.ikozlinskyi.realestatebookingapp.service;

import com.ikozlinskyi.realestatebookingapp.entity.Reservation;

import java.util.List;

public interface IReservationService {

  List<Reservation> getReservationsForRealEstateId(int realEstateId);

  void save(Reservation reservation);

  Reservation findById(int reservationId);

  void deleteById(int reservationId);
}
