import React from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

export default function Contact() {
  return (
    <MDBContainer className='mt-5'>
    <MDBCard className='shadow-5 px-4 pt-4 pb-3'>
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage src='../assets/images/contact.jpg' alt='...' fluid/>
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <h3 className='mb-4 fontTitle text-dark'>Contact Us</h3>
            <form>
            <MDBInput id='form4Example1' wrapperClass='mb-4' label='Name' />
            <MDBInput type='email' id='form4Example2' wrapperClass='mb-4' label='Email address' />
            <MDBInput wrapperClass='mb-4' textarea id='form4Example3' rows={4} label='Message' />
            <MDBBtn type='submit' className='' color='primary' block>
                Send
            </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
    </MDBContainer>
  );
}