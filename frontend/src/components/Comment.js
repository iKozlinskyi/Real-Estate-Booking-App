import React, {Component} from 'react';
import Button from "./Button";
import "./Comment.css"

class Comment extends Component {
  render() {
    const {
      id,
      author,
      createdAt,
      text
    } = this.props;

    return (
        <article className="comments__comment comment">
          <div className="comment__header">
            <div className="comment__author">
              <strong>{author}</strong>
            </div>
            <div className="comment__timestamp">
              <sub>{createdAt}</sub>
            </div>
          </div>
          <div className="comment__text">
            {text}
          </div>
          <div className="controls comment__controls">
            <Button modifier="danger" text="Delete" />
          </div>
        </article>
    );
  }
}

export default Comment;