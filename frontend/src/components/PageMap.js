import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

class PageMap extends Component {

  render() {

    const {name, position} = this.props;

    return (
        <Map
            google={this.props.google}
            // style={{ width: "100%", margin: "auto" }}
            zoom={14}
            initialCenter={position}
        >
          <Marker
              title={name}
              name={name}
              position={position}
          />
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAZFNUpDKGfnUHlINzlqZaUssmbfk0QA8M"
})(PageMap);