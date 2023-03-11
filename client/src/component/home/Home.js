import React from 'react'
import Navbar from '../navbar/Navbar'
import { useNavigate } from 'react-router-dom'

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
      
     
    </div>
  )
}

export default Home
