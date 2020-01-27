import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./SignUpForm.css"
import {withElementClassName} from "../HOCs/withElementClassName";
import "../Styles/Button.css"
import authService from "../../Service/AuthService.js"
import BlinkMessage from "../BlinkMessage/BlinkMessage";
import LoaderAnimation from "../LoaderAnimation/LoaderAnimation";

class SignUpForm extends Component {

  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      isUsernameAvailable: true,
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isUsernameAvailable = this.isUsernameAvailable.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.isUsernameAvailable();
    this.register();
  }

  isUsernameAvailable() {

    this.setState({
      isLoading: true
    }, async () => {
      const username = this.state.username;
      const usernameAvailable = await authService.isUsernameAvailable(username);

      this.setState({
        isLoading: false,
        isUsernameAvailable: usernameAvailable
      })
    })
  }

  register() {
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    const redirect = () => {
      this.props.history.push({
        pathname: "/real-estate",
        state: {
          message: "You have successfully registered! Now you can Log In"
        }
      });
    };

    authService.register(credentials, redirect);
  }

  render() {
    const elementClassName = this.props.elementClassName;

    const {isUsernameAvailable, isLoading} = this.state;
    const isMessageShown = !isUsernameAvailable && this.state.username !== "";

    const usernameAvailabilityMessage = (
        <BlinkMessage type="warning" elementClassName="SignUpForm__BlinkMessage">
          Looks like your username has been taken. Try another one!
        </BlinkMessage>
    );

    return (
        <form
            action="#"
            className={`SignUpForm ${elementClassName} SignUpForm--auth`}
            onSubmit={this.handleSubmit}
        >
          <h2 className="SignUpForm__title">Sign Up</h2>
          <div className="message SignUpForm__message">
            Already have an account? <Link to="/login">LogIn here</Link>
          </div>

          {!isLoading && isMessageShown && usernameAvailabilityMessage}

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
          <button type="submit"
                  className="button button--link SignUpForm__button"
                  disabled={isLoading}
          >
            {isLoading ?
                <LoaderAnimation
                    size={"20px"}
                    borderWidth="5px"
                    elementClassName="SignUpForm__LoaderAnimation"
                /> :
                "Submit"}
          </button>

        </form>
    );
  }
}

export default withRouter(withElementClassName(SignUpForm));