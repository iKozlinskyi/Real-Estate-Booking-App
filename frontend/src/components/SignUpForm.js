import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./SignUpForm.css"
import {isUsernameAvailable} from "../utils/DataProvider";
import {withElementClassName} from "./withElementClassName";
import "./Button.css"

class SignUpForm extends Component {

  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      isWarningVisible: false,
      isUsernameAvailable: true
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
    }, () => this.setState({isUsernameAvailable: this.isUsernameAvailable()}));
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.isUsernameAvailable) {
      return undefined
    }
  }

  isUsernameAvailable() {
    return isUsernameAvailable(this.state.username);
  }

  showWarning() {
    this.setState({isWarningVisible: true})
  }

  hideWarning() {
    this.setState({isWarningVisible: false})
  }

  render() {
    const elementClassName = this.props.elementClassName;

    const {isWarningVisible, isUsernameAvailable} = this.state;
    const isUsernameAvailabilityMessageShown = this.state.username !== "";

    const usernameAvailabilityMessage = isUsernameAvailable ?
        <div className="form-message SignUpForm__form-message form-message--success">
          Good, your username is unique!
        </div>
        :
        <div className="form-message SignUpForm__form-message form-message--warning">
          Looks like your username has been taken. Try another one!
        </div>;

    return (
        <form action="#" method="post" className={`SignUpForm ${elementClassName} SignUpForm--auth`}>
          <h2 className="SignUpForm__title">Sign Up</h2>
          <div className="message">
            Already have an account? <Link to="/login">LogIn here</Link>
          </div>

          {isWarningVisible &&
          <div className="form-message SignUpForm__form-message">
            Please, fill in all fields
          </div>}

          {isUsernameAvailabilityMessageShown && usernameAvailabilityMessage}

          <input type="text"
                 placeholder="Username"
                 name="username"
                 className="input-field SignUpForm__input-field"
                 onChange={this.handleChange}
                 value={this.state.username}
                 required/>
          <input type="password"
                 placeholder="Password"
                 name="password"
                 className="input-field SignUpForm__input-field"
                 onChange={this.handleChange}
                 value={this.state.password}
                 required
          />
          <input type="submit"
                 className="button button--link SignUpForm__button"
                 value="Submit"
          />
        </form>
    );
  }
}

export default withElementClassName(SignUpForm);