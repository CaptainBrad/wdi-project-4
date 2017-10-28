import React from 'react';

import BackButton from '../utility/BackButton';

function PlacesForm({ history, handleSubmit, handleChange, place, errors }) {
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
        <div className={errors.image ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={place.image}
            onChange={handleChange}
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
        <div>
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default PlacesForm;
