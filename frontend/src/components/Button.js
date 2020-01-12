import React, {Component} from 'react';
import "./Button.css"

class Button extends Component {
  render() {
    let {modifier, text} = this.props;
    let modifierClass = modifier && `button--${modifier}`;

    return (
        <button className={`button RealEstate-card__button ${modifierClass}`}>{text}</button>
    );
  }
}

export default Button;