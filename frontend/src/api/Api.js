
import Axios from '../constants/axios'



export const signUpApi = data => {
    return Axios.post('/signup', data)
}

export const loginApi = data => {
    return Axios.post('/login', data)
}

export const getUser = data => {
    return Axios.get('/userDetails',
    { headers : {    auth : JSON.parse(localStorage.getItem('auth')).token   } , params : data })
}

