import React, {Component} from 'react';
import Comment from "../Comment/Comment";
import "./CommentList.css"
import CommentForm from "../CommentForm/CommentForm";

class CommentList extends Component {

  render() {

    const {handleCommentSend, message, type} = this.props;

    const comments = this.props.comments.map(commentData =>
            <Comment
              key={commentData.id}
              {...commentData}
              author={commentData.author.userName}
              elementClass="CommentList__Comment"
            />
        );

    // noinspection CheckTagEmptyBody
    return (
        <section className="CommentList" >
          <CommentForm
              elementClass="CommentList__CommentForm"
              handleCommentSend={handleCommentSend}
              message={message}
              type={type}
              handleCommentFormChange={this.props.handleCommentFormChange}
          />
          {comments}
        </section>
    );
  }
}

export default CommentList;