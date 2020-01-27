package com.ikozlinskyi.realestatebookingapp.service;


import com.ikozlinskyi.realestatebookingapp.entity.User;
import com.ikozlinskyi.realestatebookingapp.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {

  @Autowired
  private IUserRepository userRepository;

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Override
  public User saveUser(User newUser) {
      newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

      return userRepository.save(newUser);
  }

  @Override
  public User findByUsername(String username) {

    User foundUser = this.userRepository.findByUsername(username);

    if (foundUser == null) {
      throw new UsernameNotFoundException("Cannot find user with username '" + username + "'");
    }

    return foundUser;
  }

  @Override
  public boolean isUsernameAvailable(String username) {
    return this.userRepository.findByUsername(username) == null;
  }
}
