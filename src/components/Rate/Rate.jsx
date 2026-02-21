import "./rate.css"
import React, { useState } from 'react'
import { faStar, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../services/api";

const notify = () => toast.success('Review submitted successfully!', {
  style: { borderRadius: '10px', background: '#333', color: '#fff' }
});

const submitError = () => toast.error('Please provide both a rating and a comment');

function Rate({ isbn13 }) {
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)
  const [comment, setComment] = useState('')
  const { user } = useContext(AuthContext)
  const [isSending, setIsSending] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login')
      return
    }

    if (comment.trim() === '' || rating === null) {
      submitError()
      return
    }

    setIsSending(true)
    const commentObj = {
      bookisbn: isbn13,
      rating: rating,
      comment: comment.trim(),
      userId: user._id,
    }

    apiUrl.post("/comment/", commentObj, {
      withCredentials: true,
      Headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      if (res.data) {
        setIsSending(false)
        notify()
        setRating(null)
        setHover(null)
        setComment('')
        // Force a small refresh of the comments would be ideal here
        // but for now we reset the local state
      }
    }).catch(err => {
      console.error(err)
      toast.error('Failed to submit review')
      setIsSending(false)
    })
  }

  return (
    <div className="rate">
      <Toaster position="bottom-right" reverseOrder={false} />

      <div className="rating">
        <header>
          <h3 className="rating__title">Write a Review</h3>
          <p className="rating__label">Share your experience with other readers</p>
        </header>

        <div className="rating__stars-section">
          <span className="rating__label">Your Rating:</span>
          <div className="rating__container">
            {[...Array(5)].map((_, i) => {
              const currentRating = i + 1
              return (
                <label key={i}>
                  <input
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                  />
                  <FontAwesomeIcon
                    className={`star ${currentRating <= (hover || rating) ? 'star--active' : 'star--inactive'}`}
                    icon={faStar}
                    size="2x"
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              )
            })}
            {rating && <span className="rating__value-text">{rating} / 5 stars</span>}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="comment__container">
          <label className="comment__label" htmlFor="review-comment">Your Thoughts:</label>
          <textarea
            id="review-comment"
            className="comment__textarea"
            name="comment"
            placeholder="What did you think about the characters, the plot, or the writing style?"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>

          <button disabled={isSending} className="comment__button">
            <FontAwesomeIcon icon={faPaperPlane} />
            {user ? (isSending ? 'SENDING...' : 'SUBMIT REVIEW') : 'LOGIN TO REVIEW'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Rate