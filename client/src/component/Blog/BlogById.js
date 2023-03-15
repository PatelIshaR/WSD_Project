import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Blogs.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../navbar/Navbar'

const BlogById = () => {
    const tokenstr = localStorage.getItem("usertoken")
    const array = tokenstr.split("/")
    const token = array[0]
    const id = array[1]
    // componentDidMount()
    // const componentDidMount = () => {
    //     displayFun()
    // }

    const[blog,setBlog] = useState([''])
    const displayFun = async () => {
        const res = await fetch("https://localhost:7261/blog/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        });
        const data = await res.json();
        setBlog(data)
        // console.log(data)
    }

    function handleDelete(id)  {
        console.log(id)
        const res = fetch("https://localhost:7261/api/Blogs/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
            }
        });
    }
    
    useEffect(() => {
        displayFun();    
    }, [handleDelete])

    const display = blog.map((item) => {
        return(
            <>
            <Navbar />
                {/* <h3><NavLink to={`/blogs/${item.id}`}>{item.title}</NavLink></h3> */}
            <div className={styles.blogContainer} style={{flexDirection:"row"}}>
            <div className={styles.container} style={{display:"flex"}} />
                {/* <div classNameName={styles.cards}> */}
                    <div className={styles.cardBody}>
                        
                        <h4 className={styles.title}>{item.title}</h4>
                        <div className={styles.textfield}>
                        <p className={styles.text}>{item.content}</p>
                        </div>
                        
                        <NavLink to={`/blog/${item.id}`} className="btn btn-dark" style={{marginLeft:"1rem"}}>Read</NavLink>
                        <NavLink to={`/updateBlog/${item.id}`} className="btn btn-primary" style={{marginLeft:"1rem"}}>Update</NavLink>
                        <button className="btn btn-danger" value={item.id} style={{marginLeft:"1rem"}} onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                </div>
            {/* </div> */}
            </>
                
            // </div>
        )
    })

  return (
    <>
    {/* <Navbar /> */}

    <div className="display" style={{ display: "flex", flexWrap:"wrap", marginLeft:"8rem", overflow:"hidden", marginTop:"2rem"}}>
    {display}
    </div>
    </>
  )
}

export default BlogById
