import React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Books from './Components/Books';
import Book from './Components/Book';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Contact from './Components/Contact';
import About from './Components/About';
import Login from './Components/Login';
import Register from './Components/Register';
import UpdateProfile from './Components/UpdateProfile';
import ResetPassword from './Components/ResetPassword';
import Search from './Components/Search';
import { AuthProvider } from './Contexts/AuthContext';

function App() {

  return (
    <AuthProvider>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/books" element={<Books/>} />
      <Route path="/books/:bookId" element={<Book/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<Checkout/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/resetPassword" element={<ResetPassword/>} />
      <Route path="/updateProfile" element={<UpdateProfile/>} />
      <Route path="/search/:searchValue" element={<Search/>} />
    </Routes>
    <Footer/>
    </AuthProvider>
  );
}

export default App;
