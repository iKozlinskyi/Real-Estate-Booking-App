import React, {Component} from 'react';
import {Link} from "react-router-dom";
import "./Form.css"

class LogInForm extends Component {


  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  render() {

    const elementClass = this.props.elementClass;

    return (
        <form action="#" method="post" className={`Form ${elementClass} Form--auth`}>
          <h2 className="Form__title">Log In</h2>
          <div className="message">
            Don`t have an account? <Link to="/register">Sign Up here</Link>
          </div>

          <input type="text"
                 placeholder="Username"
                 name="username"
                 className="input-field Form__input-field"
                 onChange={this.handleChange}
                 value={this.state.username}
                 required/>
          <input type="password"
                 placeholder="Password"
                 name="password"
                 className="input-field Form__input-field"
                 onChange={this.handleChange}
                 value={this.state.password}
                 required
          />
          <input type="submit"
                 className="button button--link Form__button"
                 value="Submit"
          />
        </form>
    );
  }
}

export default LogInForm;