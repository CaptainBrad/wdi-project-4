import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import BackButton from '../utility/BackButton';

// import Comment from './Comments';

class PlacesShow extends React.Component {
  state = {
    place: {},
    comment: {}
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

    addComment = () => {
      Axios
        .post(`/places/${this.props.match.params.id}/comments/`, this.state.comment, {
          headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
        })
        .then((res) => this.setState({
          place: res.data
        }))
        .catch(err => console.log(err));
    }

    handleChange = ({ target: { name, value } }) => {
      const comment = Object.assign({}, this.state.comment, { [name]: value });
      this.setState({ comment });
    }

    handleSubmit = (e) => {
      e.preventDefault();
    }

    render() {
      const authenticated = Auth.isAuthenticated();
      const userId = Auth.getPayload() ? Auth.getPayload().userId : null;
      const { imageSRC, createdBy, name, subtitle, id } = this.state.place;
      return (
        <div className="row">
          <div className="image-tile col-md-6">
            <img src={imageSRC} className="img-responsive" />
          </div>
          <div className="col-md-6">
            <h3>{name}</h3>
            <h4>{subtitle}</h4>

            <div>
              <button className="save-button">Save</button>
            </div>
            <BackButton history={this.props.history} />
            {authenticated && createdBy && userId === createdBy.id && <Link to={`/places/${id}/edit`} className="standard-button">
              <i className="fa fa-pencil" aria-hidden="true"></i>Edit
            </Link>}
            {' '}
            {authenticated && createdBy && userId === createdBy.id && <button className="main-button" onClick={this.deletePlace}>
              <i className="fa fa-trash" aria-hidden="true"></i>Delete
            </button>}
            {/* <Comment
              comment={this.props.comment}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              place={this.state.place}
              errors={this.state.errors}
            /> */}
          </div>
        </div>
      );
    }
}

export default PlacesShow;
