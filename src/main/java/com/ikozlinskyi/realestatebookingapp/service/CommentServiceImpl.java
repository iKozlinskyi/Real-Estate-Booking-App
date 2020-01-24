package com.ikozlinskyi.realestatebookingapp.service;

import com.ikozlinskyi.realestatebookingapp.entity.Comment;
import com.ikozlinskyi.realestatebookingapp.exception.CommentNotFoundException;
import com.ikozlinskyi.realestatebookingapp.repository.ICommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentServiceImpl implements ICommentService {

  private ICommentRepository commentRepository;

  @Autowired
  public CommentServiceImpl(ICommentRepository commentRepository) {
    this.commentRepository = commentRepository;
  }

  @Override
  public Comment findById(int id) {
    Optional<Comment> result = commentRepository.findById(id);

    Comment foundComment = null;

    if (result.isPresent()) {
      foundComment = result.get();
    } else {
      throw new CommentNotFoundException("Did not find comment with given id" + id);
    }

    return foundComment;
  }

  @Override
  public void save(Comment comment) {
    this.commentRepository.save(comment);
  }

  @Override
  public void deleteById(int id) {
    this.commentRepository.deleteById(id);
  }
}
