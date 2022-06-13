import React, {useRef, useState} from 'react';
import { Rating } from 'react-simple-star-rating';
import { MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';

export default function AddReview(props) {
    
    const [rating, setRating] = useState(100)
    const reviewRef = useRef()
  
    const handleRating = (rate) => {
      setRating(rate)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {

          let ratingVal=5;
          switch(rating) {
            case 20:
              ratingVal=1;
              break;
            case 40:
              ratingVal=2;
              break;
            case 60:
              ratingVal=3;
              break;
            case 80:
              ratingVal=4;
              break;
            default:
              ratingVal=5;
          }
          
          await axios.post(`https://ds50api.fr/apis/DS50/Interaction`, {
            "mail": props.userEmail,
            "book_id": props.bookId,
            "rating": ratingVal,
            "review_text": reviewRef.current.value
          })
          navigate('/');
        } catch {
          
        }
      }

    return (<div className='mt-4'>
              <h3 className='text-dark fontTitle'>Review this book</h3>
              <p className='text-muted mb-4'>Share your thoughts with other customers</p>
              <form  onSubmit={handleSubmit}>
                <Rating transition showTooltip tooltipDefaultText="5" size="25px" onClick={handleRating} ratingValue={rating} />
                <textarea className="form-control mt-4" placeholder="Leave your feedback here" id="floatingTextarea" ref={reviewRef}></textarea>
                <MDBBtn type='submit' className='mt-4 bg-warning' block>
                  Send
                </MDBBtn>
              </form>
            </div>
    )
}