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
      confirmationPassword: "",
      isLoading: false,
      message: {
        text: "",
        type: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isUsernameAvailable = this.isUsernameAvailable.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
      message: {
        text: "",
        type: ""
      }
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.passwordsMatch()) {
      this.setState({
        message: {
          text: "Passwords don`t match",
          type: "danger"
        }
      });

      return
    }

    this.isUsernameAvailable();

    if (this.state.message.text !== "") return;

    this.register();
  }

  isUsernameAvailable() {

    this.setState({
      isLoading: true
    }, async () => {
      const username = this.state.username;
      const usernameAvailable = await authService.isUsernameAvailable(username);

      if (usernameAvailable) return;

      this.setState({
        isLoading: false,
        message: {
          type: "warning",
          text: "Looks like your username has been taken. Try another one!"
        }
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

    passwordsMatch() {
      return this.state.password === this.state.confirmationPassword;
    }

  render() {
    const elementClassName = this.props.elementClassName;

    const {isLoading, message} = this.state;

    let blinkMessage;
    if (message.text) {
      blinkMessage = (
          <BlinkMessage type={message.type} elementClassName="SignUpForm__BlinkMessage">
            {message.text}
          </BlinkMessage>
      );
    }


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

          {!isLoading && blinkMessage}

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
          <input type="password"
                 placeholder="Confirm password"
                 name="confirmationPassword"
                 className="input-field SignUpForm__input-field"
                 onChange={this.handleChange}
                 value={this.state.confirmationPassword}
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