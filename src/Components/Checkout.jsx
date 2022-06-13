import React from 'react';
import { MDBRow, MDBCol, MDBInput, MDBBtn,MDBContainer, MDBBreadcrumb, MDBBreadcrumbItem, MDBCard } from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext"

export default function Checkout() {
  const { currentUser } = useAuth()

  const renderEmail = () => {
  if(currentUser){
    return currentUser.email
  }
  else{
    return ""
  }
  }

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
                    <MDBBreadcrumbItem>
                        <Link to="/cart" className='text-dark'>
                            Cart
                        </Link>
                    </MDBBreadcrumbItem>
                    <MDBBreadcrumbItem className='text-primary'>
                        Checkout
                    </MDBBreadcrumbItem>
                </MDBBreadcrumb>
            </MDBContainer>
            </nav>

            <MDBRow>
            <MDBCard className='shadow-5 p-5'>
                <h3 className='mb-4 fontTitle text-dark'>Checkout</h3>
                <form>
                  <MDBRow className='mb-4'>
                    <MDBCol>
                      <MDBInput id='form6Example1' label='First name' />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput id='form6Example2' label='Last name' />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput wrapperClass='mb-4' id='form6Example3' label='Company name' />
                  <MDBInput wrapperClass='mb-4' id='form6Example4' label='Address' />
                  <MDBInput wrapperClass='mb-4' type='email' id='form6Example5' label='Email' value={renderEmail()} />
                  <MDBInput wrapperClass='mb-4' type='tel' id='form6Example6' label='Phone' />

                  <MDBInput wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='Additional information' />

                  <MDBBtn className='' type='submit' block>
                    Place order
                  </MDBBtn>
                </form>
            </MDBCard>
            </MDBRow>
          </MDBContainer>
        </section>
    )
}