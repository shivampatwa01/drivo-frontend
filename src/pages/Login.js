import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast';

export const Login = () => {

   const [formData, setFormData] = useState({})
   const [err, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
    const res = await fetch('https://drivo.onrender.com/api/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if(data.success === false) {
      setError(data.message);
      toast.error(data.message);
      setLoading(false);
      return;
    }

    toast.success('Login successful')
    localStorage.setItem('user', JSON.stringify(data))

    setLoading(false);
    setError(null);

    setTimeout(() => {
      navigate('/');
    }, 500); 

    } catch(error){
      setLoading(false);
      setError(error.message);
     console.log(err);
    }
    
  }  

  const changeHandle = (e) => {
      setFormData({
        ...formData,
        [e.target.id]:e.target.value, 
      });
  }


  return ( 
    <div className='login'>
      <Toaster></Toaster>
      <div className='flex justify-end items-center '>
      
      <form onSubmit={onSubmitHandler} className='bg-white h-[315px] w-[320px] mr-[15vw] sm:mr-[10vw] mt-[100px] p-1 border border-slate-500 rounded-2xl'>
      
      <h1 className='log-title mt-[-12px]' >Login</h1>
      <hr className='mt-[1px] mb-1'/>
      
       <div className='flex flex-col items-start ml-[20px] mr-[20px] mt-[15px] '>
        <label className='maincol'>Username</label>
        <input required type='text' name='username' id='username' className='border border-slate-700 rounded-md w-full h-[35px] p-2' onChange={changeHandle}></input>
      </div>

    <div className='flex flex-col items-start ml-[20px] mr-[20px] mt-[15px]'>
        <label className='maincol' >Password</label>
        <input required type='password' name='password' id='password' className='border border-slate-700 rounded-md w-full h-[35px] p-2' onChange={changeHandle}></input>
    </div>
    
         <button disabled={loading} className='h-[40px] w-[150px] button-gradient text-lg font-semibold mt-[20px]  text-white rounded-lg ml-[-115px] hover:w-[155px]'> 
          {loading ? 'Loading...' : 'Login'}</button> 
          <br/>
          <hr className='mt-[15px] mb-[10px]'/>

          <NavLink to='/register' className='text-slate-500 ml-[-130px]'>Click Here to <span className='maincol'>Register</span></NavLink>
          
    </form>
     
      </div>
    </div>
)
}
