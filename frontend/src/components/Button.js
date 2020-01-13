import React, {Component} from 'react';
import "./Button.css"

class Button extends Component {
  render() {

    let elementClass = this.props.hasOwnProperty("elementClass") ? this.props.elementClass : "";

    let {modifier, text} = this.props;
    let modifierClass = modifier && `button--${modifier}`;

    return (
        <button className={`button RealEstate-card__button ${modifierClass} ${elementClass}`}>{text}</button>
    );
  }
}

export default Button;