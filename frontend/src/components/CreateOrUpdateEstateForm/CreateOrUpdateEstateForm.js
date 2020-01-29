import React, {Component} from 'react';

import "./CreateOrUpdateEstateForm.css"
import FormMap from "../FormMap/FormMap";
import {withRouter, Redirect} from "react-router-dom";
import {withElementClassName} from "../HOCs/withElementClassName.js";
import axios from "axios";
import "../Styles/Button.css"
import {BASE_API_URL} from "../../utils/constants";
import authService from "../../Service/AuthService"

class CreateOrUpdateEstateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      city: "",
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
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
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

  handlePriceChange(evt) {
    const testRegEx = /^\d{0,6}\.?\d{1,2}?$/;
    const {name, value} = evt.target;

    if (!testRegEx.test(value)) return;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (this.props.isUpdateForm) {
      this.putData();
    } else {
      this.postData();
    }
  }

  setMarker(newMarkerCoords) {
    this.setState({markerCoords: newMarkerCoords})
  }

  fetchData() {
    const id = parseInt(this.props.match.params.id);
    axios
        .get(`${BASE_API_URL}/real-estate/${id}`)
        .then(response => response.data)
        .then(fetchedData => {
          this.setState({
            name: fetchedData.name,
            city: fetchedData.city,
            imgLinks: fetchedData.photos.map(p => p.imgSrc),
            price: fetchedData.price,
            description: fetchedData.description,
            markerCoords: fetchedData.position
          })
        });
  }

  componentDidMount() {
    if (this.props.isUpdateForm) {
      this.fetchData()
    }
  }

  handleAddInputClick(evt) {
    evt.preventDefault();
    this.setState(curState => ({imgLinks: [...curState.imgLinks, ""]}));
  }

  handleDeleteInputClick(evt) {
    evt.preventDefault();

    if (evt.currentTarget.tagName === "BUTTON") {

      const numberOfInput = parseInt(evt.currentTarget.dataset.inputNumber);

      this.setState(curState => ({
        imgLinks: curState.imgLinks.filter((link, idx) => {
          return idx !== numberOfInput
        })
      }));
    }
  }

  extractRealEstateData() {
    const {
      name,
      city,
      imgLinks,
      price,
      description,
      markerCoords
    } = this.state;

    return {
      name,
      city,
      photos: imgLinks,
      price,
      description,
      position: markerCoords
    };
  }

  resetForm() {
    this.setState({
      name: "",
      city: "",
      imgLinks: [""],
      price: "",
      description: "",
      markerCoords: {}
    })
  }

  postData() {
    const realEstateData = this.extractRealEstateData();

    axios.post(`${BASE_API_URL}/real-estate`,{...realEstateData})
        .then(() => {
          this.props.history.push({
            pathname: "/real-estate",
            state: {
              message: "Successfully added real estate!"
            }
          });
        })
  }

  putData() {
    const realEstateData = this.extractRealEstateData();
    const id = parseInt(this.props.match.params.id);

    axios.put(`${BASE_API_URL}/real-estate/${id}`,{...realEstateData})
        .then(() => {
          this.props.history.push({
            pathname: "/real-estate",
            state: {
              message: "Successfully edited real estate!"
            }
          });
        })
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
    ));

    return (
        <form action="#"
              className={`CreateOrUpdateRealEstateForm ${elementClassName}`}
              onSubmit={this.handleSubmit}
        >
            {!authService.isLoggedIn() && <Redirect to="/login" />}
          <h2 className="CreateOrUpdateRealEstateForm__title">{titleVerb} Real Estate</h2>
          <div className="CreateOrUpdateRealEstateForm__flex-wrapper">
            <div className="CreateOrUpdateRealEstateForm__input-group">
              <div className="CreateOrUpdateRealEstateForm__input-label">Real Estate Name</div>
              <input type="text"
                     placeholder="Historic House In Old Town"
                     name="name"
                     className="input-field CreateOrUpdateRealEstateForm__input-field"
                     onChange={this.handleChange}
                     value={this.state.name}
                     required
              />

              <div className="CreateOrUpdateRealEstateForm__input-label">City:</div>
              <input type="text"
                     placeholder="Kyiv"
                     name="city"
                     className="input-field CreateOrUpdateRealEstateForm__input-field"
                     onChange={this.handleChange}
                     value={this.state.city}
                     required
              />

              {imageLinkInputFields}

              <div className="CreateOrUpdateRealEstateForm__input-label">Price Per Night</div>
              <input type="number"
                     placeholder="12"
                     name="price"
                     className="input-field CreateOrUpdateRealEstateForm__input-field"
                     onChange={this.handlePriceChange}
                     value={this.state.price ||""}
                     required
              />
              <div className="CreateOrUpdateRealEstateForm__input-label">Description</div>
              <textarea name="description"
                        className="textarea CreateOrUpdateRealEstateForm__textarea"
                        placeholder="Put the short description here"
                        onChange={this.handleChange}
                        value={this.state.description}
              />
            </div>
            <div className="CreateOrUpdateRealEstateForm__address-block address-block">
              <div className="CreateOrUpdateRealEstateForm__input-label">Address:</div>
              <div className="CreateOrUpdateRealEstateForm__FormMap">
                <FormMap
                    handleClick={this.setMarker}
                    markerCoords={this.state.markerCoords}
                />
              </div>
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