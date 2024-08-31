import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addcar } from '../redux/thunks/carThunk'
import { Spinner } from '../components/Spinner'
import { Toaster } from 'react-hot-toast'


function AddCar() {

   const dispatch = useDispatch() 
   const loading = useSelector(state => state.cars.loading);
   const [formData, setFormData] = useState({})
   const [check, setCheck] = useState(false);
   const navigate = useNavigate();

  const submitHandler = (e) =>{
      e.preventDefault();
   
      formData.bookedTimeSlots=[]
    dispatch(addcar(formData))
    setCheck(true);

  }
  if(check){
    setTimeout(() => {
        navigate('/admin');
      }, 1000); 
    }


  const changeHandle = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value, 
    });
}

  return (
    <Layout>
      <Toaster/>
      <div className='flex items-center justify-center'>
      {loading ? (<div className='mt-[200px]'><Spinner /></div>) :(
        <div className='flex  justify-center items-center mt-[35px]'>
        <form onSubmit={submitHandler}  className='bg-white h-[455px] w-[720px]   p-1 border border-slate-500 rounded-2xl'>
      
      <h1 className='log-title mt-[-12px]' >Add New Car</h1>
      <hr className='mt-[1px] mb-1'/>
      
       <div className='flex flex-col items-start ml-[20px] mr-[20px] mt-[10px] '>
        <label className='maincol'>Car name</label>
        <input required name='name' id='name' className='border border-slate-700 rounded-md w-full h-[35px] p-2' onChange={changeHandle}></input>
      </div>

      <div className='flex flex-col items-start ml-[20px] mr-[20px] mt-[10px] '>
        <label className='maincol'>Image url</label>
        <input required name='image' id='image' className='border border-slate-700 rounded-md w-full h-[35px] p-2' onChange={changeHandle}></input>
      </div>

      <div className='flex flex-col items-start ml-[20px] mr-[20px] mt-[10px] '>
        <label className='maincol'>Rent per hour</label>
        <input required name='rentPerHour' id='rentPerHour' className='border border-slate-700 rounded-md w-full h-[35px] p-2'onChange={changeHandle} ></input>
      </div>

      <div className='flex flex-col items-start ml-[20px] mr-[20px] mt-[10px] '>
        <label className='maincol'>Capacity</label>
        <input required name='capacity' id='capacity' className='border border-slate-700 rounded-md w-full h-[35px] p-2' onChange={changeHandle}></input>
      </div>

      <div className='flex flex-col items-start ml-[20px] mr-[20px] mt-[10px] '>
        <label className='maincol'>Fuel Type</label>
        <input required name='fuelType' id='fuelType' className='border border-slate-700 rounded-md w-full h-[35px] p-2' onChange={changeHandle}></input>
      </div>

    
       <div className='flex items-center justify-center gap-[25vw]'>

          <Link to = '/admincontroll/66d194d72405416f38c6c37b' className='text-slate-500 text-[15px] mt-[15px]'>Go to <span className='maincol'>Admin Home</span></Link>

          <button  className='h-[40px] w-[150px] button-gradient text-lg font-semibold mt-[20px]  text-white rounded-lg  hover:text-black'> 
          ADD CAR</button> 
         
          </div>

          
          
    </form>
        </div>)}
        </div>
    </Layout>
  )
}

export default AddCar