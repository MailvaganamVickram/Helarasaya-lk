import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useGetReviewsByUserIdQuery } from '../../../redux/features/reviews/reviewsApi';

const UserReviews = () => {
    const {user} = useSelector((state) => state.auth);
    //const {data: reviews, error, isLoading} = useGetReviewsByUserIdQuery(user?._id);
    const {data: reviews , error, isLoading} = useGetReviewsByUserIdQuery(user?._id);
    
    const navigate = useNavigate()
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Failed to load reviews!</div>

    const handleCardClick = () => {
        navigate('/shop')
    }
  return (
    <div className='reviews-container'>
    <h2>Your Given Reviews</h2>
    <div className='reviews-grid'>
        {
            reviews && reviews.map((review, index) => (
                <div key={index} className='review-card'>
                    <p className='rating'>Rating: {review?.rating}</p>
                    <p className='comment'><strong>Comment:</strong> {review?.comment}</p>
                    <p className='product-id'><strong>ProductId:</strong> {review?.productId}</p>
                    <p className='date'><strong>Date:</strong> {new Date(review?.createdAt).toLocaleDateString()}</p>
                </div>
            ))
        }
        <div 
            onClick={handleCardClick}
            className='add-review-card'>
            <span>+</span>
            <p>Add New Review</p>
        </div>
    </div>
</div>

  )
}

export default UserReviews
