import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../service/user';

const AdminLogin = () => {

  const navigate = useNavigate();
  const [userData,setUserData] = useState({
    'email':'',
    'password':''
  });

  const handleChange = (e) =>{
    e.preventDefault();
    setUserData((prov)=>{
      return{
        ...prov,
        [e.target.name]:e.target.value
      }
    });
  }

  const login = () => {
    try {
      const res = loginUser(userData);
      res.then((data)=>{
        console.log(data);
        if(data.login){
          localStorage.setItem('token', data.token);
          navigate('/admin-home')
        }
      })
    } catch (err) {
        console.log(err);
    }  
  }

  return (
    <>
        <div className='container mt-3'>
            <div className='card'>
                <h3 className='d-flex justify-content-center mt-3'>Admin Login</h3>
                <input type="text" placeholder='Enter username' className="mx-3 my-3" onChange={(e)=>{ handleChange(e) }} name="email" id="userName" />
                <input type="text"  placeholder='Enter password' className="mx-3 my-3" onChange={(e)=>{ handleChange(e) }} name="password" id="password" />
                <button className="btn btn-primary mx-3 my-3" onClick={()=>{ login() }}> login </button>
            </div>
        </div>
    </>
  )
}

export default AdminLogin