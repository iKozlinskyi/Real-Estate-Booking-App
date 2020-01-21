package com.ikozlinskyi.realestatebookingapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="comments")
@JsonIgnoreProperties("realEstate")
public class Comment {

  @Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  @Column(name="id")
  private int id;

  @ManyToOne(cascade={CascadeType.PERSIST, CascadeType.DETACH,
      CascadeType.MERGE, CascadeType.REFRESH})
  @JoinColumn(name="author_id")
  private User author;

  @Column(name="text")
  private String text;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "createdAt")
  private Date createdAt;

  @ManyToOne(cascade={CascadeType.PERSIST, CascadeType.DETACH,
                      CascadeType.MERGE, CascadeType.REFRESH})
  @JoinColumn(name="real_estate_id")
  private RealEstate realEstate;

  public Comment() {
  }

  public Comment(User author, String text, Date createdAt) {
    this.author = author;
    this.text = text;
    this.createdAt = createdAt;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public User getAuthor() {
    return author;
  }

  public void setAuthor(User author) {
    this.author = author;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Date getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
  }

  public RealEstate getRealEstate() {
    return realEstate;
  }

  public void setRealEstate(RealEstate realEstate) {
    this.realEstate = realEstate;
  }
}
