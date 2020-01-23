package com.ikozlinskyi.realestatebookingapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name="photos")
@JsonIgnoreProperties("realEstate")
public class Photo {

  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  @Column(name="id")
  private int id;

  @Column(name="img_src")
  private String imgSrc;

  @ManyToOne(cascade={CascadeType.DETACH,
      CascadeType.MERGE, CascadeType.REFRESH})
  @JoinColumn(name="real_estate_id")
  private RealEstate realEstate;

  public Photo() {
  }

  public Photo(String imgSrc) {
    this.imgSrc = imgSrc;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getImgSrc() {
    return imgSrc;
  }

  public void setImgSrc(String imgSrc) {
    this.imgSrc = imgSrc;
  }

  public RealEstate getRealEstate() {
    return realEstate;
  }

  public void setRealEstate(RealEstate realEstate) {
    this.realEstate = realEstate;
  }

  @Override
  public String toString() {
    return "Photo{" +
        "id=" + id +
        ", imgSrc='" + imgSrc + '\'';
  }
}
