import React, {useRef, useState} from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { useAuth } from "../Contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"

export default function UpdateProfile() {
  
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
        <MDBContainer className='mt-5'>
        <MDBCard className='shadow-5 p-5 col-md-4 offset-md-4'>
          <h3 className='fontTitle text-dark text-center mb-5'>Update Profile</h3>
          {error && <span className='alert alert-danger mb-4'>{error}</span>}
          <form onSubmit={handleSubmit}>
            <MDBInput className='mb-4' type='email' id='email' label='Email address' inputRef={emailRef} required defaultValue={currentUser.email} />
            <MDBInput className='mb-4' type='password' id='password' label='New Password' inputRef={passwordRef} minLength='6' />
            <MDBInput className='mb-4' type='password' id='passwordConfirm' label='Password Confirmation' inputRef={passwordConfirmRef} minLength='6' />

            <MDBBtn type='submit' className='mb-4' disabled={loading} block>
                Update
            </MDBBtn>

            <div className='text-center'>
                <p>
                  <Link to='/'>Cancel</Link>
                </p>
            </div>
            </form>
        </MDBCard>
        </MDBContainer>
    
  );
}