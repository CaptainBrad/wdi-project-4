/* global google */

import React from 'react';
import {withRouter} from 'react-router-dom';
import mapStyles from '../../config/mapStyles';

const mapStyle = {
  height: '250px',
  width: '100%',
  marginBottom: '30px'
};

class GoogleMap extends React.Component {
  state = {

  }
  componentDidMount() {
    console.log(this.props);
    this.map = new google.maps.Map(this.mapCanvas, {
      zoom: 14,
      center: { lat: this.props.latLng.lat, lng: this.props.latLng.lng },
      styles: mapStyles
    });
    this.marker = new google.maps.Marker({
      position: { lat: this.props.latLng.lat, lng: this.props.latLng.lng },
      map: this.map,
      icon: {
        url: 'http://images.clipartpanda.com/heart-clip-art-valentine_heart_29-1969px.png',
        scaledSize: new google.maps.Size(35,35)
      }
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
