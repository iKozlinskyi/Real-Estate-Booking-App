import React, {Component} from 'react';

import "./Form.css"

class CreateRealEstateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      imgUrl: "",
      price: "",
      description: ""
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

    const elementClass = this.props.elementClass || "";

    return (
        <form action="#" method="post" className={`Form ${elementClass}`}>
          <h2 className="Form__title">Add Real Estate</h2>
          <input type="text"
                 placeholder="Real Estate Name"
                 name="name"
                 className="input-field Form__input-field"
                 onChange={this.handleChange}
                 value={this.state.name}
                 required/>
          <input type="text"
                 placeholder="Image URL"
                 name="imgUrl"
                 className="input-field Form__input-field"
                 onChange={this.handleChange}
                 value={this.state.imgUrl}
                 required
          />
          <input type="text"
                 placeholder="Price per night"
                 name="price"
                 className="input-field Form__input-field"
                 onChange={this.handleChange}
                 value={this.state.price}
                 pattern="^\d{1,6}\.?\d{1,2}?$"
                 required
          />
          <textarea name="description"
                    className="textarea Form__textarea"
                    placeholder="Real Estate description"
                    onChange={this.handleChange}
                    value={this.state.description}
          />
          <input type="submit"
                 className="button button--link Form__button"
                 value="Submit"
          />
        </form>
    );
  }
}

export default CreateRealEstateForm;