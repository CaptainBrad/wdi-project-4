import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import PlacesForm from './PlacesForm';

class PlacesNew extends React.Component {
  state = {
    place: {
      name: '',
      subtitle: '',
      base64: null,
      imageSRC: '',
      createdBy: Auth.getPayload().userId,
      latLng: {}
    },
    address: '',
    errors: {
      name: '',
      subtitle: '',
      imageSRC: '',
      createdBy: ''
    },
    lat: 0,
    lng: 0
  };

  componentWillMount() {
    console.log('Component will mount');
  }

  componentDidMount() {
    console.log('Component did mount');
  }

  handleChange = ({ target: { name, value } }) => {
    const place = Object.assign({}, this.state.place, { [name]: value });
    this.setState({ place });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // use the 3rd party geocodeByAddress method to take the string and retrieve the latLng
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        // take the latLng and add it to this.state.place
        const place = Object.assign({}, this.state.place, { latLng });
        // once state has been set, call the savePlace method
        this.setState({ place }, this.savePlace);
      });
  }

  savePlace = () => {
    Axios
      .post('/api/places', this.state.place, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/places'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  // handleAddress will run each time the user types in the autocomplete
  // it will update this.state.address with the result from the autocomplete
  handleAddress = (address) => this.setState({ address })

  render() {
    return (
      <PlacesForm
        ref={ element => this.placeForm = element }
        autocomplete={this.autocomplete}
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        handleAddress={this.handleAddress}
        address={this.state.address}
        place={this.state.place}
        errors={this.state.errors}
      />
    );
  }
}

export default PlacesNew;
