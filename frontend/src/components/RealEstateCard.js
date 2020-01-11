import React, {Component} from 'react';
import "./RealEstateCard.css"

class RealEstateCard extends Component {
    render() {
        return (
            <li className="RealEstateCard RealEstateList__RealEstateCard">
                <a href={this.props.link} className="RealEstateCard__RealEstateCard-link">
                    <div className="img-area RealEstateCard__img-area">
                        <img src={this.props.imgUrl} alt="" className="img-area__RealEstateCard-img" />
                    </div>
                    <div className="RealEstateCard__body">
                        <h3 className="RealEstateCard__title">{this.props.name}</h3>
                    </div>
                </a>
            </li>
        );
    }
}

export default RealEstateCard;