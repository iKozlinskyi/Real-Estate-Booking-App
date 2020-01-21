package com.ikozlinskyi.realestatebookingapp.entity;

import javax.persistence.*;

@Entity
@Table(name="positions")
public class Position {

  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  @Column(name="id")
  private int id;

  @Column(name="lat")
  private double lat;

  @Column(name="lng")
  private double lng;

  public Position() {
  }

  public Position(double lat, double lng) {
    this.lat = lat;
    this.lng = lng;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public double getLat() {
    return lat;
  }

  public void setLat(double lat) {
    this.lat = lat;
  }

  public double getLng() {
    return lng;
  }

  public void setLng(double lng) {
    this.lng = lng;
  }
}
