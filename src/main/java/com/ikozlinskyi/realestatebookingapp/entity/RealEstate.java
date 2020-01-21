package com.ikozlinskyi.realestatebookingapp.entity;

import javax.persistence.*;

@Entity
@Table(name="real_estate")
public class RealEstate {

  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  @Column(name="id")
  private int id;

  @Column(name="name")
  private String name;

  @Column(name="price")
  private double price;

  @Column(name="author")
  private String author;

  @Column(name="description")
  private String description;

  public RealEstate() {
  }

  public RealEstate(String name, double price, String author, String description) {
    this.name = name;
    this.price = price;
    this.author = author;
    this.description = description;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public double getPrice() {
    return price;
  }

  public void setPrice(double price) {
    this.price = price;
  }

  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }
}
