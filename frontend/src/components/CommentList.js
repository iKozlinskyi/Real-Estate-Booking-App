import React, {Component} from 'react';
import Comment from "./Comment";
import "./CommentList.css"
import CommentForm from "./CommentForm";

class CommentList extends Component {

  render() {

    const comments = this.props.comments.map(commentData => <Comment key={commentData.id} {...commentData}/>);

    // noinspection CheckTagEmptyBody
    return (
        <section className="commentList main__comments">
          <CommentForm />
          {comments}
        </section>
    );
  }
}

export default CommentList;