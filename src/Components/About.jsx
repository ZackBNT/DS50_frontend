import React from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function About() {
  return (
    <MDBContainer className='mt-5'>
    <MDBCard className='shadow-5 p-4'>
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage src='../assets/images/about.png' alt='...' fluid className='mt-5'/>
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <h3 className='mb-4 fontTitle text-dark'>About Us</h3>
            <p>
              Dear readers,
              We offer a tremendous gathering of books in the various classifications of Fiction, Non-fiction, Biographies, History, Religions, Self – Help, Children. We likewise move in immense accumulation of Investments and Management, Computers, Engineering, Medical, College and School content references books proposed by various foundations as schedule the nation over. Other than this, we likewise offer an expansive gathering of E-Books at reasonable valuing.
              We endeavor to broaden consumer loyalty by providing food simple easy using web indexes, brisk and easy-to-understand installment alternatives, and snappier conveyance frameworks. Upside to the majority of this, we are arranged to give energizing offers and charming limits on our books.
              Too, we modestly welcome every one of the merchants around the nation to band together with us. We will without a doubt give you the stage to many shimmering areas and develop the “BookStore” family. We might want to thank you for shopping with us. You can keep in touch with us for any new musings at “email-id” helping us to ad-lib for the peruser fulfillment.
            </p>
            <small className='text-muted'>Team <span className='text-primary'>B<span className='text-decoration-underline'>OO</span>K</span><strong>STORE</strong></small>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
    </MDBContainer>
  );
}