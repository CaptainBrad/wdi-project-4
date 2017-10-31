/* global google */

import React from 'react';
import {withRouter} from 'react-router-dom';

const mapStyle = {
  border: '2px solid black',
  height: '200px',
  width: '200px'
};

class GoogleMap extends React.Component {
  state = {

  }
  componentDidMount() {
    console.log(this.props);
    this.map = new google.maps.Map(this.mapCanvas, {
      zoom: 14,
      center: { lat: this.props.latLng.lat, lng: this.props.latLng.lng }
    });
    this.marker = new google.maps.Marker({
      position: { lat: this.props.latLng.lat, lng: this.props.latLng.lng },
      map: this.map
    });
  }
  componentWillUnmount() {
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }
  render() {
    return(
      <div ref={element => this.mapCanvas = element} style={mapStyle}>
        Google map goes here
      </div>
    );
  }
}

export default withRouter(GoogleMap);
