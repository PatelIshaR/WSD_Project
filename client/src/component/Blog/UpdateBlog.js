import React from 'react'
import { useState, useEffect } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar/Navbar';

const UpdateBlog = () => {

    const tokenstr = localStorage.getItem("usertoken")
    const str = tokenstr.split("/")
    const token = str[0]
    const [blog, setBlog] = useState({
        id: "",
        title: "",
        content: "",
        UserId:""
    })

    const setValue = ({currentTarget: input}) => {
        setBlog({...blog, [input.name]:input.value})
    }

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
        setBlog(res)     
    }

    const update = async(e) => {
        e.preventDefault()
        
        const { id, title, content, userId } = blog
        let variable = JSON.stringify({
          id, title, content, userId
      });
      console.log(variable);

      let url = "https://localhost:7261/api/Blogs/" + id;
      console.log(url); 
        const data = await fetch("https://localhost:7261/api/Blogs/" + id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            },
            body: JSON.stringify({
               id, title, content, userId
            })
        })
        const res = data
        console.log(res)
    }

    useEffect(() => {
          getData()
    }, [])

  return (
    <div>
      <Navbar />
      <Container style={{marginTop:"7rem"}}>
      <Form onSubmit={update}>
        <Form.Group controlId="form.Text">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={blog.title} onChange={setValue} />
        </Form.Group>
        <Form.Group controlId="form.Textarea">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={10} value={blog.content} name="content" onChange={setValue}/>
        </Form.Group>
        <Button type="submit" variant="primary">Update</Button>
      </Form>
    </Container>
    <ToastContainer />
    </div>
  )
}

export default UpdateBlog
