import React, {useRef, useState} from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useAuth } from "../Contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ResetPassword() {
  
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
        setMessage("")
        setError("")
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage("Check your inbox for further instructions")
      } catch {
        setError("Failed to reset password")
      }
  
      setLoading(false)
    }

  return (
        <MDBContainer className='mt-5'>
        <MDBCard className='shadow-5 p-5 col-md-4 offset-md-4'>
          <h3 className='fontTitle text-dark text-center mb-5'>Password Reset</h3>
          {error && <span className='alert alert-danger mb-4'>{error}</span>}
          {message && <span className='alert alert-success mb-4'>{message}</span>}
          <form onSubmit={handleSubmit}>
          <MDBInput className='mb-4' type='email' id='email' label='Email address' inputRef={emailRef} required />

          <MDBBtn type='submit' className='mb-4' disabled={loading} block>
            Reset Password
          </MDBBtn>

          <div className='text-center'>
            <p>
                <Link to='/login'>Login</Link>
            </p>
            <p>
              Not a member? <Link to='/register'>Register</Link>
            </p>
            <p>or sign up with:</p>

            <MDBBtn floating className='mx-1'>
              <MDBIcon fab icon='facebook-f' />
            </MDBBtn>

            <MDBBtn floating className='mx-1'>
              <MDBIcon fab icon='google' />
            </MDBBtn>

            <MDBBtn floating className='mx-1'>
              <MDBIcon fab icon='twitter' />
            </MDBBtn>

            <MDBBtn floating className='mx-1'>
              <MDBIcon fab icon='github' />
            </MDBBtn>
          </div>
        </form>
        </MDBCard>
        </MDBContainer>
    
  );
}