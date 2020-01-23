import React, {Component} from 'react';
import "./CommentForm.css"
import "../Styles/Button.css"
import BlinkMessage from "../BlinkMessage/BlinkMessage";

class CommentForm extends Component {

  constructor() {
    super();

    this.state = {
      commentText: "",
      isWarningVisible: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });

    this.props.handleCommentFormChange();

  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.setState({
      commentText: ""
    });

    this.props.handleCommentSend(this.state.commentText)
  }

  render() {
    const elementClass = this.props.elementClass;

    return (
        <form action="#" method="post"
              className={`CommentForm ${elementClass}`}
              onSubmit={this.handleSubmit}
        >
          <label htmlFor="commentText">Your comment:</label>
          <textarea className="CommentForm__textarea"
                    name="commentText" id="commentText"
                    placeholder="Leave your comment here..."
                    onChange={this.handleChange}
                    value={this.state.commentText}
          />

          {this.props.message &&
          <BlinkMessage elementClassName="CommentForm__BlinkMessage" type={this.props.type}>
            {this.props.message}
          </BlinkMessage>}

          <input className="button button--link CommentForm__button" type="submit" value="Send Comment"/>
        </form>
    );
  }
}

export default CommentForm;