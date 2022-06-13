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
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/');
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }


  return (
        <MDBContainer className='mt-5'>
        <MDBCard className='shadow-5 p-5 col-md-4 offset-md-4'>
          <h3 className='fontTitle text-dark text-center mb-5'>Login</h3>
          {error && <span className='alert alert-danger mb-4'>{error}</span>}
          <form  onSubmit={handleSubmit}>
          <MDBInput className='mb-4' type='email' id='email' label='Email address' inputRef={emailRef} required />
          <MDBInput className='mb-4' type='password' id='password' label='Password' inputRef={passwordRef} minLength='6' required />

          <MDBRow className='mb-4'>
            <MDBCol className='d-flex justify-content-center'>
              <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
            </MDBCol>
            <MDBCol>
              <Link to='/ResetPassword'>Forgot password?</Link>
            </MDBCol>
          </MDBRow>

          <MDBBtn type='submit' className='mb-4' disabled={loading} block>
            Sign in
          </MDBBtn>

          <div className='text-center'>
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