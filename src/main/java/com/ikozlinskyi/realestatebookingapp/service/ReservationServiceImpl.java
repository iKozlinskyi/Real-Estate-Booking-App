package com.ikozlinskyi.realestatebookingapp.service;

import com.ikozlinskyi.realestatebookingapp.entity.Reservation;
import com.ikozlinskyi.realestatebookingapp.exception.ReservationNotFoundException;
import com.ikozlinskyi.realestatebookingapp.repository.IReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationServiceImpl implements IReservationService {

  @Autowired
  private IReservationRepository reservationRepository;

  @Override
  public List<Reservation> getReservationsForRealEstateId(int realEstateId) {
    return this.reservationRepository.findByBookedRealEstateId(realEstateId);
  }

  @Override
  public void save(Reservation reservation) {
    this.reservationRepository.save(reservation);
  }

  @Override
  public Reservation findById(int reservationId) {
    Optional<Reservation> result = reservationRepository.findById(reservationId);

    Reservation foundReservation = null;

    if (result.isPresent()) {
      foundReservation = result.get();
    } else {
      throw new ReservationNotFoundException("Did not find comment with given id" + reservationId);
    }

    return foundReservation;
  }

  @Override
  public void deleteById(int reservationId) {
    this.reservationRepository.deleteById(reservationId);
  }
}
