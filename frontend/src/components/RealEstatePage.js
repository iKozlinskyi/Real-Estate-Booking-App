import React, {Component} from 'react';
import Title from "./Title";
import Button from "./Button";
import "./RealEstatePage.css"

class RealEstatePage extends Component {
  render() {
    return (
        <article className="RealEstate-card">
          <Title text="@REAL ESTATE NAME" />
          <div className="RealEstate-card__img-area img-area">
            <img src="https://droidoo.com/wp-content/uploads/2019/08/Where-Will-AI-Take-the-Real-Estate-Market-in-10-Years-825x500.jpg" alt="@ALT" className="img-area__RealEstate-img "/>
          </div>
          <div className="price-block RealEstate-card__price-block">
            <div className="price-block__description">
              Price per stay:
            </div>
            <div className="price-block__price">@PRICE</div>
          </div>
          <div className="description-block">
            <p className="description-block__text">@DESCRIPTION</p>
          </div>
          <div className="controls RealEstate-card__controls">
            <Button text="Edit" modifier="warning" />
            <Button text="Delete" modifier="danger" />
          </div>
        </article>
    );
  }
}

export default RealEstatePage;