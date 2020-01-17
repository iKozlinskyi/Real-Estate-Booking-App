import React, {Component} from 'react';
import "./RealEstateCard.css"
import {Link} from "react-router-dom";

class RealEstateCard extends Component {
    render() {
        const {id, name, imgUrl, elementClass} = this.props;

        return (
            <li className={`RealEstateCard ${elementClass}`}>
                <Link to={`/real-estate/${id}`}>
                    <div className="img-area RealEstateCard__img-area">
                        <img src={imgUrl} alt="" className="img-area__RealEstateCard-img" />
                    </div>
                    <div className="RealEstateCard__body">
                        <h3 className="RealEstateCard__title">{name}</h3>
                    </div>
                </Link>
            </li>
        );
    }
}

export default RealEstateCard;