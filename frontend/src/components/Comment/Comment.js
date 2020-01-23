import React, {Component} from 'react';
import "./Comment.css"
import "../Styles/Button.css"

class Comment extends Component {

  constructor() {
    super();

    this.onCommentDelete = this.onCommentDelete.bind(this);
  }

  onCommentDelete() {
    this.props.handleCommentDelete(this.props.id);
  }

  parseDate(milliseconds) {
    const date = new Date(milliseconds);

    const year = date.getFullYear(),
          month = (date.getMonth() + 1).toString().padStart(2, "0"),
          day = date.getDate().toString().padStart(2, "0"),
          hour = date.getHours().toString().padStart(2, "0"),
          minute = date.getMinutes().toString().padStart(2, "0"),
          second = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day}, ${hour}:${minute}:${second}`
  }

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
              <sub>{this.parseDate(createdAt)}</sub>
            </div>
          </div>
          <div className="Comment__text">
            {text}
          </div>
          <div className="controls Comment__controls">
            <button
                className="button RealEstate-card__button button--danger"
                onClick={this.onCommentDelete}
            >
              Delete
            </button>
          </div>
        </article>
    );
  }
}

export default Comment;