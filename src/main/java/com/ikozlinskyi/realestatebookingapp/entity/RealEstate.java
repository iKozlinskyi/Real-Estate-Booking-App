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

  @ManyToOne(cascade={CascadeType.PERSIST, CascadeType.DETACH,
      CascadeType.MERGE, CascadeType.REFRESH})
  @JoinColumn(name="author_id")
  private User author;

  @Column(name = "description")
  private String description;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "position_id")
  private Position position;

  @OneToMany(mappedBy = "realEstate",
      cascade = CascadeType.ALL)
  private List<Comment> comments;

  @OneToMany(mappedBy = "realEstate",
      cascade = {CascadeType.DETACH, CascadeType.MERGE,
              CascadeType.REFRESH, CascadeType.REMOVE, CascadeType.PERSIST})
  private List<Photo> photos;

  @OneToMany(mappedBy = "bookedRealEstate",
      cascade = {CascadeType.DETACH, CascadeType.MERGE,
          CascadeType.REFRESH, CascadeType.REMOVE, CascadeType.PERSIST})
  private List<Reservation> reservations;

  public RealEstate() {
  }

  public RealEstate(String name, double price, String city, User author, String description) {
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

  public User getAuthor() {
    return author;
  }

  public void setAuthor(User author) {
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

  public void refreshPhotos(List<Photo> newPhotos) {
    newPhotos.forEach(photo -> photo.setRealEstate(this));

    this.photos = newPhotos;
  }

  public List<Reservation> getReservations() {
    return reservations;
  }

  public void setReservations(List<Reservation> reservations) {
    this.reservations = reservations;
  }

  public void addReservation(Reservation newReservation) {
    if (this.reservations == null) {
      reservations = new ArrayList<>();
    }

    newReservation.setBookedRealEstate(this);
    reservations.add(newReservation);
  }

  @Override
  public String toString() {
    return "RealEstate{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", price=" + price +
        ", city='" + city + '\'' +
        ", author=" + author +
        ", description='" + description + '\'' +
        ", position=" + position +
        ", comments=" + comments +
        ", photos=" + photos +
        '}';
  }
}