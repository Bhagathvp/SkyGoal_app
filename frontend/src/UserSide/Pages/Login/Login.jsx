
import React, { useState,useEffect} from "react"
import "./Login.css"
import { Link ,useNavigate} from "react-router-dom"
import {CgProfile} from 'react-icons/cg'
import { toast } from "react-toastify"

export default function Login () {
  
  const handleSubmit =()=>{
    
  }

  return (
    <div className="login-form-container">
      <form className="login-form" action="/login" method="post" onSubmit={handleSubmit}>
        <div className="login-form-content">
          <h3 className="login-form-title">Sign In</h3>
          <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <CgProfile style={{fontSize:100,}}/>
          <br />
          <h3 style={{fontFamily:'monospace'}}>WELCOME BACK USER</h3>
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-dark ">
              Submit
            </button>
            <div className="text-center mt-2 Link">
              <Link style={{fontFamily:'monospace', color:'indigo',textDecoration:'none'}} to="/">Have no Account?</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}