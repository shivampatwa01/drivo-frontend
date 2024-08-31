import React, { useEffect, useState } from "react";
import { Layout } from '../components/Layout'
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from '../redux/thunks/bookingThunk';
import { Spinner } from '../components/Spinner'
import { DateTime } from "luxon";
import { Modal } from "antd";


export const UserBookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings.bookings);
  const loading = useSelector(state => state.bookings.loading);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <Layout>
      <div className='flex flex-wrap items-center justify-center w-full'>
        {loading ? (<div className="mt-[200px]"><Spinner></Spinner></div>) : (
          <div className="w-full">
        
      <h3 className="mt-[20px] mb-[30px] maincol">My Bookings</h3>
    
      <div className="w-full">
      <div className="w-full">
         
            {bookings.filter(o=>o.user===user._id).map((booking) => {
             return <div className="flex flex-wrap items-center justify-center mb-[25px] w-full border border-slate-400 " key={booking._id}>
                <div className="text-left w-[160px] mb-[8px] mr-[2px] ">
                    <p><b>{booking.car.name}</b></p>
                    <p>Total hours : <b>{booking.totalHours}</b></p>
                    <p>Rent per hour : <b>{booking.car.rentPerHour}</b></p>
                    <p>Total amount : <b>{booking.totalAmount}</b></p>
                </div>
                
                <div className="border border-slate-400 small-screen"></div>

                <div className="text-left w-[280px] mr-[3px]">
                <p>Transaction Id : <b>{booking.transactionId}</b></p>
                <p>From: <b>{booking.bookedTimeSlots.from}</b></p>
                <p>To: <b>{booking.bookedTimeSlots.to}</b></p>
                <p>Date of booking: <b>{DateTime.fromISO(booking.createdAt).toFormat('MMM dd yyyy')}</b></p>
                </div>
                

                <div>
                    <img src={booking.car.image} alt="" className="w-[230px] h-[150px] mt-[3px] mb-[3px] rounded-md"/>
                </div>

                <button onClick={() => {setShowModal(true);
                                        setName(booking.name);
                                        setAddress(booking.address);
                                        setEmail(booking.email);
                                        setContact(booking.contact);
                }}  className="button-gradient w-[100px] h-[30px] mt-[10px] mb-[10px] ml-[15px] text-white rounded-md hover:text-black" >Details</button>

              </div>;
            })}
          
          </div>
       


        <Modal
              open={showModal}
              closable={false}
              footer={false}
              
            >    
            <div className='flex flex-col justify-center items-center'>
              <div className='text-[30px] maincol mb-[10px]'>Your Details</div>

              <div className="text-left">
                <p>Name: <b>{name}</b></p>
                <p>Address: <b>{address}</b></p>
                <p>Email: <b>{email}</b></p>
                <p>contact: <b>{contact}</b></p>
                </div>
                
                <button
                    onClick={() => setShowModal(false)}
                    className="button-gradient w-[100px] h-[30px] mt-[10px] text-white rounded-md hover:text-black"
                  >
                    Close
                  </button>
                  
                </div>
            </Modal>

            </div>


        </div>)}
        </div> 
    </Layout>
  );
}
