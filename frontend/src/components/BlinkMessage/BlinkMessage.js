import React, {Component} from 'react';
import {withElementClassName} from "../HOCs/withElementClassName";
import "./BlinkMessage.css"

class BlinkMessage extends Component {
  render() {
    const {elementClassName, children, type} = this.props;
    return (
        <div className={`BlinkMessage ${elementClassName} BlinkMessage--${type}`}>
          {children}
        </div>
    );
  }
}

export default withElementClassName(BlinkMessage);