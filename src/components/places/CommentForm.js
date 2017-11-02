import React from 'react';

function CommentForm({ comment, handleSubmit, handleChange, errors }) {
  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className={errors.comment ? 'form-group has-error' : 'form-group'}>
        <h3 htmlFor="text">Comment</h3>
        <textarea
          type="text"
          className="form-control"
          id="text"
          name="text"
          value={comment.text}
          onChange={handleChange}
        ></textarea>
        {errors.comment && <small className="has-error">{errors.comment}</small>}
        <label>Post Rating:</label>
        <div className={'comment-rating money' + comment.rating}>
          <label className={comment.rating >= 1 ? 'selected' : ''}>
            💰<input type="radio" onChange={handleChange} value={1} name="rating" />
          </label>
          <label className={comment.rating >= 2 ? 'selected' : ''}>
            💰<input type="radio" onChange={handleChange} value={2} name="rating" />
          </label>
          <label className={comment.rating >= 3 ? 'selected' : ''}>
            💰<input type="radio" onChange={handleChange} value={3} name="rating" />
          </label>
          <label className={comment.rating >= 4 ? 'selected' : ''}>
            💰<input type="radio" onChange={handleChange} value={4} name="rating" />
          </label>
          <label className={comment.rating >= 5 ? 'selected' : ''}>
            💰<input type="radio" onChange={handleChange} value={5} name="rating" />
          </label>
        </div>
      </div>
      <div>
        <button className="main-button">Add comment</button>
      </div>
    </form>
  );
}

export default CommentForm;
