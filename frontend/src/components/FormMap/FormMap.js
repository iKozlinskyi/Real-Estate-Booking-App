import React, {Component} from 'react';
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import "./FormMap.css"
import {GOOGLE_MAP_API_KEY, KYIV_CENTER_COORDS} from "../../utils/constants";

class FormMap extends Component {

  constructor() {
    super();

    this.onMapClicked = this.onMapClicked.bind(this);
  }

  onMapClicked(mapProps, map, clickEvent) {
    const {latLng} = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const coords = {lat, lng};

    this.props.handleClick(coords);
  }

  render() {

    const {name, markerCoords} = this.props;
    const initialCenterCoords = (markerCoords.lat && markerCoords.lng) ?
        markerCoords :
        KYIV_CENTER_COORDS;

    return (
        <div className="FormMap">
          <Map
              google={this.props.google}
              zoom={12}
              initialCenter={initialCenterCoords}
              onClick={this.onMapClicked}
          >
            {markerCoords &&
            <Marker
                title="Your marker"
                name="Your marker"
                position={markerCoords}
            />}
          </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY
})(FormMap);