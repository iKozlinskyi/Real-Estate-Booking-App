package com.ikozlinskyi.realestatebookingapp.repository;

import com.ikozlinskyi.realestatebookingapp.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICommentRepository extends JpaRepository<Comment, Integer> {
}
