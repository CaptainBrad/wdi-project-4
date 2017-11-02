import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Rating from '../../lib/Rating';

import BackButton from '../utility/BackButton';

import CommentForm from './CommentForm';
import GoogleMap from '../utility/GoogleMap';

class PlacesShow extends React.Component {
  state = {
    place: {},
    // newComment: '',
    // =====
    newComment: {
      text: '',
      rating: 1
    },
    // ======
    errors: {text: ''}
  }

  getInfo = () => {
    Axios
      .get(`/api/places/${this.props.match.params.id}`)
      .then(res => this.setState({ place: res.data }))
      .catch(err => {
        if(err.response.status === 404) this.props.history.replace('/404');
        console.log(err);
      });
  }
  componentWillMount() {
    this.getInfo();
  }

  deletePlace = () => {
    Axios
      .delete(`/api/places/${this.props.match.params.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  deleteComment = (commentId) => {
    console.log('yes');
    Axios
      .delete(`/api/places/${this.props.match.params.id}/comments/${commentId}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => {
        console.log(res);
        this.getInfo();
      })
      .catch(err => console.log(err));
  }

  // handleChange = ({ target: { value } }) => {
  //   this.setState({ newComment: value });
  // }
  // ===========
  handleChange = ({ target: { name, value } }) => {
    const newComment = Object.assign({}, this.state.newComment, { [name]: value });
    this.setState({ newComment }, () => console.log(this.state.newComment));
  }
  // ===========

  handleSubmit = e => {
    e.preventDefault();
    Axios
      .post(`/api/places/${this.props.match.params.id}/comments`, this.state.newComment, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ place: res.data, newComment: { text: '', rating: 0 } }))
      .catch(err => console.log(err.response.data));
  }

  isOwner(comment) {
    return Auth.getPayload() && Auth.getPayload().userId === comment.createdBy.id;
  }

  render() {
    console.log(this.state.place.avgRating);
    const authenticated = Auth.isAuthenticated();
    const userId = Auth.getPayload() ? Auth.getPayload().userId : null;
    const { latLng, imageSRC, createdBy, name, subtitle, budget, addAdress, review, id } = this.state.place;
    return (
      <div className="places-show">
        <div className="row">
          <div className="image-tile col-md-6">
            <img src={imageSRC} className="img-responsive" />
          </div>
          <div className="col-md-6">
            <h3>{name}</h3>
            <h4>Created By: {createdBy && createdBy.username}</h4>
            <h4>{subtitle}</h4>
            <h4>{addAdress}</h4>
            <h4>£{budget}</h4>
            <p>{review}</p>
            {this.state.place.avgRating && <p> Average Rating: {Rating.getStarIcons(this.state.place.avgRating)} </p> }

            {/* {this.state.place.getStarIcons()} */}


            <BackButton history={this.props.history} />
            {authenticated && createdBy && userId === createdBy.id && <div><Link to={`/places/${id}/edit`} className="standard-button">
              <i className="fa fa-pencil" aria-hidden="true"></i>Edit
            </Link>
            {' '}
            <button className="main-button" onClick={this.deletePlace}>
              <i className="fa fa-trash" aria-hidden="true"></i>Delete
            </button></div>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            { this.state.place.latLng && <GoogleMap latLng={latLng}/> }
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {authenticated && <CommentForm
              comment={this.state.newComment}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              errors={this.state.errors}
            />}
          </div>
          <div className="col-md-6">
            <div className="comments">
              {!this.state.place.comments && <p>Loading comments...</p>}
              <ul>
                {this.state.place.comments && this.state.place.comments.map(comment =>
                  <li key={comment.id}>
                    <div>
                      {comment.createdBy && <p><strong>{comment.createdBy.username}:</strong></p>}
                      <p>{comment.text}</p>
                      <p>{Rating.getStarIcons(comment.rating)}</p>
                    </div>
                    {authenticated && this.isOwner(comment) && <button className="main-button" onClick={() => this.deleteComment(comment.id)}>X</button>}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default PlacesShow;
