
import React, { useState} from "react"
import "./Login.css"
import { Link ,useNavigate} from "react-router-dom"
import {CgProfile} from 'react-icons/cg'
import { toast } from "react-toastify"

import NavBar from "../../Components/NavBar"
import Footer from "../../Components/Footer"
import { loginApi } from "../../../api/Api"

export default function Login () {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    email: '',
    password: ''
  }) 
  const {email, password} = formData;

  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }


  const handleSubmit =(e)=>{
    e.preventDefault();

    const data ={
      email,
      password
    }
    console.log(data)
    loginApi(data).then(res =>{
      console.log(res.data);
      toast.success('login successfull');
      localStorage.setItem('token' , JSON.stringify(res.data.token));
      navigate('/userDetails')
    }).catch(err =>{
      console.log(err);
      toast.error(err.response.data);
    })

  }

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-600 flex flex-col justify-between">
      
      <NavBar/>
      <div className="h-[75%] flex justify-center items-center">
        <form className="login-form" action="/login" method="post" onSubmit={handleSubmit}>
          <div className="login-form-content">
            <h3 className="login-form-title ">Sign In</h3>
            <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <CgProfile style={{fontSize:100,}}/>
            <br />
            <h3 className="text-2xl" style={{fontFamily:'monospace'}}>WELCOME BACK USER</h3>
            </div>
            <div className=" mt-3 flex justify-between">
              <label className="text-lg m-1">Email address</label>
              <input
                type="email"
                className="m-1 p-1 rounded-sm"
                placeholder="Enter email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className=" mt-3 flex justify-between">
              <label className="text-lg m-1">Password</label>
              <input
                type="password"
                className="m-1 p-1 rounded-sm"
                placeholder="Enter password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <div className=" gap-2 mt-3 flex flex-col justify-center items-center">
              <button type="submit" className="bg-slate-700 text-white p-2 rounded ">
                Submit
              </button>
              <div className="text-center mt-2 text-base">
                <Link style={{fontFamily:'monospace', color:'indigo',textDecoration:'none'}} to="/">Have no Account?</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
    
  )
}