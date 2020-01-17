import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import {GOOGLE_MAP_API_KEY} from "../utils/constants";

class PageMap extends Component {

  render() {

    const {name, position} = this.props;

    return (
        <Map
            google={this.props.google}
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
  apiKey: GOOGLE_MAP_API_KEY
})(PageMap);