import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Blogs.module.css'
import Navbar from '../navbar/Navbar'

const Blogs = () => {
    const[blog,setBlog] = useState([''])
    const displayFun = async () => {
        const res = await fetch("https://localhost:7261/api/Blogs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await res.json();
        setBlog(data)
        // if(data.status === 201){
        //     setBlog(data.movies)
        // }
        // console.log(movie)
        console.log(data)
    }
    

    useEffect(() => {
        setTimeout(() => {
            displayFun();
        })
    
    }, [])

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
                        
                        <NavLink to={`/blogs/${item.id}`} className="btn btn-primary">Read</NavLink>
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
    {/* <Navbar />
    <div classNameName="movieCard" style={{ display: "flex", flexWrap:"wrap", marginLeft:"8rem", overflow:"hidden", marginTop:"2rem"}}>
        {display}
    </div> */}
    <div className="display" style={{ display: "flex", flexWrap:"wrap", marginLeft:"8rem", overflow:"hidden", marginTop:"2rem"}}>
    {display}
    </div>
    </>
  )
}

export default Blogs
