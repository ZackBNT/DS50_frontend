import React, {useState} from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
  MDBBadge
} from 'mdb-react-ui-kit';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../Contexts/AuthContext';


export default function Header() {
      
  const [showBasic, setShowBasic] = useState(false);

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()

  const [searchVal, setSearchVal] = useState("")
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    setSearchVal(e.target.value);
  }

  const handleSubmit = (e) => {
    navigate(`/search/${searchVal}`, {replace: true});
  }

  async function handleLogout() {
    setError("")

    try {
      await logout();
    } catch {
      setError("Failed to log out")
    }
  }

  const renderAuth = () => {
    if(currentUser){
        return <>
                <div className='me-3 my-auto'>
                    <NavLink to="/updateProfile" style={({ isActive }) => {return {color: isActive ? "#0c56d0" : "#262626",};}} onClick={() => {setShowBasic(false); setSearchVal("")}}>
                        <MDBIcon fas icon="user-cog" size='lg' />
                    </NavLink>
                </div>
                <div className='my-auto'>
                    <NavLink to="/" onClick={() => {setShowBasic(false); setSearchVal("")}}>
                        <MDBIcon fas icon="sign-out-alt" size='lg' className='text-dark'onClick={handleLogout} />
                    </NavLink>
                </div>
                </>
       
    } else{
        return <div className='my-auto'>
                    <NavLink to="/login" style={({ isActive }) => {return {color: isActive ? "#0c56d0" : "#262626",};}} onClick={() => {setShowBasic(false); setSearchVal("")}}>
                        <MDBIcon fas icon="user" size='lg' />
                    </NavLink>
               </div>
    }
  }
  
  return (
    <MDBNavbar expand='lg' light bgColor='white' sticky>
        <MDBContainer>
            <MDBNavbarBrand><NavLink to="/" className='text-dark'><span className='text-primary'>B<span className='text-decoration-underline'>OO</span>K</span><strong>STORE</strong></NavLink></MDBNavbarBrand>

            <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
            >
            <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>

            <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 fontTitle'>
                
                <MDBNavbarItem>
                <MDBNavbarLink>
                <NavLink to="/" style={({ isActive }) => {return {color: isActive ? "#0c56d0" : "#262626",};}} onClick={() => {setShowBasic(false); setSearchVal("")}}>
                    <MDBIcon fas icon="home" /> Home
                </NavLink>
                </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                <MDBNavbarLink>
                <NavLink to="/books" style={({ isActive }) => {return {color: isActive ? "#0c56d0" : "#262626",};}} onClick={() => {setShowBasic(false); setSearchVal("")}}>
                    <MDBIcon fas icon="book" /> Books
                </NavLink>
                </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                <MDBNavbarLink>
                <NavLink to="/about" style={({ isActive }) => {return {color: isActive ? "#0c56d0" : "#262626",};}} onClick={() => {setShowBasic(false); setSearchVal("")}}>
                    <MDBIcon fas icon="info" /> About
                </NavLink>
                </MDBNavbarLink>
                </MDBNavbarItem>

                <MDBNavbarItem>
                <MDBNavbarLink>
                <NavLink to="/contact" style={({ isActive }) => {return {color: isActive ? "#0c56d0" : "#262626",};}} onClick={() => {setShowBasic(false); setSearchVal("")}}>
                    <MDBIcon fas icon="address-card" /> Contact
                </NavLink>
                </MDBNavbarLink>
                </MDBNavbarItem>
                
            </MDBNavbarNav>

            <div className='d-flex fontTitle'>
                <div className=''>
                    <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
                    <input type='search' value={searchVal} onChange={handleChange} className='form-control' placeholder='Title or author' aria-label='Search' size={44} required/>
                    <MDBBtn type='submit' color='primary' onClick={() => setShowBasic(false)}><MDBIcon fas icon="search" /></MDBBtn>
                    </form>
                </div>
                <div className="mx-3 my-auto">
                    <NavLink to="/cart" style={({ isActive }) => {return {color: isActive ? "#0c56d0" : "#262626",};}} onClick={() => {setShowBasic(false); setSearchVal("")}}>
                        <MDBIcon fas icon="shopping-cart" size='lg'/>
                        <MDBBadge color='danger' notification pill>0</MDBBadge>
                    </NavLink>
                </div>
                {renderAuth()}
            </div>

            </MDBCollapse>
            {error && <span className='alert alert-danger mb-4'>{error}</span>}
        </MDBContainer>
    </MDBNavbar>
  );
}