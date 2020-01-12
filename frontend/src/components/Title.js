import React, {Component} from 'react';
import "./Title.css"

class Title extends Component {
  render() {
    return (
        <h2 className="Title">{this.props.text}</h2>
    );
  }
}

export default Title;