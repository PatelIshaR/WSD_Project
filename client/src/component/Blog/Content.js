import React, { useState, useEffect } from 'react'

const Content = () => {
    const [blog, setBlog] = useState({
        id: "",
        title: "",
        content: "",
        user:""
    })

    const path = window.location.pathname
    const array = path.split("/")
    const id = array[2]
    // console.log(id)

    const getData = async() => {
        const data = await fetch("https://localhost:7261/api/Blogs/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        })
        const res = await data.json();
        console.log(res)
        setBlog(res)
        // if(res.status === 201){
        //   setMovie(res.detail)
        // }
    }

    useEffect(() => {
        setTimeout(() => {
          getData()
        }, 1000)
      }, [])

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  )
}

export default Content

