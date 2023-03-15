import React from 'react'
import Navbar from '../navbar/Navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Blogs from '../Blog/Blogs'

const Home = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("usertoken")
  if(!token){
    console.log("error")
    navigate("*")
  }
  // console.log(token)
  const array = token.split("/")
  const id = array[1]
  console.log(id)

  return (
    <div>
      <Navbar id={id}/>
      <Blogs />
     
    </div>
  )
}

export default Home
