package com.ikozlinskyi.realestatebookingapp.controller;

import com.ikozlinskyi.realestatebookingapp.entity.Comment;
import com.ikozlinskyi.realestatebookingapp.entity.RealEstate;
import com.ikozlinskyi.realestatebookingapp.entity.User;
import com.ikozlinskyi.realestatebookingapp.service.CommentServiceImpl;
import com.ikozlinskyi.realestatebookingapp.service.RealEstateServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/real-estate/{realEstateId}/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommentRestController {

  private RealEstateServiceImpl realEstateService;
  private CommentServiceImpl commentService;

  @Autowired
  public CommentRestController(RealEstateServiceImpl realEstateService, CommentServiceImpl commentService) {
    this.realEstateService = realEstateService;
    this.commentService = commentService;
  }

  @PostMapping("/comments")
  public Comment addComment(@PathVariable int realEstateId,
                            @RequestBody Comment newComment) {

    newComment.setId(0);

    //This user is a stub for future Spring Security User
    User stubUser = new User("John", "john_donn", (byte) 1);
    newComment.setAuthor(stubUser);

    RealEstate foundRealEstate = this.realEstateService.findById(realEstateId);
    foundRealEstate.addComment(newComment);

    commentService.save(newComment);

    return newComment;
  }

  @DeleteMapping("/comments/{commentId}")
  public String removeComment(@PathVariable int commentId) {

    //Also performs check if comment exists, throws CommentNotFoundException otherwise
    Comment foundComment = commentService.findById(commentId);

    commentService.deleteById(commentId);

    return "Successfully removed comment with id - " + commentId;
  }
}
