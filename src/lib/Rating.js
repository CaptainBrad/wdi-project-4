import React from 'react';

class Rating {
  static getStarIcons(rating) {
    console.log(rating);
    const elements = [];

    for(let i = 0; i < Math.floor(rating); i++) {
      console.log('8======================D');
      elements.push(<span key={i} className="star">💰</span>);
    }
    if(rating % 1 > 0) elements.push(<span key="A" className="star half">💰</span>);
    console.log('EL', elements);
    return elements;
  }

}

export default Rating;
