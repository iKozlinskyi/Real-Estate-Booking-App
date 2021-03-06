import React, {Component} from 'react';
import "./RealEstatePage.css"
import CommentList from "../CommentList/CommentList";
import {Link, withRouter} from "react-router-dom";
import PageMap from "../PageMap/PageMap";
import "../Styles/Button.css"
import RealEstateCarousel from "../RealEstateCarousel/RealEstateCarousel";
import axios from "axios";
import {BASE_API_URL} from "../../utils/constants";
import DateRangePickerWrapper from "../DateRangePickerWrapper/DateRangePickerWrapper";
import authService from "../../Service/AuthService"

class RealEstatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      realEstateData: [],
      carouselFullScreen: false,
      currentSlideNumber: 0,
      isFirstSlide: true,
      isLoading: true,
      error: "",
      formMessage: {
        message: "",
        type: "",
        duration: 0
      }
    };

    this.onClosePopupClick = this.onClosePopupClick.bind(this);
    this.onSlideClick = this.onSlideClick.bind(this);
    this.handleSlideChange = this.handleSlideChange.bind(this);
    this.handleRealEstateDelete = this.handleRealEstateDelete.bind(this);
    this.onCommentSend = this.onCommentSend.bind(this);
    this.resetMessage = this.resetMessage.bind(this);
    this.handleCommentFormChange = this.handleCommentFormChange.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.handleReservation = this.handleReservation.bind(this);
  }

  componentDidMount() {
    this.getRealEstateData();
  }

  getRealEstateData() {
    const id = parseInt(this.props.match.params.id);
    axios
        .get(`${BASE_API_URL}/real-estate/${id}`)
        .then(response => {

          //Transforming comment creation time to milliseconds, sorting them (newest first)
          response.data.comments = response.data.comments
              .map(comment => ({...comment, createdAt: Date.parse(comment.createdAt)}))
              .sort((commentA, commentB) => commentB.createdAt - commentA.createdAt);

          this.setState({
            realEstateData: response.data,
            isLoading: false
          })
        })
        .catch(err => {
          this.setState({
            error: err,
            isLoading: false
          })
        });
  }

  onClosePopupClick() {
    this.setState({
      carouselFullScreen: false
    }, () => this.changeSlideForwardBackward())
  }

  onSlideClick() {
    this.setState({
      carouselFullScreen: true
    }, () => this.changeSlideForwardBackward())
  }

  handleSlideChange(slideNumber) {
    this.setState({currentSlideNumber: slideNumber})
  }

  /**This is really ugly, but it solves problem with black stripes in carousel,
   * which appears when carousel has photos of various height.
   */
  changeSlideForwardBackward() {
    this.setState(curState => {
      const isFirstSlide = curState.currentSlideNumber === 0;
      return {
        currentSlideNumber: curState.currentSlideNumber - 1,
        isFirstSlide: isFirstSlide
      }
    }, () => {
      this.setState(curState => {
        let nextSlideNumber = curState.isFirstSlide ? 0 : curState.currentSlideNumber + 1;
        return {
          currentSlideNumber: nextSlideNumber
        }
      })
    })
  }

  handleRealEstateDelete() {
    let confirmation = confirm(
        "Are you sure that you want to delete this real estate? After deletion, there is no way to restore it."
    );

    if (!confirmation) return;

    const id = parseInt(this.props.match.params.id);

    axios.delete(`${BASE_API_URL}/real-estate/${id}`)
        .then(() => {
          this.props.history.push({
            pathname: "/real-estate",
            state: {
              message: "Successfully deleted real estate!"
            }
          });
        })
  }

  onCommentSend(message) {
    if (message === "") {
      this.showFormMessage(
          "Please, do not send empty comments",
          "warning"
          );
    }

    const id = parseInt(this.props.match.params.id);
    axios.post(
        `${BASE_API_URL}/real-estate/${id}/comments`,
        {
          text: message
        })
        .then(() => this.getRealEstateData())
        .then(() => this.showTimedFormMessage(
            "Successfully added your comment!",
            "success"
        ))
  }

  showFormMessage(message, type) {
    this.setState({
      formMessage : {
        message,
        type
      }
    })
  }

  showTimedFormMessage(message, type, duration = 5000) {
    this.setState({
      formMessage : {
        message,
        type
      }
    }, () => setTimeout( () => {
      this.resetMessage()
    }, duration))
  }

  handleCommentFormChange() {
    if (this.state.formMessage.message !== "") {
      this.resetMessage();
    }
  }

  resetMessage() {
    this.setState({
      formMessage: {
        message: "",
        type: "",
        duration: 0
      }
    });
  }

  handleCommentDelete(commentId) {
    const id = parseInt(this.props.match.params.id);

    axios.delete(`${BASE_API_URL}/real-estate/${id}/comments/${commentId}`)
        .then(() => this.getRealEstateData())
        .then(() => this.showTimedFormMessage(
            "Successfully deleted comment!",
            "success"
        ))
  }

  handleReservation(momentStartDate, momentEndDate) {
    const id = this.state.realEstateData.id;

    const startDate = momentStartDate.toISOString();
    const endDate = momentEndDate.toISOString();

    const payload = {
      reservationStart: startDate,
      reservationEnd: endDate
    };


    axios.post(`${BASE_API_URL}/real-estate/${id}/reservations`, {...payload})
        .then(() => {
          this.props.history.push({
            pathname: "/real-estate",
            state: {
              message: "Successfully booked real estate!"
            }
          });
        })
        .catch(err => {
          console.log(err.response);
        })
  }

  render() {

    const {
      name,
      price,
      author,
      city,
      description,
      comments,
      position,
      photos,
      reservations
    } = this.state.realEstateData;

    const pagePathName = this.props.location.pathname;
    const {carouselFullScreen, currentSlideNumber} = this.state;
    const {message, type} = this.state.formMessage;

    let showControls, authorName;
    if (author) {
      showControls = author.username === this.props.currentUsername;
      authorName = author.username;
    }

    const loadedPage = (
        <>
          <article className="RealEstate-card">
            <h2 className="title">{name}</h2>
            <div className="RealEstate-card__main">
              <div
                  className={`RealEstate-card__img-area img-area ${carouselFullScreen &&
                  "RealEstate-card__carousel-wrapper--full-screen"}`}
              >
                {carouselFullScreen &&
                <button className="popup__exit" onClick={this.onClosePopupClick}/>
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
              <div className="RealEstate-card__info-block">
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
                <div className="info-item info-block__info-item info-block__info-item--right-alignment">
                  <div className="info-item__text">
                    Posted by:
                  </div>
                  <div className="info-item__value">
                    <Link to="#">{authorName}</Link>
                  </div>
                </div>
              </div>
            </div>
            {authService.isLoggedIn() ?
                <DateRangePickerWrapper
                    reservations={reservations}
                    onReservation={this.handleReservation}
                    elementClassName="RealEstate-card__DateRangePickerWrapper"
                /> :
                <div className="RealEstate-card__message">
                  Please, <Link to="/login">Log In</Link> to book this real estate.
                </div>}


            {showControls &&
            <div className="controls RealEstate-card__controls">
              <Link className="button RealEstate-card__button button--warning controls__EditButton"
                    to={pagePathName + "/edit"}
              >Edit</Link>
              <button
                  className="button RealEstate-card__button button--danger controls__DeleteButton"
                  onClick={this.handleRealEstateDelete}
              >
                Delete
              </button>
            </div>}

            <div className="map RealEstatePage__map">
              <PageMap position={position} name={name}/>
            </div>
          </article>

          {comments &&
          <CommentList
              comments={comments}
              handleCommentSend={this.onCommentSend}
              message={message}
              type={type}
              currentUsername={this.props.currentUsername}
              handleCommentFormChange={this.handleCommentFormChange}
              handleCommentDelete={this.handleCommentDelete}
          />}

        </>
    );

    const requestResult = this.state.error ?
        "An error occurred while processing your request. Please, try again later" :
        loadedPage;

    return (
        <div className="RealEstatePage">
          {this.state.isLoading ? "Loading..." : requestResult}
        </div>
    );
  }
}

export default withRouter(RealEstatePage);