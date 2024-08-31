import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllcars } from '../redux/thunks/carThunk'
import { Spinner } from '../components/Spinner'
import { Link } from 'react-router-dom'
import { DatePicker } from 'antd'
import { TypeAnimation } from 'react-type-animation';
import { DateTime } from 'luxon';
import toast, { Toaster } from 'react-hot-toast'

const {RangePicker} = DatePicker

export const Home = () => {
  const cars = useSelector(state => state.cars.cars);
  const loading = useSelector(state => state.cars.loading);
    const [totalCars, setTotalCars] = useState([])
    const [error, setError] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
         dispatch(getAllcars())
    }, [dispatch])

    useEffect(() => {
      
       setTotalCars(cars)

    }, [cars, totalCars])

    function disableDateBeforeToday(current) {
      // Disable dates before today
      return current && current < DateTime.local().startOf('day').toJSDate();
  }
  


function setFilter(values) {

  setError(null)

  // Validate the input values
  if (!values || values.length !== 2 || !values[0] || !values[1]) {
      console.error('Invalid date values:', values);
      return;
  }

  // Convert moment objects to Luxon DateTime objects
  const selectedFrom = DateTime.fromJSDate(values[0].toDate(), { zone: 'local' });
  const selectedTo = DateTime.fromJSDate(values[1].toDate(), { zone: 'local' });

  // Validate parsed dates
  if (!selectedFrom.isValid || !selectedTo.isValid) {
      console.error('Invalid date format:', values);
      return;
  }

  console.log('Selected From:', selectedFrom.toString());
  console.log('Selected To:', selectedTo.toString());

  const temp = [];

  for (const car of totalCars) {
      if (car.bookedTimeSlots.length === 0) {
          temp.push(car);
      } else {
          let isAvailable = true;

          for (const booking of car.bookedTimeSlots) {
              const bookingFrom = DateTime.fromISO(booking.from);
              const bookingTo = DateTime.fromISO(booking.to);

              if (selectedFrom <= bookingTo && selectedTo >= bookingFrom) {
                  // The selected range overlaps with the booking range
                  isAvailable = false;
                  break;
              }
          }

          if (isAvailable) {
              temp.push(car);
          }
      }
  }

  setTotalCars(temp);

  if (temp.length === 0) {
    setError('No cars available for the selected dates')
    toast.error(error);
}
}





  return (
    <div className='bg-slate-50'>  
    <Layout>
      <Toaster></Toaster>
       <div>
      <div className='home-bg h-[70vh] w-full bg-slate-400 nav-shadow flex flex-wrap flex-col justify-center items-start'>
        <div className='bg-col w-[470px] max-sm:w-[320px] min-h-[170px] mt-[-70px] p-[3px] ml-[10%] mr-[10%] rounded-md'>
      <div className='text-[42px] max-sm:text-[30px] font-semibold maincolquote ws-[450px] mb-[3px]'>Expect More, Pay Less</div>
      <div className='w-full border border-slate-400 mb-[5px]'></div>
      <div className='mb-[10px] seq-col font-semibold'>
        <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        '',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Experience the road like never before with our premium car hire services.',
        1000
        
        
      ]}
      wrapper="div"
      speed={60}
      repeat={0}
      className='text-[1.9em] inline-left max-sm:text-[1.5em]'
    /></div>
    <div className='button-gradient h-[40px] ml-[34%] w-[140px] mb-[10px] flex items-center justify-center rounded-md hover:rounded-xl '> <a className='text-white text-[20px] hover:text-white ' href='#cars'>See Cars</a></div>
    </div>
    </div>
      </div>

      <div className='mrl-[31%] mll-[32%] '>
        <div id='cars' className='border w-full h-[110px] pt-[20px] pb-[10px] border-slate-400 rounded-md  check-shadow'>
          <div className='p-[3px] mb-[7px] font-semibold text-[18px] maincol'>Check Avaliability</div>
          <RangePicker showTime={{format: 'HH:mm'}}
                      format='MMM DD YYYY HH:mm'
                       onChange={setFilter}
                       disabledDate={disableDateBeforeToday}
                   className='wh-[30%]'/>

        </div>
      </div>
      <div className='flex items-center justify-center'>

        {loading === true ? (<div className='mt-[200px] mb-[200px]'><Spinner> </Spinner></div>) :(
        
       <div  className='grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-5xl p-3 mx-auto  min-h[80vh] justify-center mb-[30px] bord rounded-lg'>
             {
              totalCars.map(car=>{
                return <div className='border border-slate-200 ml-[10px] mr-[10px] mt-[20px] mb-[10px] p-[15px] rounded-lg hover:scale-110 transition duration-300 ease-in gap-3' key={car._id}>
                      <div>
                        <img src={car.image} alt='' className='w-[350px] mb-[10px]  border rounded-md' />

                        <div className=''>
                          <div>
                            <p className='text-lg text-slate-700 font-semibold '>{car.name}</p>
                            <p className='mb-[10px] text-[15px] text-slate-600 font-semibold'>Rent: <span className='text-[13px]'>{car.rentPerHour} Per Hour</span></p>
                          </div>
                          <div>
                            <button className='button-gradient h-[30px] w-[98%] rounded-lg hover:w-[100%]'><Link to={`/booking/${car._id}`}> <div className='text-white'>Book Now</div></Link></button>
                          </div>
                        </div>
                      </div>
                </div>
              })
             }
       </div>)}
       </div>
       <div className='h-[330px] '>
        <div className='min-h-[70px] text-[20px] font-semibold border border-slate-200 rounded-lg p-[3px]'>
        <address>
          Madan Mohan Malaviya University of Technology <br/>
          Gorakhpur, UttarPradesh, 273010
        </address></div>
        <div className='max-h-[260px] w-full border'>
        <iframe title='i' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.4054633525316!2d83.43055267401112!3d26.73143426786014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39915ca3e2aa136b%3A0xc039bdf0211338a9!2sMadan%20Mohan%20Malaviya%20University%20Of%20Technology!5e0!3m2!1sen!2sin!4v1724009141607!5m2!1sen!2sin" width="100%" height="260px"  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
       </div>
        <div className='h-[40px]'>
       <footer className='min-h-[40px] text-[16px] sm:text-[12px] bg-slate-400 flex items-center justify-center font-semibold'> Copyright &copy;: ShivamPatwa</footer></div>
    </Layout>
    
    </div>
  )
}
