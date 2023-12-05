import React from "react";
import {Outlet,Navigate} from 'react-router-dom'


const PublicRoute=()=> {
    const auth = localStorage.getItem('token')
  return (
    auth?<Navigate to='/userDetails'/>:<Outlet/>
  )
}

export default PublicRoute