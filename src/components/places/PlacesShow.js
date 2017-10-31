import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import BackButton from '../utility/BackButton';

import CommentForm from './CommentForm';

class PlacesShow extends React.Component {
  state = {
    place: {},
    newComment: '',
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

  handleChange = ({ target: { value } }) => {
    this.setState({ newComment: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    Axios
      .post(`/api/places/${this.props.match.params.id}/comments`, { text: this.state.newComment }, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ place: res.data, newComment: '' }))
      .catch(err => console.log(err.response.data));
  }

  isOwner(comment) {
    return Auth.getPayload() && Auth.getPayload().userId === comment.createdBy.id;
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


          <BackButton history={this.props.history} />
          {authenticated && createdBy && userId === createdBy.id && <div><Link to={`/places/${id}/edit`} className="standard-button">
            <i className="fa fa-pencil" aria-hidden="true"></i>Edit
          </Link>
          {' '}
          <button className="main-button" onClick={this.deletePlace}>
            <i className="fa fa-trash" aria-hidden="true"></i>Delete
          </button></div>}
          {authenticated && <CommentForm
            comment={this.state.newComment}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            errors={this.state.errors}
          />}
          {!this.state.place.comments && <p>Loading comments...</p>}
          <ul>
            {this.state.place.comments && this.state.place.comments.map(comment =>
              <li key={comment.id}>
                <p>{comment.text}</p>
                {authenticated && this.isOwner(comment) && <button onClick={() => this.deleteComment(comment.id)}>X</button>}
                By: {comment.createdBy && <small>{comment.createdBy.username}</small>}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default PlacesShow;
