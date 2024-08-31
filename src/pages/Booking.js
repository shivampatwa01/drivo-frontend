import { DatePicker, Checkbox, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllcars } from '../redux/thunks/carThunk';
import { bookCar } from '../redux/thunks/bookingThunk';
import { Spinner } from '../components/Spinner.js';
import { Layout } from '../components/Layout.js';
import { useNavigate, useParams } from 'react-router-dom';
//import axios from 'axios';
import { DateTime } from 'luxon';


const { RangePicker } = DatePicker;

export const Booking = () => {
    const cars = useSelector(state => state.cars.cars);
  const loading = useSelector(state => state.bookings.loading);
  const [car, setCar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalPayment, setShowModalPayment] = useState(false);
   
  const [check, setCheck] = useState(false);
  const [yourname, setName] = useState('');
  const [youraddress, setAddress] = useState('');
  const [youremail, setEmail] = useState('');
  const [yourcontact, setContact] = useState('');
  const navigate = useNavigate();
  

  let { carid } = useParams();

  const isFormValid = yourname && youraddress && youremail && yourcontact;


  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllcars());
    } else {
      setCar(cars.find((o) => o._id === carid));
    }
  }, [cars, carid, dispatch]);

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 50 * totalHours);
    }
  }, [driver, totalHours, car.rentPerHour]);

  // function selectTimeSlots(values) {
  //   setFrom(moment(values[0]).format("MMM DD YYYY HH:mm"));
  //   setTo(moment(values[1]).format("MMM DD YYYY HH:mm"));
  //   setTotalHours(values[1].diff(values[0], "hours"));
  // }


function disableDateBeforeToday(current) {
    // Disable dates before today
    return current && current < DateTime.local().startOf('day').toJSDate();
}


  function selectTimeSlots(values) {
    if (values && values.length === 2) {
        // Convert to Luxon DateTime objects
        const from = DateTime.fromJSDate(values[0].toDate());
        const to = DateTime.fromJSDate(values[1].toDate());

        // Format dates
        const formattedFrom = from.toFormat("MMM dd yyyy HH:mm");
        const formattedTo = to.toFormat("MMM dd yyyy HH:mm");

        // Calculate total hours and round down to the nearest whole number
        const totalHours = Math.floor(to.diff(from, 'hours').hours);

        setFrom(formattedFrom);
        setTo(formattedTo);
        setTotalHours(totalHours);

    } else {
        console.error("Invalid values passed to selectTimeSlots:", values);
    }
}

console.log(JSON.parse(localStorage.getItem("user"))._id);

  function onPaymentSuccess(response) {
    const reqObj = {
      paymentId: response.razorpay_payment_id,
      car: car,
      user: JSON.parse(localStorage.getItem("user"))._id,
      bookedTimeSlots: {
        from,
        to
      },
      totalHours,
      totalAmount,
      name: yourname,
      address: youraddress,
      email: youremail,
      contact: yourcontact,
      transactionId: response.razorpay_payment_id,
      driverRequired: driver,
      
    };

    dispatch(bookCar(reqObj));
    setCheck(true);

  }
  if(check){
    setTimeout(() => {
        navigate('/');
      }, 2800); 
    }

  const initiatePayment = async () => {
   
    try {
  
      //Request to create an order from your backend using axios
      // const response = await axios.post('http://localhost:4000/api/bookings/createOrder', {amount : totalAmount});
      
      //  const data = response.data;

      const response = await fetch('https://drivo.onrender.com/api/bookings/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      const options = {
        key: 'rzp_test_8EtWJTXuU2CFNF',
        amount: data.amount, // Amount in paise
        currency: 'INR',
        name: 'Drivo',
        description: 'Car Booking Payment',
        handler: onPaymentSuccess,
        prefill: {
          name: JSON.parse(localStorage.getItem("user")).name,
          email: youremail,
          contact: yourcontact,
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error creating order:', error);
    }
    setShowModalPayment(false);

  };


  return (
    <div className='bg-slate-100 '>
    <Layout className=''>
      <div className='flex items-center justify-center w-full'>
        {loading ? (<div className='mt-[200px]'><Spinner /></div>) : (
        <div className='w-full'>
          <div className='mt-[40px] flex flex-wrap items-center justify-center border border-slate-300 w-full'>
            <img src={car.image} alt='' className='h-[300px] w-[400px]  rounded-lg'/>
            <div>


            <div className='flex flex-col items-center mt-[20px] mb-[20px] ml-[20px] border border-slate-200 rounded-lg'>
            <div className=' text-[20px] font-bold'>Car Info</div>
            <div className='text-left'>
              <p className='text-lg mb-[px] text-slate-700 maincol font-semibold'>{car.name}</p>
              <p className='mb-[-10px] text-[15px] text-slate-700 font-semibold'>Rent: <span className='text-[13px] maincol'>{car.rentPerHour} Per Hour</span></p>
              <p className='mb-[-10px] text-[15px] text-slate-700 font-semibold'>Fuel : <span className='text-[13px] maincol'>{car.fuelType}</span></p>
              <p className='text-[15px] text-slate-700 font-semibold'>max Persons : <span className='text-[13px] maincol'>{car.capacity}</span></p>
              
            </div>
            </div>


            <div className='flex flex-col items-center mt-[20px] mb-[20px] ml-[20px] border border-slate-200 rounded-lg'>
            <div>
              <div className='text-[20px] font-bold text-slate-700 mb-[8px]'>Select time slots</div>
              
              <RangePicker showTime={{format: 'HH:mm'}}
                        format='MMM DD YYYY HH:mm'
                          onChange={selectTimeSlots}
                          disabledDate={disableDateBeforeToday}
                          className='w-[300px] mb-[10px]'
                          />
                         
                          
            </div>

             <button onClick={() => {setShowModal(true)}} className='button-gradient h-[30px] w-[150px] text-white rounded-lg hover:w-[153px] mb-[8px]'>See Booked Slots</button>

            {from && to && (
              <div>
              <p className='mb-[-6px]'>Total Hours : <b className='maincol'>{totalHours}</b></p>
              <p>Rent per Hour : <b className='maincol'>{car.rentPerHour}</b></p>
              <Checkbox onChange={(e) => {
                if(e.target.checked){
                  setDriver(true);
                }
                else{
                  setDriver(false);
                }
              }}>Driver Required cost <span className='maincol'>50/hr</span></Checkbox>

              <h3>Total Amount : {totalAmount}</h3>
              <button onClick={() => setShowModalPayment(true)} className='button-gradient h-[30px] w-[98%] hover:w-[100%] rounded-lg mt-[20px]'>Book Now</button>
            </div>
            )}
           
           </div>
          </div>
          </div>
          
          {car.name && (
            <Modal open={showModal} closable={false} footer={false}>
              <div className='flex flex-col justify-center items-center'>
              <div className='text-[30px] maincol mb-[10px]'> Booked Time Slots</div>
            
            {cars.length && (<div>
              
              {car.bookedTimeSlots.map(slot =>{
                return <div className='mb-[8px] text-[15px]'>{slot.from} - {slot.to}</div>
              })}
  
              <button onClick={()=> {setShowModal(false)}}
                className="button-gradient w-[100px] h-[30px] mt-[10px] ml-[13%] text-white rounded-md hover:text-black"
                >Close</button>
  
            </div>
          )}
          </div>
        </Modal>
          )}


<Modal
              open={showModalPayment}
              closable={false}
              footer={false}
              
            >    
            <div className='flex flex-col justify-center items-center'>
              <div className='text-[30px] maincol mb-[10px]'>Fill Your Details</div>
                <div className=' w-full'>
                <input required
                    placeholder="Name"
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    className='h-[30px] w-full border border-slate-300 rounded-md p-[3px] pl-[6px] mb-[10px]'
                ></input>
                </div>
                <div className='w-full'>
                 <input required
                    placeholder="Address"
                    name='address'
                    onChange={(e) => setAddress(e.target.value)}
                    className='h-[30px] w-full border border-slate-300 rounded-md p-[3px] pl-[6px] mb-[10px]'
                ></input></div>
                <div className='w-full'>
                <input required
                    placeholder="Email Id"
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    className='h-[30px] w-full border border-slate-300 rounded-md p-[3px] pl-[6px] mb-[10px]'
                ></input></div>
                <div className='w-full'>
                <input required
                    placeholder="Contact"
                    name='contact'
                    onChange={(e) => setContact(e.target.value)}
                    className='h-[30px] w-full border border-slate-300 rounded-md p-[3px] pl-[6px] mb-[10px]'
                ></input></div>
                <div className='flex gap-[18vw] '>
                <button
                    onClick={() => setShowModalPayment(false)}
                    className="button-gradient w-[100px] h-[30px] mt-[10px] text-white rounded-md hover:text-black"
                  >
                    Close
                  </button>
                  <button
                    onClick={initiatePayment}
                    className="button-gradient w-[100px] h-[30px] mt-[10px] text-white rounded-md hover:text-black"
                     disabled={!isFormValid}
                     
                  >
                    Pay Now
                  </button>
                  
                  </div>
                </div>
            </Modal>

        </div> )}
        
          
        </div>
    </Layout>
    </div>
  )
}
