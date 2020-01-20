import React, {Component} from 'react';
import "./RealEstatePage.css"
import {findRealEstateById} from "../../utils/DataProvider";
import CommentList from "../CommentList/CommentList";
import {Link, withRouter} from "react-router-dom";
import PageMap from "../PageMap/PageMap";
import "../Styles/Button.css"
import RealEstateCarousel from "../RealEstateCarousel/RealEstateCarousel";

class RealEstatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      realEstateData: [],
      carouselFullScreen: false,
      currentSlideNumber: 0
    };

    this.onClosePopupClick = this.onClosePopupClick.bind(this);
    this.onSlideClick = this.onSlideClick.bind(this);
    this.handleSlideChange = this.handleSlideChange.bind(this);
  }

  componentDidMount() {
    this.setState({realEstateData: this.getRealEstateData()})
  }

  getRealEstateData() {
    const id = parseInt(this.props.match.params.id);
    return findRealEstateById(id);
  }

  onClosePopupClick() {
    this.setState({carouselFullScreen: false})
  }

  onSlideClick() {
    this.setState({carouselFullScreen: true})
  }

  handleSlideChange(slideNumber) {
    this.setState({currentSlideNumber: slideNumber})
  }

  render() {

    const {
      id,
      name,
      price,
      author,
      city,
      description,
      comments,
      position,
      photos
    } = this.state.realEstateData;

    const pagePathName = this.props.location.pathname;
    const {carouselFullScreen, currentSlideNumber} = this.state;

    return (
        <div className="RealEstatePage">
          <article className="RealEstate-card">
            <h2 className="title">{name}</h2>
            <div className="main">
              <div
                  className={`RealEstate-card__img-area img-area ${carouselFullScreen &&
                  "RealEstate-card__carousel-wrapper--full-screen"}`}
              >
                {carouselFullScreen &&
                <button className="popup__exit" onClick={this.onClosePopupClick}></button>
                }

                {photos &&
                <RealEstateCarousel
                    elementClassName={`${carouselFullScreen &&
                    "RealEstate-card__RealEstateCarousel"}`}
                    onSlideClick={this.onSlideClick}
                    slideNumber={currentSlideNumber}
                    onSlideChange={this.handleSlideChange}
                    slides={photos}
                />}

              </div>
              <div className="info-block">
                <div className="info-item info-block__info-item">
                  <div className="info-item__text">
                    Price per stay:
                  </div>
                  <div className="info-item__value info-item__value--bright">{price}$</div>
                </div>
                <div className="info-item info-block__info-item">
                  <div className="info-item__text">
                    City:
                  </div>
                  <div className="info-item__value">{city}</div>
                </div>
                <div className="description-block">
                  <p className="description-block__text">{description}</p>
                </div>
              </div>
            </div>
            <div className="controls RealEstate-card__controls">
              <Link className="button RealEstate-card__button button--warning controls__EditButton"
                    to={pagePathName + "/edit"}
              >Edit</Link>
              <Link className="button RealEstate-card__button button--danger controls__DeleteButton"
                    to="/">Delete</Link>
            </div>
            <div className="map RealEstatePage__map">
              <PageMap position={position} name={name}/>
            </div>
          </article>
          {comments && <CommentList comments={comments}/>}
        </div>
    );
  }
}

export default withRouter(RealEstatePage);