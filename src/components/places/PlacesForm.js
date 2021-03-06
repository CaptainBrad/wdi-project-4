import React from 'react';

import BackButton from '../utility/BackButton';
import DragDrop from '../utility/DragDrop';
import PlacesAutocomplete from 'react-places-autocomplete';

function PlacesForm({ history, handleSubmit, handleChange, place, errors, handleAddress, address }) {
  const inputProps = {
    value: address,
    onChange: handleAddress
  };

  const cssClasses = {
    root: 'form-group',
    input: 'form-control',
    autocompleteContainer: 'my-autocomplete-container'
  };
  return (
    <div className="row">
      <div className="page-banner col-md-12">
        <BackButton history={history} />
      </div>
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className={errors.name ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="name">name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={place.name}
            onChange={handleChange}
          />
          {errors.name && <small className="has-error">{errors.name}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <DragDrop
            onChange={handleChange}
            value={place.base64 || place.imageSRC}
          />

          {errors.image && <small className="has-error">{errors.image}</small>}
        </div>
        <div className={errors.subtitle ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="subtitle">subtitle</label>
          <input
            type="text"
            className="form-control"
            id="subtitle"
            name="subtitle"
            value={place.subtitle}
            onChange={handleChange}
          />
          {errors.subtitle && <small className="has-error">{errors.subtitle}</small>}
        </div>

        <div className={errors.budget ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="budget">budget(£)</label>
          <input
            type="Number"
            className="form-control"
            id="budget"
            name="budget"
            value={place.budget}
            onChange={handleChange}
          />
          {errors.budget && <small className="has-error">{errors.budget}</small>}
        </div>

        <div className={errors.review ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="review">review</label>
          <textarea
            type="text"
            className="form-control"
            id="review"
            name="review"
            value={place.review}
            onChange={handleChange}
          />
          {errors.review && <small className="has-error">{errors.review}</small>}
        </div>

        <div className={errors.location ? 'has-error' : ''}>
          <label htmlFor="address">Address</label>
          <PlacesAutocomplete className="form-control" value={place.address} inputProps={inputProps} classNames={cssClasses}/>
        </div>
        <div>
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default PlacesForm;
