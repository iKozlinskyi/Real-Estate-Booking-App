import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import "./LogInForm.css"
import {withElementClassName} from "../HOCs/withElementClassName";
import "../Styles/Button.css"
import authService from "../../Service/AuthService.js"
import BlinkMessage from "../BlinkMessage/BlinkMessage";


class LogInForm extends Component {

  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errorStatus: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      errorStatus: null,
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    this.login();
  }

  login() {
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    const successCallback = () => {
      this.props.onLogin(authService.getUsername());

      this.props.history.push({
        pathname: "/real-estate",
        state: {
          message: "You have successfully logged in! Now you can use the app at its full potential!"
        }
      });
    };

    const errorCallback = (status) => {
      this.setState({
        errorStatus: status
      })
    };

    authService.login(credentials, successCallback, errorCallback);
  }

  render() {

    const elementClassName = this.props.elementClassName;

    let errorMessage;
    if (this.state.errorStatus === 403) {
      errorMessage = (
          <BlinkMessage
              type="warning"
              elementClassName="LogInForm__BlinkMessage"
          >
            Invalid username and/or password
          </BlinkMessage>
      )
    }

    return (
        <form
            action="#"
            className={`LogInForm ${elementClassName} LogInForm--auth`}
            onSubmit={this.handleSubmit}
        >
          <h2 className="LogInForm__title">Log In</h2>
          <div className="message">
            Don`t have an account? <Link to="/register">Sign Up here</Link>
          </div>

          {errorMessage}

          <input type="text"
                 placeholder="Username"
                 name="username"
                 className="input-field LogInForm__input-field"
                 onChange={this.handleChange}
                 value={this.state.username}
                 required/>
          <input type="password"
                 placeholder="Password"
                 name="password"
                 className="input-field LogInForm__input-field"
                 onChange={this.handleChange}
                 value={this.state.password}
                 required
          />
          <input type="submit"
                 className="button button--link LogInForm__button"
                 value="Submit"
          />
        </form>
    );
  }
}

export default withRouter(withElementClassName(LogInForm));