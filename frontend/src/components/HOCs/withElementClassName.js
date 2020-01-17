import React, {Component} from "react";

export const withElementClassName = WrappedComponent => {
  return class extends Component {

    render() {
      const elementClassName = this.props.elementClassName || "";
      return (
          <WrappedComponent {...this.props} elementClassName={elementClassName} />
      )
    }
  }
};