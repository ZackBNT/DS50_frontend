import React, { useEffect, useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBreadcrumb, MDBBreadcrumbItem, MDBCard } from 'mdb-react-ui-kit';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link, useParams } from "react-router-dom";

export default function Search() {
    const [books, setBooks] = useState([])
    const [pageNumber, setPageNumber] = useState(0)
    const booksPerPage = 24
    const pagesVisited = pageNumber * booksPerPage

    const displayBooks = books
    .slice(pagesVisited, pagesVisited + booksPerPage)
    .map(
        book => 
        <MDBCol key={book.book_id} className='text-center mb-3' md='2'>
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
        )
    
    const pageCount = Math.ceil(books.length / booksPerPage)

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }

    const id = useParams();
    useEffect(() => {
        axios
        .get(`https://ds50api.fr/apis/DS50/Book/First1000/search=${id.searchValue}`)
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
                        {id.searchValue}
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBContainer>
            </nav>

            <MDBCard className='shadow-5 p-5'>
            <h3 className='mb-5 fontTitle text-dark'>Books</h3>
            <MDBRow>
                {displayBooks} 
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
            </MDBCard>
        </MDBContainer>
    </section>
    )
}