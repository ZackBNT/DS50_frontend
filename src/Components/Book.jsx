import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBBtn, MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBRow, MDBCol, MDBIcon, MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import axios from 'axios';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import AddReview from './AddReview';
import { useAuth } from '../Contexts/AuthContext';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Book() {
    
    const { currentUser } = useAuth()

    const [book, setBook] = useState([])
    const [books, setBooks] = useState([])
    const [reviews, setReviews] = useState([])
    const [stats, setStats] = useState([])
    const id = useParams();

    const [pageNumber, setPageNumber] = useState(0)
    const reviewsPerPage = 5
    const pagesVisited = pageNumber * reviewsPerPage

    const displayReviews = reviews
    .slice(pagesVisited, pagesVisited + reviewsPerPage)
    .map(
        review => 
        <MDBCol key={review.user_id} md='12'>
            <div className='text-dark mb-4'>
                <h6 className='mt-1'><MDBIcon far icon="user-circle" size='lg'/> {review.USERNAME}</h6>
                <h6><MDBIcon fas icon="star" className='text-warning'/> {review.rating}</h6>
                <p className='text-muted'>{review.review_text}</p>
            </div>
        </MDBCol>                         
        )
    
    const pageCount = Math.ceil(reviews.length / reviewsPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    useEffect(() => {
        let endpoints = [
            `https://ds50api.fr/apis/DS50/Book/book_id=${id.bookId}`,
            `https://ds50api.fr/apis/DS50/Filtering/content/${id.bookId}`,
            `https://ds50api.fr/apis/DS50/Interaction/First100/book_id=${id.bookId}`,
            `https://ds50api.fr/apis/DS50/Book/Stats/book_id=${id.bookId}`
          ];
          Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([ {data: book}, {data: books}, {data: reviews}, {data: stats}] )=> {
            setBook(book)
            setBooks(books)
            setReviews(reviews)
            setStats(stats)
          })
    }, [id])

    const renderAddReview = () => {
        if(currentUser){
            return <>
                    <AddReview userEmail={currentUser.multiFactor.user.email} bookId={id.bookId} />
                    </>
           
        } else{
            return <></>
        }
      }
    
    return (
        <MDBContainer className='mt-5'>    
            <nav className='navbar navbar-expand-lg navbar-white  bg-white mb-5'>
            <MDBContainer fluid>
                <MDBBreadcrumb>
                    <MDBBreadcrumbItem>
                        <Link to="/" className='text-dark'>
                            Home
                        </Link>
                    </MDBBreadcrumbItem>
                    <MDBBreadcrumbItem>
                        <Link to="/books" className='text-dark'>
                            Books
                        </Link>
                    </MDBBreadcrumbItem>
                    <MDBBreadcrumbItem className='text-primary'>
                        {book.title}
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBContainer>
            </nav>

            <MDBCard className='shadow-5 p-5'>
            <MDBRow className='m-auto'>
                <MDBCol className='text-center mb-3' md='12'>
                <img src={book.image_url} alt={book.description} style={{minWidth: '9rem'}} />
                </MDBCol>
                <MDBCol className='text-center offset-md-3' md='6'>
                    <h4>{book.title}</h4>                
                    <small className='text-muted fontTitle'>by {book.author_name}</small>
                    <h5 className='fontTitle mt-3'>
                        <span className='text-decoration-line-through text-primary me-1'>${(parseFloat(book.average_rating)+parseFloat(5)).toFixed(2)}</span>
                        ${book.average_rating}
                    </h5>
                    <div className="mt-3 mb-4">
                        <MDBIcon fas icon="star" className='text-warning'/> {stats.avg_rating}/5
                    </div>
                    <Link to='/cart'><MDBBtn className='mb-1' block color='primary' outline><MDBIcon fas icon="cart-plus" /> Add to cart</MDBBtn></Link>
                    <Link to='/checkout'><MDBBtn className='' block color='primary'><MDBIcon fas icon="credit-card" /> Buy now</MDBBtn></Link>
                </MDBCol>
            </MDBRow>
            <hr className='my-4'/>
            <MDBRow>
                <h4 className='text-dark fontTitle'>Description</h4>
                <p>
                {book.description}
                </p>
                <h4 className='text-dark fontTitle'>Product Details</h4>
                <ul className='ms-3 m-auto'>
                    <li><strong>Format : </strong>{book.format}</li>
                    <li><strong>Number of pages : </strong>{book.num_pages}</li>
                    <li><strong>Publication year : </strong>{book.publication_year}</li>
                    <li><strong>Publisher : </strong>{book.publisher}</li>
                </ul>
            </MDBRow>
            <hr className='my-4'/>
            <MDBRow>
                <h3 className='text-dark fontTitle'>You may also be interested in...</h3>
                <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop
                pagination={{dynamicBullets: true}}
                navigation
                autoplay= {{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
                }}
                className="mySwiper px-5 pb-4 mt-4"
                >
                    {books.map(book => 
                    <SwiperSlide key={book.book_id}>
                        <MDBCol className='text-center'>
                        <Link to={`/books/${book.book_id}`} className='text-dark'>
                        <img
                        src={book.image_url}
                        className='img-thumbnail mb-1'
                        alt='...'
                        style={{ minWidth: '9rem' }}
                        />
                        <h6 className='mt-1'>{book.title}</h6>
                        <p className='fontTitle mt-1'><span className='text-decoration-line-through text-primary'>${(parseFloat(book.average_rating)+parseFloat(5)).toFixed(2)}</span> ${book.average_rating.toFixed(2)}</p>
                        </Link>
                        </MDBCol>
                    </SwiperSlide>
                )}
                </Swiper>
            </MDBRow>
            <hr className='my-4'/>
            <MDBRow>
                <h3 className='text-dark fontTitle mb-4'>Customer Reviews</h3>
                <MDBCol className='mb-4' md='3'>
                    <h5><MDBIcon fas icon="star" className='text-warning'/> {stats.avg_rating} out of 5</h5>
                    <h6><span className='text-primary'>{stats.total_rates}</span> global ratings</h6>
                    <MDBRow className='mt-3 mb-2'>
                    <MDBCol md='3'>
                        5 stars
                    </MDBCol>
                    <MDBCol>
                    <MDBProgress height='20'>
                    <MDBProgressBar className='bg-warning' width={stats.percentage_5} valuemin={0} valuemax={100}>
                    </MDBProgressBar>
                    </MDBProgress>
                    </MDBCol>
                    <MDBCol md='3'>
                        {stats.percentage_5}%
                    </MDBCol>
                    </MDBRow>
                    <MDBRow className='mb-2'>
                    <MDBCol md='3'>
                        4 stars
                    </MDBCol>
                    <MDBCol>
                    <MDBProgress height='20'>
                    <MDBProgressBar className='bg-warning' width={stats.percentage_4} valuemin={0} valuemax={100}>
                    </MDBProgressBar>
                    </MDBProgress>
                    </MDBCol>
                    <MDBCol md='3'>
                        {stats.percentage_4}%
                    </MDBCol>
                    </MDBRow>
                    <MDBRow  className='mb-2'>
                    <MDBCol md='3'>
                        3 stars
                    </MDBCol>
                    <MDBCol>
                    <MDBProgress height='20'>
                    <MDBProgressBar className='bg-warning' width={stats.percentage_3} valuemin={0} valuemax={100}>
                    </MDBProgressBar>
                    </MDBProgress>
                    </MDBCol>
                    <MDBCol md='3'>
                        {stats.percentage_3}%
                    </MDBCol>
                    </MDBRow>
                    <MDBRow  className='mb-2'>
                    <MDBCol md='3'>
                        2 stars
                    </MDBCol>
                    <MDBCol>
                    <MDBProgress height='20'>
                    <MDBProgressBar className='bg-warning' width={stats.percentage_2} valuemin={0} valuemax={100}>
                    </MDBProgressBar>
                    </MDBProgress>
                    </MDBCol>
                    <MDBCol md='3'>
                        {stats.percentage_2}%
                    </MDBCol>
                    </MDBRow>
                    <MDBRow  className='mb-2'>
                    <MDBCol md='3'>
                        1 star
                    </MDBCol>
                    <MDBCol>
                    <MDBProgress height='20'>
                    <MDBProgressBar className='bg-warning' width={stats.percentage_1} valuemin={0} valuemax={100}>
                    </MDBProgressBar>
                    </MDBProgress>
                    </MDBCol>
                    <MDBCol md='3'>
                        {stats.percentage_1}%
                    </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    </MDBRow>
                </MDBCol>
                <MDBCol>
                    <MDBRow>
                        {displayReviews} 
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            containerClassName={"pagination pagination-circle justify-content-center mt-3"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            disabledClassName={"disabled"}
                            activeClassName={"active"}
                        />
                    </MDBRow>
                </MDBCol>
                <MDBCol xs='12'>
                    {renderAddReview()}
                </MDBCol>
            </MDBRow>
            </MDBCard>
        </MDBContainer>
    )
}