import React from 'react';




function Comment({ handleSubmit, handleChange, place, errors }) {
  return (

    <form onSubmit={handleSubmit} className="col-md-6">
      <div className={errors.comment ? 'form-group has-error' : 'form-group'}>
        <label htmlFor="comment">comment</label>
        <input
          type="text"
          className="form-control"
          id="comment"
          name="comment"
          value={place.comment}
          onChange={handleChange}
        />
        {errors.comment && <small className="has-error">{errors.comment}</small>}
      </div>
      <div>
        <button className="save-button">Save</button>
      </div>
    </form>

  );
}

export default Comment;
