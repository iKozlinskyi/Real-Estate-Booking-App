package com.ikozlinskyi.realestatebookingapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "users")
@JsonIgnoreProperties({"password", "enabled"})
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "username")
  private String userName;

  @Column(name = "password")
  private String password;

  @Column(name="enabled")
  private byte enabled;

  public User() {
  }

  public User(String userName, String password, byte enabled) {
    this.userName = userName;
    this.password = password;
    this.enabled = enabled;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public byte getEnabled() {
    return enabled;
  }

  public void setEnabled(byte enabled) {
    this.enabled = enabled;
  }
}
