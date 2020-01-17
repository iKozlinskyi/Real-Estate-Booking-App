import React, {Component} from 'react';
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import {GOOGLE_MAP_API_KEY, KYIV_CENTER_COORDS} from "../../utils/constants";
import "./MultiMarkerMap.css"

class MultiMarkerMap extends Component {

  constructor() {
    super();

    this.state = {
      mapCenterCoords: KYIV_CENTER_COORDS
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  handleMarkerClick(markerData) {
    this.setState({mapCenterCoords: markerData.position})
  }

  render() {
    return (
        <div className="MultiMarkerMap">
          <Map
              google={this.props.google}
              zoom={12}
              initialCenter={KYIV_CENTER_COORDS}
              centerAroundCurrentLocation={true}
              center={this.state.mapCenterCoords}
          >
            {this.props.markerData.map(marker => {
              return <Marker
                  key={marker.id}
                  // title={marker.title}
                  name={marker.name}
                  position={marker.position}
                  onClick={this.handleMarkerClick}
              />;
            })}
          </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY
})(MultiMarkerMap);