import React from 'react'
import { Component } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-div">
        <header class="header">
            <a href="#" className="logo">BlogPost </a>
            <nav className="navbar">
                <div id="nav-close"></div>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/blogs">Blogs</NavLink>
                <a href="#">Add blog</a>
                <a href="#">Contact Us</a>
                <NavLink to="/">Logout</NavLink>
            </nav>
        </header>
    </div>
  )
}

export default Navbar
