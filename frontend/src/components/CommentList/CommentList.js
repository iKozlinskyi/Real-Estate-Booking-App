import React, {Component} from 'react';
import Comment from "../Comment/Comment";
import "./CommentList.css"
import CommentForm from "../CommentForm/CommentForm";
import {Link} from "react-router-dom";

class CommentList extends Component {

  render() {

    const {handleCommentSend, message, type} = this.props;

    const comments = this.props.comments.map(commentData =>
            <Comment
              key={commentData.id}
              {...commentData}
              authorName={commentData.author.username}
              elementClass="CommentList__Comment"
              handleCommentDelete={this.props.handleCommentDelete}
              currentUsername={this.props.currentUsername}
            />
        );

    const isFormShown = !!this.props.currentUsername;

    // noinspection CheckTagEmptyBody
    return (
        <section className="CommentList" >
          {isFormShown ?
              <CommentForm
                  elementClass="CommentList__CommentForm"
                  handleCommentSend={handleCommentSend}
                  message={message}
                  type={type}
                  handleCommentFormChange={this.props.handleCommentFormChange}
              /> :
          <div className="CommentList__message">
            Please, <Link to="/login">Log In</Link> to leave a comment.
          </div>
          }

          {comments}
        </section>
    );
  }
}

export default CommentList;