
import Axios from '../constants/axios'



export const signUpApi = data => {
    return Axios.post('/', data)
}

export const loginApi = data => {
    return Axios.post('/login', data)
}

export const logoutApi = () =>{
     localStorage.removeItem('token');
    return 'logged out';
}

export const getUserDetails = () => {
    return Axios.get('/userDetails',
    { headers : {   auth : JSON.parse(localStorage.getItem('token'))   } })
}

export const editProPicApi =(data)=>{
    return Axios.post('/editProPic', data, {
        headers : { auth : JSON.parse(localStorage.getItem('token')),"Content-Type": "multipart/form-data"  }
    })
}