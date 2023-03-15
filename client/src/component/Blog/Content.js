import React, { useState, useEffect } from 'react'
import styles from './Content.module.css'

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
    }

    useEffect(() => {
        setTimeout(() => {
          getData()
        }, 1000)
      }, [])

  return (
    <div className={styles.box}>
      <h1>{blog.title}</h1>
      <div className={styles.content}>
      <p>{blog.content}</p>
      </div>
    </div>
  )
}

export default Content

