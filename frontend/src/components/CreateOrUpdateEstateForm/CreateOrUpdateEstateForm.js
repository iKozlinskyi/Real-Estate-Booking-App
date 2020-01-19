import React, {Component} from 'react';

import "./CreateOrUpdateEstateForm.css"
import FormMap from "../FormMap/FormMap";
import {withRouter} from "react-router-dom";
import {findRealEstateById} from "../../utils/DataProvider";
import {withElementClassName} from "../HOCs/withElementClassName.js";
import "../Styles/Button.css"

class CreateOrUpdateEstateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      imgLinks: [""],
      price: "",
      description: "",
      markerCoords: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setMarker = this.setMarker.bind(this);
    this.handleAddInputClick = this.handleAddInputClick.bind(this);
    this.handleDeleteInputClick = this.handleDeleteInputClick.bind(this);
  }

  handleChange(evt) {
    evt.persist();
    if (evt.target.dataset) {

      const numberOfInput = parseInt(evt.target.dataset.inputNumber);

      this.setState((curState) => ({
        imgLinks: curState.imgLinks.map((link, idx) => {
          if (idx === numberOfInput) {
            return evt.target.value;
          }

          return link;
        })
      }))
    }

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
    const {name, photos, pricePerStay, description, position} = findRealEstateById(id);
    this.setState(
        {
          name,
          imgLinks: photos.map(p => p.imgSrc),
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

  handleAddInputClick(evt) {
    evt.preventDefault();
    this.setState(curState => ({imgLinks: [...curState.imgLinks, ""]}));
  }

  handleDeleteInputClick(evt) {
    evt.preventDefault();

    const numberOfInput = parseInt(evt.target.dataset.inputNumber);

    this.setState(curState => ({
      imgLinks: curState.imgLinks.filter((link, idx) => {
        return idx !== numberOfInput
      })
    }));
  }

  render() {
    const elementClassName = this.props.elementClassName;
    const titleVerb = this.props.isUpdateForm ? "Edit" : "Add";

    const imageLinkInputFields = this.state.imgLinks.map((link, idx, linksArr) => (
        <div key={idx}>
          <div className="CreateOrUpdateRealEstateForm__input-label" >Image Link</div>
          <div className="input-group">
            <input type="text"
                   placeholder="http://"
                   name="imgUrl"
                   className="input-field CreateOrUpdateRealEstateForm__input-field"
                   onChange={this.handleChange}
                   value={link}
                   data-input-number={idx}
                   required
            />
            {(linksArr.length > 1) &&
                <div className="button-wrapper">
                  <button
                      className="input-number-button input-number-button--delete-input"
                      onClick={this.handleDeleteInputClick}
                      data-input-number={idx}
                  >
                    <div className="input-number-button__text">-</div>
                  </button>
                </div>
            }
            {idx === (linksArr.length - 1) &&
            <div className="button-wrapper">
              <button
                  className="input-number-button input-number-button--add-input"
                  onClick={this.handleAddInputClick}
              >
                +
              </button>
            </div>}
          </div>
        </div>
    ))

    return (
        <form action="#" method="post" className={`CreateOrUpdateRealEstateForm ${elementClassName}`}>
          <h2 className="CreateOrUpdateRealEstateForm__title">{titleVerb} Real Estate</h2>
          <div className="CreateOrUpdateRealEstateForm__input-label">Real Estate Name</div>
          <input type="text"
                 placeholder="Historic House In Old Town"
                 name="name"
                 className="input-field CreateOrUpdateRealEstateForm__input-field"
                 onChange={this.handleChange}
                 value={this.state.name}
                 required
          />

          {imageLinkInputFields}

          <div className="CreateOrUpdateRealEstateForm__input-label">Price Per Night</div>
          <input type="text"
                 placeholder="12"
                 name="price"
                 className="input-field CreateOrUpdateRealEstateForm__input-field"
                 onChange={this.handleChange}
                 value={this.state.price}
                 pattern="^\d{1,6}\.?\d{1,2}?$"
                 required
          />
          <div className="CreateOrUpdateRealEstateForm__input-label">Description</div>
          <textarea name="description"
                    className="textarea CreateOrUpdateRealEstateForm__textarea"
                    placeholder="Put the short description here"
                    onChange={this.handleChange}
                    value={this.state.description}
          />
          <div className="CreateOrUpdateRealEstateForm__address-block address-block">
            <div className="CreateOrUpdateRealEstateForm__input-label">Address:</div>
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