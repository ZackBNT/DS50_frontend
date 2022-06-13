import React from 'react';
import { MDBContainer, MDBCard, MDBCardTitle, MDBCardText, MDBCardOverlay, MDBCardImage } from 'mdb-react-ui-kit';
import Recommended from './Recommended';
import BestSellers from './BestSellers';
import { useAuth } from '../Contexts/AuthContext';

export default function Home() {

  const { currentUser } = useAuth()

  const renderRecommended = () => {
    if(currentUser){
        return <>
                  <Recommended/>
                  <MDBContainer><hr className='mb-5'/></MDBContainer>
                </>
       
    } else{
        return <>
               </>
    }
  }

  return (
    <section className=''>
      <MDBCard background='dark' className='text-white text-center mb-5'>
      <MDBCardImage overlay src='../assets/images/home.jpg' alt='' style={{height : 500}}/>
      <MDBCardOverlay>
      <div className='mask d-flex align-items-center justify-content-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='box'>
              <MDBCardTitle className='fontTitle'>“ If you don’t like to read, you haven’t found the right book ”</MDBCardTitle>
              <MDBCardText>
              Find your place at <span className='text-primary'>B<span className='text-decoration-underline'>OO</span>K</span><strong>STORE</strong> and get the right book for you. Over 5 million books ready to ship ! 
              </MDBCardText>
          </div>
      </div>
      </MDBCardOverlay>
      </MDBCard>

      {renderRecommended()}
      <BestSellers/>
    </section>
  );
}