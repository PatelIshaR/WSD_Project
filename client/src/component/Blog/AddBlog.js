import React from 'react'
import { useState } from 'react';
import { Form, Button, Col, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar/Navbar';


const AddBlog = () => {

    const tokenstr = localStorage.getItem("usertoken")
    const array = tokenstr.split("/")
    const token = array[0]
    const id = array[1]

    const [blog, setBlog] = useState({
        Title: "",
        Content: ""
    })

    const setValue = ({currentTarget: input}) => {
      setBlog({...blog, [input.name]:input.value})
    }

    const add = async(e) => {
        e.preventDefault();
      
        const {Title, Content} = blog;
        console.log(blog)
        
        if(Title === "" || Content === ""){
          toast.error("Fill required field!", {
            position: 'top-center'
        });
        }
        else{
          let UserId = id
          console.log(UserId)
          const data = await fetch('https://localhost:7261/api/Blogs', {
                method: "POST",
                withCredentials: true,
                Credentials:"include",
                headers:{
                    "accept": "text/plain",
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${token}`
                },
                body:JSON.stringify({
                    Title, Content, UserId
                })
            });
      
            const res = data;
            console.log(res)
            if(res.status === 201){
              toast.success("Blog added successfully!", {
                position: 'top-center'
              });

            }
            else if(res.status === 400){
              toast.error("Unauthorized!", {
                position: 'top-center'
            });
            }
        }
      }

  return (
    <div>
      <Navbar />
      <Container style={{marginTop:"7rem"}}>
      <Form>
        <Form.Group controlId="form.Text">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="title" name="Title" onChange={setValue} />
        </Form.Group>
        <Form.Group controlId="form.Textarea">
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={15} name="Content" onChange={setValue}/>
        </Form.Group>
        <Button variant="btn btn-dark" onClick={add}>Add</Button>
      </Form>
    </Container>
    <ToastContainer />
    </div>
  )
}

export default AddBlog
