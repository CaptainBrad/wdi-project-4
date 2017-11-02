/** global _ **/

import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import SearchBar from './SearchBar';
import Rating from '../../lib/Rating';
import _ from 'lodash';

class PlacesIndex extends React.Component {
  state = {
    places: [],
    query: ''

  }

  handleOrigin = (e) => {
    const filter = e.target.value;

    this.setState({ filter });
  }

  handleSearch = (e) => {
    this.setState({query: e.target.value});
  }

  componentWillMount() {
    Axios
      .get('/api/places')
      .then(res => this.setState({ places: res.data }))
      .catch(err => console.log(err));
  }

  componentDidMount(){
    Axios.get('/api/places')
      .then(res => this.setState({ places: res.data},()=>console.log(res.data, '8======SearchBar======D')))
      .catch(err => console.log(err));
  }




  render() {
    const { query } = this.state;
    const regex = new RegExp(query, 'i');
    const orderedPlaces = _.orderBy(this.state.places);
    const places = _.filter(orderedPlaces, (place) => regex.test(place.name));
    return (
      <div>
        <div className="row">
          <div className="page-banner col-md-12">
            {Auth.isAuthenticated() && <Link to="/places/new" className="main-button">
              <i className="fa fa-plus" aria-hidden="true"></i>Add Place
            </Link>}
            <SearchBar handleSort={this.handleSort}
              handleSearch={this.handleSearch} />
          </div>
          {places.map(place => {
            return(
              <div key={place.id} className="image-tile col-md-4 col-sm-6 col-xs-12">
                <Link to={`/places/${place.id}`}>
                  <h1>{place.name}</h1>
                  {place.avgRating && <p> Average Rating: {Rating.getStarIcons(place.avgRating)} </p> }
                  {!place.avgRating && <p> Average Rating: 🦄</p>}
                  <div className="index-image" style={{backgroundImage: `url(${place.imageSRC})`}}></div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PlacesIndex;
