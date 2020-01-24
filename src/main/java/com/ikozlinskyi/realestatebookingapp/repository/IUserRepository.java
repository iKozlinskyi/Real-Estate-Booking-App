package com.ikozlinskyi.realestatebookingapp.repository;

import com.ikozlinskyi.realestatebookingapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {

  User findByUsername(String username);

  User getById(long id);

  @Override
  <S extends User> S save(S s);
}
