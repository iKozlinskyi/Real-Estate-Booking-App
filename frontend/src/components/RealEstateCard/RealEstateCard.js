import React, {Component} from 'react';
import "./RealEstateCard.css"
import {Link} from "react-router-dom";
import {withElementClassName} from "../HOCs/withElementClassName";

class RealEstateCard extends Component {
    render() {
        const {id, name, imgUrl, elementClassName} = this.props;

        return (
            <li className={`RealEstateCard ${elementClassName}`}>
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

export default withElementClassName(RealEstateCard);