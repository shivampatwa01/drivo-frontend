import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

export const Register = () => {
  

   const [formData, setFormData] = useState({})
   const [err, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
    const res = await fetch('https://drivo.onrender.com/api/auth/register',
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
    toast.success('Registration successful')

    setLoading(false);
    setError(null);

    setTimeout(() => {
      navigate('/login');
    }, 1000); 

    } catch(error){
      setLoading(false);
      setError(error.message);
      return console.log(err)
    }
    
  }  

  const changeHandle = (e) => {
      setFormData({
        ...formData,
        [e.target.id]:e.target.value, 
      });
  }

  

  return ( 
    <div>
    <div className='login'>
    <Toaster />
      
      <div className='flex justify-end items-center '>
      
      <form onSubmit={onSubmitHandler} className='bg-white h-[385px] w-[320px] mr-[15vw] mt-[100px] p-1 border border-slate-500 rounded-2xl'>
      
      <p className='log-title'>Register</p>
      <hr className='mt-[10px] mb-1'/>
      
       <div className='flex flex-col items-start ml-[20px] mr-[20px] mt-[15px] '>
        <label className='maincol'>Username</label>
        <input required type='text' name='username' id='username' className='border border-slate-700 rounded-md w-full h-[35px] p-2' onChange={changeHandle}></input>
      </div>

  
    <div className='flex flex-col items-start ml-[20px] mr-[20px] mt-[15px]'>
        <label className='maincol' >Email</label>
        <input required type='email' name='email' id='email' className='border border-slate-700 rounded-md w-full h-[35px] p-2' onChange={changeHandle}></input>
    </div>

    <div className='flex flex-col items-start ml-[20px] mr-[20px] mt-[15px]'>
        <label className='maincol' >Password</label>
        <input required type='password' name='password' id='password' className='border border-slate-700 rounded-md w-full h-[35px] p-2' onChange={changeHandle}></input>
    </div>
    
         <button disabled={loading} className='h-[40px] w-[150px] button-gradient text-lg font-semibold mt-[20px] text-white rounded-lg ml-[-115px] hover:w-[155px]'> 
          {loading ? 'Loading...' : 'Register'}</button> 
          <br/>
          <hr className='mt-[15px] mb-[10px]'/>       

          <NavLink to='/login' className='text-slate-500 ml-[-115px]'>Have an account? <span className='maincol'>Login</span></NavLink>
          
    </form>
     
      </div>
    </div>
    </div>
)
}
