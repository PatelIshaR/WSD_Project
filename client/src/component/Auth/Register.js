import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import {Modal, button} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: ""
})

const setValue = ({currentTarget: input}) => {
  setUser({...user, [input.name]:input.value})
}

const userRegister = async(e) => {
  e.preventDefault();

  const {username, password} = user;
  console.log(user)
  if(username === "" || password === ""){
    toast.error("Fill required field!", {
      position: 'top-center'
  });
  }
  else{
    const data = await fetch('https://localhost:7261/api/Auth/Register', {
          method: "POST",
          withCredentials: true,
          Credentials:"include",
          headers:{
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin': '*'
          },
          body:JSON.stringify({
              username, password
          })
      });

      const res = data;
      if(res.status === 200){
        alert('User registered successfully!')
      }
      else if(res.status === 400){
        // alert('Username already exists!')
        toast.error("Username already exists!", {
          position: 'top-center'
      });
      }
      // console.log(res)
  }
}
  return (
      <div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={userRegister}>
						<h1>Register</h1>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={setValue}
							value={user.username}
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={setValue}
							value={user.password}
							className={styles.input}
						/>
						<button type="submit" className={styles.green_btn}>
							Sing In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>For Login</h1>
					<Link to="/">
						<button type="button" className={styles.white_btn}>
							Login
						</button>
					</Link>
          <ToastContainer />
				</div>
			</div>
    </div>
  )
}

export default Register
