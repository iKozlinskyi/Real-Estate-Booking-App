import React, {Component} from 'react';
import Comment from "./Comment";
import "./CommentList.css"
import CommentForm from "./CommentForm";

class CommentList extends Component {

  render() {

    const comments = this.props.comments.map(commentData =>
            <Comment
              key={commentData.id}
              {...commentData}
              elementClass="CommentList__Comment"
            />
        );

    // noinspection CheckTagEmptyBody
    return (
        <section className="CommentList" >
          <CommentForm elementClass="CommentList__CommentForm" />
          {comments}
        </section>
    );
  }
}

export default CommentList;