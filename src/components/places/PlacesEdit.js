import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import PlacesForm from './PlacesForm';

class PlacesEdit extends React.Component {
  state = {
    place: {
      name: '',
      subtitle: '',
      image: '',
      location: {}
    },
    errors: {}
  };

  componentDidMount() {
    Axios
      .get(`/api/places/${this.props.match.params.id}`)
      .then(res => this.setState({ place: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    const place = Object.assign({}, this.state.place, { [name]: value });
    this.setState({ place });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const user = Object.assign({}, this.state.user, { location: latLng });
        this.setState({ user }, this.updatePlace);
      });
  }
  updatePlace = () => {



    Axios
      .put(`/api/places/${this.props.match.params.id}`, this.state.place, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.props.history.push(`/places/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <PlacesForm
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

export default PlacesEdit;
