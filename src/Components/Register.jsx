import React, {useRef, useState, useEffect} from 'react';
import {
  MDBContainer,
  MDBCard,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useAuth } from "../Contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';

export default function Register() {
  
  const usernameRef = useRef()
  const firstnameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const firstfavtagRef = useRef()
  const secondfavtagRef = useRef()
  const thirdfavtagRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [tags, setTags] = useState([])

    useEffect(() => {
        axios
        .get(`https://ds50api.fr/apis/DS50/Tag/AllTags`)
        .then(res => {
            setTags(res.data);
        })
    }, [])

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      const resp = await axios.post(`https://ds50api.fr/apis/DS50/User`, {
        "first_name": firstnameRef.current.value,
        "last_name": lastnameRef.current.value,
        "username": usernameRef.current.value,
        "password": passwordRef.current.value,
        "mail": emailRef.current.value,
        "address": "address",
        "first_fav_category": firstfavtagRef.current.value,
        "second_fav_category": secondfavtagRef.current.value,
        "third_fav_category": thirdfavtagRef.current.value
      });
      navigate('/');
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
        <MDBContainer className='mt-5'>
        <MDBCard className='shadow-5 p-5 col-md-4 offset-md-4'>
          <h3 className='fontTitle text-dark text-center mb-5'>Register</h3>
          {error && <span className='alert alert-danger mb-4'>{error}</span>}
          <form onSubmit={handleSubmit}>

            <MDBRow className='mb-4'>
              <MDBCol>
              <MDBInput id='firstname' label='First name' inputRef={firstnameRef} required />
              </MDBCol>
              <MDBCol>
              <MDBInput id='lastname' label='Last name' inputRef={lastnameRef} required />
              </MDBCol>
            </MDBRow>
            
            <MDBInput id='username' className='mb-4' label='Username' inputRef={usernameRef} required />            
            <MDBInput className='mb-4' type='email' id='email' label='Email address' inputRef={emailRef} required />
            <MDBInput className='mb-4' type='password' id='password' label='Password' inputRef={passwordRef} minLength='6' required />
            <MDBInput className='mb-4' type='password' id='passwordConfirm' label='Password Confirmation' inputRef={passwordConfirmRef} minLength='6' required />
            
            <label className="form-label">Please select your top 3 favorite categories !</label>
            <MDBRow>
              <MDBCol xs='12' md='4'>
              <select className="form-select mb-2" ref={firstfavtagRef} required>
                <option></option>
                {tags.map(tag => 
                  <option key={tag.tag_id} value={tag.tag_id}>{tag.name.substr(0, tag.name.indexOf(':'))}</option>
                )}
              </select>
              </MDBCol>
              <MDBCol xs='12' md='4'>
              <select className="form-select mb-2" ref={secondfavtagRef} required>
                <option></option>
                {tags.map(tag => 
                  <option key={tag.tag_id} value={tag.tag_id}>{tag.name.substr(0, tag.name.indexOf(':'))}</option>
                )}
              </select>
              </MDBCol>
              <MDBCol xs='12' md='4'>
              <select className="form-select mb-4" ref={thirdfavtagRef} required>
                <option></option>
                {tags.map(tag => 
                  <option key={tag.tag_id} value={tag.tag_id}>{tag.name.substr(0, tag.name.indexOf(':'))}</option>
                )}
              </select>
              </MDBCol>
            </MDBRow>

            <MDBBtn type='submit' className='mb-4' disabled={loading} block>
                Sign up
            </MDBBtn>

            <div className='text-center'>
                <p>
                  Have already an account? <Link to='/login'>Login</Link>
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