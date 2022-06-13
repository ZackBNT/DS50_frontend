import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import axios from 'axios';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function BestSellers() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        axios
        .get(`https://ds50api.fr/apis/DS50/Book/First1000`)
        .then(res => {
            setBooks(res.data);
        })
    }, [])    

    return (
        <section className='mt-5'>
        <MDBContainer>    
            <div className='d-flex justify-content-between mb-4'>
                <h3 className='text-dark fontTitle'>Our Bestsellers</h3>
                <Link to='/books'>
                <MDBBtn outline className='' color='primary'>
                See all <MDBIcon fas icon="angle-double-right" />
                </MDBBtn> 
                </Link>
            </div>
            <MDBRow>
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
                className="mySwiper px-5 pb-4"
                >
                    {books.slice(0,20).map(book => 
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
        </MDBContainer>
    </section>
    )
}