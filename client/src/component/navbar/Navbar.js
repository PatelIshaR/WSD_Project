import React from 'react'
import { Component } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('usertoken')
    navigate("/")
  }
  
  return (
    <div className="navbar-div">
        <header className="header">
            <a href="#" className="logo">BlogPost </a>
            <nav className="navbar">
                <div id="nav-close"></div>
                <NavLink to="/home" style={{textDecoration:"none"}}>Home</NavLink>
                <NavLink to="/blogs" style={{textDecoration:"none"}}>Uploaded Blogs</NavLink>
                {/* <NavLink to="/updateBlog" style={{textDecoration:"none"}}>Update Blog</NavLink> */}
                <NavLink to={`/addBlog/${props.id}`} style={{textDecoration:"none"}}>Add blog</NavLink>
                {/* <a href="#" style={{textDecoration:"none"}}>Contact Us</a> */}
                <NavLink to="/" style={{textDecoration:"none"}} onClick={handleLogout} >Logout</NavLink>
            </nav>
        </header>
    </div>
  )
}

export default Navbar
