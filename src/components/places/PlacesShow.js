import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import BackButton from '../utility/BackButton';

class PlacesShow extends React.Component {
  state = {
    place: {}
  }

  componentWillMount() {
    Axios
      .get(`/api/places/${this.props.match.params.id}`)
      .then(res => this.setState({ place: res.data }))
      .catch(err => {
        if(err.response.status === 404) this.props.history.replace('/404');
        console.log(err);
      });
  }

  deletePlace = () => {
    Axios
      .delete(`/api/places/${this.props.match.params.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  render() {
    const authenticated = Auth.isAuthenticated();
    const userId = Auth.getPayload() ? Auth.getPayload().userId : null;
    const { image, createdBy, name, subtitle, id } = this.state.place;
    return (
      <div className="row">
        <div className="image-tile col-md-6">
          <img src={image} className="img-responsive" />
        </div>
        <div className="col-md-6">
          <h3>{name}</h3>
          <h4>{subtitle}</h4>
          <BackButton history={this.props.history} />
          {authenticated && createdBy && userId === createdBy.id && <Link to={`/places/${id}/edit`} className="standard-button">
            <i className="fa fa-pencil" aria-hidden="true"></i>Edit
          </Link>}
          {' '}
          {authenticated && createdBy && userId === createdBy.id && <button className="main-button" onClick={this.deletePlace}>
            <i className="fa fa-trash" aria-hidden="true"></i>Delete
          </button>}
        </div>
      </div>
    );
  }
}

export default PlacesShow;
