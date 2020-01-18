import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from "google-maps-react";
import {GOOGLE_MAP_API_KEY, KYIV_CENTER_COORDS} from "../../utils/constants";
import "./MultiMarkerMap.css"

class MultiMarkerMap extends Component {

  constructor() {
    super();

    this.state = {
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false
    };

    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMarkerHovered = this.onMarkerHovered.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
  }

  onMarkerHovered(props, marker) {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });
  }


  onInfoWindowClose() {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });
  }


  onMapClicked() {
    if (this.state.showingInfoWindow)

      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  render() {
    return (
        <div className="MultiMarkerMap">
          <Map
              google={this.props.google}
              zoom={12}
              initialCenter={KYIV_CENTER_COORDS}
              centerAroundCurrentLocation={true}
              onClick={this.onMapClicked}
          >
            {this.props.markerData.map(marker => {
              return <Marker
                  key={marker.id}
                  id={marker.id}
                  name={marker.name}
                  position={marker.position}
                  onMouseover={this.onMarkerHovered}
              />


            })}
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onInfoWindowClose}
            >
              <div>
                  <h3>
                    {this.state.selectedPlace.name}
                  </h3>
              </div>
            </InfoWindow>
          </Map>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_API_KEY
})(MultiMarkerMap);