import React from 'react';

function CommentForm({ comment, handleSubmit, handleChange, errors }) {
  return (
    <form onSubmit={handleSubmit} className="col-md-6">
      <div className={errors.comment ? 'form-group has-error' : 'form-group'}>
        <label htmlFor="text">comment</label>
        <input
          type="text"
          className="form-control"
          id="text"
          name="text"
          value={comment.text}
          onChange={handleChange}
        />
        {errors.comment && <small className="has-error">{errors.comment}</small>}
        <label>Post Rating: </label>
        <label>
          1<input type="radio" onChange={handleChange} value={1} name="rating" />
        </label>
        <label>
          2<input type="radio" onChange={handleChange} value={2} name="rating" />
        </label>
        <label>
          3<input type="radio" onChange={handleChange} value={3} name="rating" />
        </label>
        <label>
          4<input type="radio" onChange={handleChange} value={4} name="rating" />
        </label>
        <label>
          5<input type="radio" onChange={handleChange} value={5} name="rating" />
        </label>
      </div>
      <div>
        <button className="save-button">add comment</button>
      </div>
    </form>
  );
}

export default CommentForm;
