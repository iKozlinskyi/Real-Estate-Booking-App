package com.ikozlinskyi.realestatebookingapp.service;

import com.ikozlinskyi.realestatebookingapp.entity.Comment;

public interface ICommentService {

  Comment findById(int id);

  void save(Comment comment);

  void deleteById(int id);
}
