import React from 'react';
import Axios from 'axios';

class NotFound extends React.Component {
  constructor() {
    super();
    this.state = {
      gif: null
    };
  }

  componentDidMount() {
    Axios.get('http://api.giphy.com/v1/gifs/search', {
      params: {
        q: this.props.location.pathname.split('').slice(1).join(''),
        api_key: '018f78342dcf456dbb4a33d168bb3448',
        limit: 1,
        offset: 0
      }
    })
      .then(res => this.setState({gif: res.data.data[0]}))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h3>404: page not found:</h3>
        {this.state.gif && <img src={this.state.gif.images.original.url} />}
      </div>
    );
  }
}

export default NotFound;
