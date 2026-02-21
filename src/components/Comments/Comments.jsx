import "./comments.css"
import React, { useEffect, useState, useContext } from 'react'
import { faStar, faCommentSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns"
import { useBookContext } from "../../context/DataBooksContext";
import { apiUrl } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

function Comments({ isbn13 }) {
  const [comments, setComments] = useState([])
  const { setProductRatingReview } = useBookContext()
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (!user) {
      setComments([]);
      setProductRatingReview({ rating: 0, reviews: 0 });
      return;
    }

    apiUrl.get(`/comment/${isbn13}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      setComments(res.data.comments)

      if (res.data.productRating) {
        setProductRatingReview({ rating: res.data.productRating, reviews: res.data.comments.length })
      } else {
        setProductRatingReview({ rating: 0, reviews: 0 })
      }
    }).catch(err => {
      console.error("Error fetching comments:", err);
      setComments([]);
    })
  }, [isbn13, user])

  return (
    <div className="comments">
      <h2 className="comments__title">Reviews ({comments?.length || 0})</h2>

      {!user ? (
        <div className="comments__login-prompt">
          <FontAwesomeIcon icon={faCommentSlash} className="comments__noreview-icon" />
          <h3>Sign in to see reviews</h3>
          <p>You must be logged in to view and share comments on this book.</p>
        </div>
      ) : comments?.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="comments__container">
            <div className="comments__header">
              <div className="comments__user-box">
                <div className="comments__avatar">
                  {comment.user?.username?.charAt(0).toUpperCase()}
                </div>
                <div className="comments__info">
                  <h3 className="comments__username">{comment.user?.username}</h3>
                  <span className="comments__date">
                    {format(new Date(comment.createdAt), 'MMMM dd, yyyy')}
                  </span>
                </div>
              </div>

              <div className="comments__stars-container">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    className={i < comment.rating ? "comments__star--active" : "comments__star--inactive"}
                    icon={faStar}
                    size="sm"
                  />
                ))}
              </div>
            </div>

            <div className="comments__content">
              <p>{comment.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="comments__noreview">
          <FontAwesomeIcon icon={faCommentSlash} className="comments__noreview-icon" />
          <h3>No reviews yet</h3>
          <p>Be the first to share your thoughts about this book!</p>
        </div>
      )}
    </div>
  )
}

export default Comments