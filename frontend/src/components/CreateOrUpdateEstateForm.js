import React, {Component} from 'react';

import "./CreateOrUpdateEstateForm.css"
import FormMap from "./FormMap";
import {withRouter} from "react-router-dom";
import {findRealEstateById} from "../utils/DataProvider";
import {withElementClassName} from "./withElementClassName";
import "./Button.css"

class CreateOrUpdateEstateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      imgUrl: "",
      price: "",
      description: "",
      markerCoords: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMarker = this.setMarker.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }

  setMarker(newMarkerCoords) {
    this.setState({markerCoords: newMarkerCoords})
  }

  fetchData() {
    const id = parseInt(this.props.match.params.id);
    const {name, imgUrl, pricePerStay, description, position} = findRealEstateById(id);
    this.setState(
        {
          name,
          imgUrl,
          price: pricePerStay,
          description,
          markerCoords: position
        }
    );
  }

  componentDidMount() {
    const isUpdateForm = this.props.match.path === "/real-estate/:id/edit";

    if (isUpdateForm) {
      this.fetchData()
    }
  }

  render() {
    const elementClassName = this.props.elementClassName;
    const titleVerb = this.props.isUpdateForm ? "Edit" : "Add";

    return (
        <form action="#" method="post" className={`CreateOrUpdateRealEstateForm ${elementClassName}`}>
          <h2 className="CreateOrUpdateRealEstateForm__title">{titleVerb} Real Estate</h2>
          <input type="text"
                 placeholder="Real Estate Name"
                 name="name"
                 className="input-field CreateOrUpdateRealEstateForm__input-field"
                 onChange={this.handleChange}
                 value={this.state.name}
                 required/>
          <input type="text"
                 placeholder="Image URL"
                 name="imgUrl"
                 className="input-field CreateOrUpdateRealEstateForm__input-field"
                 onChange={this.handleChange}
                 value={this.state.imgUrl}
                 required
          />
          <input type="text"
                 placeholder="Price per night"
                 name="price"
                 className="input-field CreateOrUpdateRealEstateForm__input-field"
                 onChange={this.handleChange}
                 value={this.state.price}
                 pattern="^\d{1,6}\.?\d{1,2}?$"
                 required
          />
          <textarea name="description"
                    className="textarea CreateOrUpdateRealEstateForm__textarea"
                    placeholder="Real Estate description"
                    onChange={this.handleChange}
                    value={this.state.description}
          />
          <div className="CreateOrUpdateRealEstateForm__address-block address-block">
            <div className="address-block__address-label">Address:</div>
            <div className="CreateOrUpdateRealEstateForm__FormMap">
              <FormMap
                  handleClick={this.setMarker}
                  markerCoords={this.state.markerCoords}

              />
            </div>
          </div>
          <input type="submit"
                 className="button button--link CreateOrUpdateRealEstateForm__button"
                 value="Submit"
          />
        </form>
    );
  }
}

export default withElementClassName(withRouter(CreateOrUpdateEstateForm));