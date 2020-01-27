import React, {Component} from 'react';
import "./LoaderAnimation.css"
import {withElementClassName} from "../HOCs/withElementClassName";

class LoaderAnimation extends Component {
  render() {

    const styles = {
      width: this.props.size,
      height: this.props.size,
      borderWidth: this.props.borderWidth
    };

    return (
        <div className="LoaderAnimation" style={styles}></div>
    );
  }
}

export default withElementClassName(LoaderAnimation);