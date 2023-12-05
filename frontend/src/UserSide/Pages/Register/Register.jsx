
import React, { useState } from "react"
import './Register.css'
import {useNavigate} from 'react-router-dom'
import {PiEyeBold,PiEyeClosedBold} from 'react-icons/pi'
import { toast } from "react-toastify"
import NavBar from "../../Components/NavBar"
import Footer from "../../Components/Footer"
import { signUpApi } from "../../../api/Api"

export default function Register () {
    const [hide,setHide] = useState(true)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      role: 'Frontend Developer',
      password: '',
      password2: '',

    })

    const {name,email,phone,role,password,password2} = formData;
    
    const onChange = (e) =>{
      setFormData((prevstate)=>({
        ...prevstate,
        [e.target.name]:e.target.value
      }))
    }

    const onSubmit =(e) =>{
      e.preventDefault();

      if(password !== password2){
        toast.error('Passwords do not match')
      }else{
        const userData ={
          name,
          email,
          password,
          phone,
          role
        }

        signUpApi(userData).then((res)=>{
          console.log(res)
          toast.success(res.data);
          navigate('/login')
        }).catch(err=>{
          console.log(err.response.data)
          toast.error(err.response.data)
        })
      }
      
    }

    const handleClick = (e)=>{
        navigate('/login');
    }

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-600 flex flex-col justify-between">
      <NavBar/>
      <div className=" flex justify-center items-center">

        <form className="register-form" action="/signUp" method="post" onSubmit={onSubmit}>
          <div className="register-form-content">
            <h3 className="register-form-title">Create Your Acount</h3>
            
            <div className=" mt-3 flex justify-between">
              <label className="text-lg m-1 w-full">Full Name</label>
              <input
                type="text"
                className="m-1 p-1 rounded-sm w-full"
                placeholder="Your name"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div  className=" mt-3 flex justify-between">
              <label className="text-lg m-1 w-full">Email address</label>
              <input
                type="email"
                className="m-1 p-1 rounded-sm w-full"
                placeholder="Email Address"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            
            <div className=" mt-3 flex justify-between">
              <label className="text-lg m-1 w-full">Phone</label>
              <input
                type="number"
                className="m-1 p-1 rounded-sm w-full "
                placeholder="Mobile number"
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
                required
              />
            </div>
            <div className=" mt-3 flex justify-between">
              <label className="text-lg m-1 w-full">Designation/Role</label>
              <select className="m-1 p-1 rounded-sm w-full" name="role" onChange={onChange} required>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Fullstack Developer">Fullstack Developer</option>
              </select>
            </div>
            <div className=" mt-3 flex justify-between">
              <label className="text-lg m-1 w-full">Password</label>
              <div style={{display:'flex',alignItems:'center'}} className="bg-white m-1 p-1 rounded-sm w-full">
                  <input style={{width:'100%'}}
                  type={hide?"password":"text"}
                  className="outline-none"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                  />
                  <div onClick={(e)=>{setHide(!hide)}} >
                      {hide ?< PiEyeBold />:< PiEyeClosedBold />}
                  </div>
              </div>
              
            </div>
            <div className=" mt-3 flex justify-between">
              <label className="text-lg m-1 w-full">Confirm Password</label>
              <input
                type="confirm-password"
                className="m-1 p-1 rounded-sm w-full"
                placeholder="confirm-Password"
                id="password2"
                name="password2"
                value={password2}
                onChange={onChange}
                required>
              </input>
            </div>
            <div className="gap-2 mt-3 flex flex-col justify-center items-center">
              <button type="submit" className="bg-slate-700 text-white p-2 rounded px-4">
                Submit
              </button>
            </div>
            <div className="text-center Links">
              Already registered?{" "}
              <span style={{cursor:"pointer",color:'indigo'}} onClick={handleClick}>
                Login
              </span>
            </div>
          </div>
        </form>
        
      </div>
      <Footer/> 
    </div>
   
  )
}