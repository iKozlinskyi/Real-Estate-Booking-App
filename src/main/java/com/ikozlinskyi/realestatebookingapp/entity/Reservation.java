package com.ikozlinskyi.realestatebookingapp.entity;


import com.fasterxml.jackson.annotation.JsonView;
import com.ikozlinskyi.realestatebookingapp.JSONView.ReservationViews;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="reservations")
public class Reservation {

  @Id
  @Column
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  private int id;

  @JsonView(ReservationViews.ByRealEstate.class)
  @ManyToOne(fetch = FetchType.EAGER, cascade={CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name="user_id")
  private User bookedUser;

  @JsonView(ReservationViews.ByUser.class)
  @ManyToOne(cascade={CascadeType.PERSIST, CascadeType.MERGE})
  @JoinColumn(name="real_estate_id")
  private RealEstate bookedRealEstate;

  @JsonView({ReservationViews.ByUser.class, ReservationViews.ByRealEstate.class})
  @Column(name="reservation_start")
  private LocalDate reservationStart;

  @JsonView({ReservationViews.ByUser.class, ReservationViews.ByRealEstate.class})
  @Column(name="reservation_end")
  private LocalDate reservationEnd;

  public Reservation() {
  }

  public Reservation(User bookedUser, RealEstate bookedRealEstate, LocalDate reservationStart, LocalDate reservationEnd) {
    this.bookedUser = bookedUser;
    this.bookedRealEstate = bookedRealEstate;
    this.reservationStart = reservationStart;
    this.reservationEnd = reservationEnd;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public User getBookedUser() {
    return bookedUser;
  }

  public void setBookedUser(User bookedUser) {
    this.bookedUser = bookedUser;
  }

  public RealEstate getBookedRealEstate() {
    return bookedRealEstate;
  }

  public void setBookedRealEstate(RealEstate bookedRealEstate) {
    this.bookedRealEstate = bookedRealEstate;
  }

  public LocalDate getReservationStart() {
    return reservationStart;
  }

  public void setReservationStart(LocalDate reservationStart) {
    this.reservationStart = reservationStart;
  }

  public LocalDate getReservationEnd() {
    return reservationEnd;
  }

  public void setReservationEnd(LocalDate reservationEnd) {
    this.reservationEnd = reservationEnd;
  }

  @Override
  public String toString() {
    return "Reservation{" +
        "id=" + id +
        ", bookedUser=" + bookedUser +
        ", bookedRealEstate=" + bookedRealEstate +
        ", reservationStart=" + reservationStart +
        ", reservationEnd=" + reservationEnd +
        '}';
  }
}
