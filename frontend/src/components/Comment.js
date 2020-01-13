import React, {Component} from 'react';
import Button from "./Button";
import "./Comment.css"

class Comment extends Component {
  render() {
    const {
      id,
      author,
      createdAt,
      text,
      elementClass
    } = this.props;

    return (
        <article className={`${elementClass} Comment`}>
          <div className="Comment__header">
            <div className="Comment__author">
              <strong>{author}</strong>
            </div>
            <div className="Comment__timestamp">
              <sub>{createdAt}</sub>
            </div>
          </div>
          <div className="Comment__text">
            {text}
          </div>
          <div className="controls Comment__controls">
            <Button modifier="danger" text="Delete" />
          </div>
        </article>
    );
  }
}

export default Comment;