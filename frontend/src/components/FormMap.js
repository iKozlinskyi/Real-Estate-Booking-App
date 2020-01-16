import React, {Component} from 'react';
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import "./Map.css"

const KYIV_CENTER_COORDS = {lat: 50.450141, lng: 30.523871};

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
        <div className="FormMap Map">
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
  apiKey: "AIzaSyAZFNUpDKGfnUHlINzlqZaUssmbfk0QA8M"
})(FormMap);