package com.ikozlinskyi.realestatebookingapp.controller;

import com.ikozlinskyi.realestatebookingapp.entity.Comment;
import com.ikozlinskyi.realestatebookingapp.entity.RealEstate;
import com.ikozlinskyi.realestatebookingapp.entity.User;
import com.ikozlinskyi.realestatebookingapp.exception.UserDoesNotHavePermissionException;
import com.ikozlinskyi.realestatebookingapp.service.CommentServiceImpl;
import com.ikozlinskyi.realestatebookingapp.service.RealEstateServiceImpl;
import com.ikozlinskyi.realestatebookingapp.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/real-estate/{realEstateId}/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CommentRestController {

  private RealEstateServiceImpl realEstateService;

  private CommentServiceImpl commentService;

  private UserServiceImpl userService;

  @Autowired
  public CommentRestController(RealEstateServiceImpl realEstateService, CommentServiceImpl commentService, UserServiceImpl userService) {
    this.realEstateService = realEstateService;
    this.commentService = commentService;
    this.userService = userService;
  }

  @PostMapping("/comments")
  public Comment addComment(@AuthenticationPrincipal Principal principal,
                            @PathVariable int realEstateId,
                            @RequestBody Comment newComment) {

    newComment.setId(0);

    User authorizedUser = this.userService.findByUsername(principal.getName());
    newComment.setAuthor(authorizedUser);

    RealEstate foundRealEstate = this.realEstateService.findById(realEstateId);
    foundRealEstate.addComment(newComment);

    commentService.save(newComment);

    return newComment;
  }

  @DeleteMapping("/comments/{commentId}")
  public String removeComment(@AuthenticationPrincipal Principal principal,
                              @PathVariable int commentId) {

    //Also performs check if comment exists, throws CommentNotFoundException otherwise
    Comment foundComment = commentService.findById(commentId);

    checkPermission(principal, foundComment);

    commentService.deleteById(commentId);

    return "Successfully removed comment with id - " + commentId;
  }

  private void checkPermission(Principal authorisedPrincipal, Comment comment) {
    User authorizedUser = this.userService.findByUsername(authorisedPrincipal.getName());
    long authorizedUserId = authorizedUser.getId();
    long resourceAuthorId = comment.getAuthor().getId();

    if (authorizedUserId != resourceAuthorId) {
      throw new UserDoesNotHavePermissionException("Current user '" + authorizedUser.getUsername() + "' does not have" +
                                                       " permission to perform request.");
    }
  }
}
