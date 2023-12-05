
// import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import {Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import PublicRoute from "./routes/publicRoute";
import PrivateRoute from "./routes/privateRoute";

const Login = lazy(()=>import('./UserSide/Pages/Login/Login'))
const SignUp = lazy(()=>import('./UserSide/Pages/Register/Register'))
const Profile = lazy(()=>import('./UserSide/Pages/Profile/Profile'))

function App() {

  return (

    <>
    <Suspense fallback={<p className='text-2xl font-medium'>Loading...</p>}>
      <Routes>
        <Route path="/" >
          <Route element={<PublicRoute />}>
            <Route index element={ <SignUp /> } />  
            <Route path="/login" element={ <Login/> } />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/userDetails" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>

    <ToastContainer/>
    </>
    
  );
}

export default App;
