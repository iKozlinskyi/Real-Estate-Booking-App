import React, {Component} from 'react';
import Comment from "./Comment";
import "./CommentList.css"

class CommentList extends Component {

  render() {

    const comments = this.props.comments.map(commentData => <Comment key={commentData.id} {...commentData}/>);

    // noinspection CheckTagEmptyBody
    return (
        <section className="comments main__comments">
          {comments}
        </section>
    );
  }
}

export default CommentList;