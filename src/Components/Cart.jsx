import React, { useEffect, useState } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBBadge, MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, MDBCard, MDBRow, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon, MDBCol, MDBInput, MDBRadio } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import axios from 'axios';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Cart() {

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
                        Cart
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBContainer>
            </nav>

            <MDBRow>
            <MDBCard className='shadow-5 p-5'>
                <h3 className='mb-4 fontTitle text-dark'>Cart</h3>
                <MDBTable hover responsive>
                <MDBTableHead>
                    <tr>
                    <th scope='col'>Book</th>
                    <th scope='col'>Unit Price</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Total</th>
                    <th scope='col'>Remove</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                    <th scope='row'>
                        LESSONS IN CHEMISTRY
                    </th>
                    <td>$3.99</td>
                    <td>
                    <MDBInput id='typeNumber' type='number' size='sm' min='1' />
                    </td>
                    <td>$7.98</td>
                    <td className=''>
                    <MDBBtn className='me-1' color='danger' floating><MDBIcon fas icon="trash-alt" /></MDBBtn> 
                    </td>
                    </tr>
                    <tr>
                    <th scope='row'>
                        THE CANDY HOUSE
                    </th>
                    <td>$5.00</td>
                    <td>
                    <MDBInput id='typeNumber' type='number' size='sm' min='1' />
                    </td>
                    <td>$5.00</td>
                    <td>
                    <MDBBtn className='me-1' color='danger' floating><MDBIcon fas icon="trash-alt" /></MDBBtn> 
                    </td>
                    </tr>
                </MDBTableBody>
                </MDBTable>
                <section className='mt-4 m-auto'>
                    <MDBContainer fluid>
                        <MDBRow>
                            <MDBCol md='5' className='mb-4'>
                                <h4 className='text-dark fontTitle mb-4'>Donate <i className="flag flag-ukraine"></i></h4>
                                <p>
                                More than 4 million people have now fled the violence in Ukraine,  the majority of whom are women and children.
                                Your donation will help the Ukrainian army and their wounded, as well as the families and children caught in the developing conflict.
                                </p>
                                <MDBRadio name='inlineRadio' id='inlineRadio1' value='$1.00' label='$1.00' inline />
                                <MDBRadio name='inlineRadio' id='inlineRadio2' value='$5.00' label='$5.00' inline />
                                <MDBRadio name='inlineRadio' id='inlineRadio3' value='$10.00' label='$10.00' inline />
                            </MDBCol>
                            <MDBCol md='4' className='mb-4'>
                                <h4 className='text-dark fontTitle mb-4'>Shipping Options</h4>
                                <MDBRadio name='flexRadio' id='flexRadio1' label='Standard shipping (7-10 Days) - Colissimo - $0.00' defaultChecked />
                                <MDBRadio name='flexRadio' id='flexRadio2' label='Standard shipping (5-7 Days) - Chronopost - $2.99' />
                                <MDBRadio name='flexRadio' id='flexRadio3' label='Priority shipping (2-4 Days) - FedEx - $11.99' />
                                <MDBRadio name='flexRadio' id='flexRadio4' label='Premium shipping (1-2 Days) - DHL - $20.00' />
                            </MDBCol>
                            <MDBCol md='3'>
                                <h4 className='text-dark fontTitle mb-4'>Order Summary</h4>
                                <MDBListGroup className='mb-4'>
                                <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                    Subtotal
                                    <MDBBadge color='light' pill className='text-dark'>$12.98</MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                    Taxes
                                    <MDBBadge color='light' pill className='text-dark'>$0.00</MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                    Shipping
                                    <MDBBadge color='light' pill className='text-dark'>$0.00</MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                    Donation
                                    <MDBBadge color='light' pill className='text-dark'>$5.00</MDBBadge>
                                </MDBListGroupItem>
                                <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
                                    Grand Total
                                    <MDBBadge color='primary' pill>$17.98</MDBBadge>
                                </MDBListGroupItem>
                                </MDBListGroup>
                                <Link to='/books'><MDBBtn className='mb-1' block color='primary' outline><MDBIcon fas icon="shopping-cart" /> Continue Shopping</MDBBtn></Link>
                                <Link to='/checkout'><MDBBtn className='' block color='primary'><MDBIcon fas icon="credit-card" /> Checkout</MDBBtn></Link>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
                <hr className='my-5'/>
            <div className=''>
                <h3 className='text-dark fontTitle mb-4'>You may also be interested in...</h3>
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
                className="mySwiper px-5 m-auto"
                >
                    {books.slice(0,20).map(book => 
                    <SwiperSlide key={book.book_id}>
                        <MDBCol className='text-center'>
                        <Link to={`/books/${book.book_id}`} className='text-dark'>
                        <img
                        src={book.image_url}
                        className='img-thumbnail mb-1'
                        alt={book.description}
                        style={{ minWidth: '9rem' }}
                        />
                        <h6 className='mt-1'>{book.title}</h6>
                        <p className='fontTitle mt-1'><span className='text-decoration-line-through text-primary'>${(parseFloat(book.average_rating)+parseFloat(5)).toFixed(2)}</span> ${book.average_rating.toFixed(2)}</p>
                        </Link>
                        </MDBCol>
                    </SwiperSlide>
                )}
                </Swiper>
            </div>
            </MDBCard>
            </MDBRow>
        </MDBContainer>
        </section>
    )
}