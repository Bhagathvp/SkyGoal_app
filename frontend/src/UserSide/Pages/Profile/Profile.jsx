import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/NavBar'
import Footer from '../../Components/Footer'

import { getUserDetails, logoutApi } from '../../../api/Api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate();
    const [details,setDetails] = useState({});
    
    useEffect(()=>{

        getUserDetails().then(res=>{
            console.log(res.data);
            setDetails(res.data);
        }).catch(err=>{
            console.log(err);
            if(err.response.status ===403 && err.response.data.message ==='jwt expired'){
                logoutApi();
                toast.error(err.response.data.message);
                navigate('/login')
            }
            toast.error(err.response.data);
        })
    },[])
  return (
    <div className="w-[100vw] h-[100vh] bg-gray-600 flex flex-col justify-between">
      <NavBar/>
      <>
        <section className="h-[75%] bg-gray-900">
            <div className=" items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">

                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Hi {details?.name}</h2>
                    <p className='font-medium mb-4'>Basic details: </p>
                    <p className="mb-3 text-white font-semibold">Email : {details?.email}</p>
                    <p className="mb-3 text-white font-semibold">Phone : {details?.phone}</p>
                    <p className="mb-3 text-white font-semibold">Role : {details?.role}</p>

                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <img className="w-full rounded-lg" src={details?.imageUrl} alt={details?.name}/>
                </div>
            </div>
        </section>
      </>
      <Footer/>
    </div>
  )
}

export default Profile
