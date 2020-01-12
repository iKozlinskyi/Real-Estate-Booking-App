import React, {Component} from 'react';
import Title from "./Title";
import Button from "./Button";
import Comment from "./Comment";
import "./RealEstatePage.css"
import {findRealEstateById} from "../utils/DataProvider";
import CommentList from "./CommentList";

class RealEstatePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      realEstateData: []
    }
  }

  componentDidMount() {
    this.setState({realEstateData: this.getRealEstateData()})
  }

  getRealEstateData() {
    return findRealEstateById(this.props.id)
  }

  render() {
    const {
      id,
      name,
      imgUrl,
      pricePerStay,
      author,
      description,
      comments
    } = this.state.realEstateData;

    return (
        <>
        <article className="RealEstate-card">
          <Title text={name}/>
          <div className="RealEstate-card__img-area img-area">
            <img
                src={imgUrl}
                alt={name} className="img-area__RealEstate-img "/>
          </div>
          <div className="price-block RealEstate-card__price-block">
            <div className="price-block__description">
              Price per stay:
            </div>
            <div className="price-block__price">{pricePerStay}</div>
          </div>
          <div className="description-block">
            <p className="description-block__text">{description}</p>
          </div>
          <div className="RealEstate-card__controls">
            <Button text="Edit" modifier="warning"/>
            <Button text="Delete" modifier="danger"/>
          </div>
        </article>
          {comments && <CommentList comments={comments}/>}
        </>
    );
  }
}

export default RealEstatePage;