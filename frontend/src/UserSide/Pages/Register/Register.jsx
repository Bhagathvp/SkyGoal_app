
import React, { useState,useEffect } from "react"
import './Register.css'
import {useNavigate} from 'react-router-dom'
import {PiEyeBold,PiEyeClosedBold} from 'react-icons/pi'
// import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
// import {register,reset} from '../../../features/authSlice'

export default function Register () {
    const [messag,setMessag] = useState('');
    const [hide,setHide] = useState(true)

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      role: '',
      password: '',
      password2: '',

    })

    const {name,email,phone,role,password,password2} = formData;
    
    const navigate = useNavigate();
    // const dispatch = useDispatch()

    // const {user,isLoading,isError,isSuccess,message} = 
    // useSelector( (state)=> state.auth )

    // useEffect(() => {
    //   if(isError){
    //     toast.error(message);
    //   }

    //   if(isSuccess || user){
    //     navigate('/home')
    //   }
      
    //   // dispatch(reset())

    // }, [user, isError,isSuccess, message, navigate, dispatch])
    

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

        // dispatch(register(userData))
      }
      
    }

    const handleClick = (e)=>{
        navigate('/login');
    }

    // if(isLoading){
    //   return <h1>loading ...</h1>
    // }

  return (
    <div className="register-form-container">

      <form className="register-form" action="/register" method="post" onSubmit={onSubmit}>
        <div className="register-form-content">
          <h3 className="register-form-title">Create Your Acount</h3>
          <div className="text-center Links">
            Already registered?{" "}
            <span style={{cursor:"pointer",color:'indigo'}} onClick={handleClick}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Your name"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="form-group mt-3">
            <label>Phone</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Mobile number"
              id="phone"
              name="phone"
              value={phone}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label >Designation/Role</label>
            <select className="form-control mt-1" name="role" onChange={onChange} required>
                <option value={role}>Select a role</option>
                <option value="Web developer">Web Developer</option>
                <option value="Web designer">Web Designer</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <div style={{display:'flex',alignItems:'center'}}>
                <input style={{width:'100%'}}
                type={hide?"password":"text"}
                className="form-control mt-1"
                placeholder="Password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                required
                />
                <div onClick={(e)=>{setHide(!hide)}} style={{position:'relative', right:'20px'}}>
                    {hide ?< PiEyeBold />:< PiEyeClosedBold />}
                </div>
            </div>
            
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="confirm-password"
              className="form-control mt-1"
              placeholder="confirm-Password"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              required>
            </input>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </div>
          <p>{messag}</p>
        </div>
      </form>
      
    </div>
  )
}