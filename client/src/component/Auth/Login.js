import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({
      username: "",
      password: ""
  })

  const setValue = ({currentTarget: input}) => {
    setUser({...user, [input.name]:input.value})
  }

  const userLogin = async(e) => {
    e.preventDefault();

    const {username, password} = user;
    console.log(user)
    if(username === "" || password === ""){
      // alert('Fill required field!!')
      toast.error("Fill required field!", {
        position: 'top-center'
    });
    }
    else{
      const data = await fetch('https://localhost:7261/api/Auth/Login', {
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

        const res = data.json();
        res.then(function(result) {
          console.log(result) 
          
          if(result.status === 200){
            // const str = result.token
            // const array = str.split("/")
            // const token = array[0]
            // console.log(token)
            localStorage.setItem('usertoken', result.token)
            navigate('/home')
          }
        //   else {
        //   // alert('Incorrect username or password!')
        //     toast.error("Incorrect username or password!", {
        //       position: 'top-center'
        //   });
        // }

       })
       .catch(error => {
        console.log(error)
            toast.error("Incorrect username or password!", {
               position: 'top-center'
          })
        })
    }

  }

  return (
    <div>
      <div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={userLogin}>
						<h1>Login to Your Account</h1>
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
					<h1>New Here ?</h1>
					<Link to="/register">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
          <ToastContainer />
				</div>
			</div>
		</div>
    </div>
  )
}

export default Login
