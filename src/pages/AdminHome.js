import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { deletecar, getAllcars } from '../redux/thunks/carThunk'
import { Spinner } from '../components/Spinner'
import { Link } from 'react-router-dom'
import { Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'



export const AdminHome = () => {
  const cars = useSelector(state => state.cars.cars);
  const loading = useSelector(state => state.cars.loading);
    const [totalCars, setTotalCars] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
         dispatch(getAllcars())
    }, [dispatch])

    useEffect(() => {
      
       setTotalCars(cars)

    }, [cars])


  return (
    <div>
    <Layout>
 
       
        <Link to='/addcar'><div className='mt-[30px] text-white button-gradient text-[20px] h-[40px] w-[40%] flex items-center justify-center no-underline ml-[30%] rounded-lg'>ADD NEW CAR</div></Link>
       <div className='flex items-center justify-center'>
        {loading === true ? (<div className='mt-[200px]'><Spinner/></div>) : (

       <div className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl p-3 mx-auto  min-h[80vh] justify-center mb-[40px] '>
             {
              totalCars.map(car=>{
                if(car){
                return <div className=' border border-slate-200 ml-[10px] mr-[10px] mt-[20px] p-[15px] rounded-lg' key={car._id}>
                      <div>
                        <img src={car.image} alt='not found' className='w-[350px] mb-[10px]  border rounded-md'/>

                        <div className=''>
                          <div>
                            <p className='text-lg text-slate-700 font-semibold '>{car.name}</p>
                            <p className='mb-[10px] text-[15px] text-slate-600 font-semibold'>Rent: <span className='text-[13px]'>{car.rentPerHour} Per Hour</span></p>
                          </div>
                          <div className='flex justify-between'>

                           <Link to={`/editcar/${car._id}`} >
                           <EditOutlined style = {{color:'green', cursor:'pointer'}} className='text-lg hover:bg-slate-200 rounded-sm'/>
                           </Link>

                           <Popconfirm
                               title="Are you sure to delete this car?"
                               onConfirm={() => {dispatch(deletecar(car._id))}}

                               okText="Yes"
                               cancelText="No"
                           >

                            <DeleteOutlined style = {{color:'red', cursor:'pointer'}} className='text-lg hover:bg-red-100 rounded-sm'/>
                           </Popconfirm>
                            
                            
                          </div>
                        </div>
                      </div>
                </div>
              }})
             }
       </div>)}
       </div>
    </Layout>
    
    </div>
  )
}
