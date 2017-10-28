import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import PlacesForm from './PlacesForm';

class PlacesNew extends React.Component {
  state = {
    place: {
      name: '',
      subtitle: '',
      image: ''
    },
    errors: {}
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

    Axios
      .post('/api/places', this.state.place, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <PlacesForm
        history={this.props.history}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        place={this.state.place}
        errors={this.state.errors}
      />
    );
  }
}

export default PlacesNew;
