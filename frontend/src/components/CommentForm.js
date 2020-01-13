import React, {Component} from 'react';
import "./CommentForm.css"

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
    if (this.state.isWarningVisible) {
      this.hideWarning();
    }

    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (this.state.commentText === "") {
      this.showWarning()
    }
  }

  showWarning() {
    this.setState({isWarningVisible: true})
  }

  hideWarning() {
    this.setState({isWarningVisible: false})
  }

  render() {
    const elementClass = this.props.elementClass;
    // noinspection CheckTagEmptyBody
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
          ></textarea>

          {this.state.isWarningVisible &&
            <div className="form-message form-message--danger CommentForm__form-message">
              Please, do not send empty comments
            </div>}

          <input className="button button--link CommentForm__button" type="submit" value="Send Comment"/>
        </form>
    );
  }
}

export default CommentForm;