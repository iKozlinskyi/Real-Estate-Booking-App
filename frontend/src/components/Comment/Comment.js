import React, {Component} from 'react';
import "./Comment.css"

class Comment extends Component {
  render() {
    const {
      id,
      author: authorName,
      createdAt,
      text,
      elementClass
    } = this.props;

    return (
        <article className={`${elementClass} Comment`}>
          <div className="Comment__header">
            <div className="Comment__author">
              <strong>{authorName}</strong>
            </div>
            <div className="Comment__timestamp">
              <sub>{createdAt}</sub>
            </div>
          </div>
          <div className="Comment__text">
            {text}
          </div>
          <div className="controls Comment__controls">
            <button className="button RealEstate-card__button button--danger">Delete</button>
          </div>
        </article>
    );
  }
}

export default Comment;