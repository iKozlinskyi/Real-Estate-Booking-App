package com.ikozlinskyi.realestatebookingapp.service;

import com.ikozlinskyi.realestatebookingapp.entity.User;

public interface IUserService {

  User saveUser (User newUser);

  User findByUsername(String username);

  boolean isUsernameAvailable(String username);
}
