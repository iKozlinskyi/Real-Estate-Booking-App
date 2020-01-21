package com.ikozlinskyi.realestatebookingapp.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="real_estate")
public class RealEstate {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "name")
  private String name;

  @Column(name = "price")
  private double price;

  @Column(name = "city")
  private String city;

  @Column(name = "author")
  private String author;

  @Column(name = "description")
  private String description;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "position_id")
  private Position position;

  @OneToMany(mappedBy = "realEstate",
      cascade = CascadeType.ALL)
  private List<Comment> comments;

  @OneToMany(mappedBy = "realEstate",
      cascade = CascadeType.ALL)
  private List<Photo> photos;

  public RealEstate() {
  }

  public RealEstate(String name, double price, String city, String author, String description) {
    this.name = name;
    this.price = price;
    this.city = city;
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

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public Position getPosition() {
    return position;
  }

  public void setPosition(Position position) {
    this.position = position;
  }

  public List<Comment> getComments() {
    return comments;
  }

  public void setComments(List<Comment> comments) {
    this.comments = comments;
  }

  public List<Photo> getPhotos() {
    return photos;
  }

  public void setPhotos(List<Photo> photos) {
    this.photos = photos;
  }

  public void addComment(Comment newComment) {
    if (this.comments == null) {
      comments = new ArrayList<>();
    }

    newComment.setRealEstate(this);
    comments.add(newComment);
  }
}