import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Dropdown from 'rsuite/Dropdown'; 
import 'rsuite/dist/rsuite.min.css'; 
import DetailIcon from '@rsuite/icons/Detail'; 
import FolderFillIcon from '@rsuite/icons/FolderFill'; 
import Admin from '@rsuite/icons/Admin';


export const Layout = (props) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();

  return (
    <div className='overflow-x-hidden'>
        <div className='header nav-col flex flex-wrap justify-between nav-shadow'>
            <h1>Drivo</h1>

           <div className='flex gap-8 mt-[15px]'>
           <NavLink to="/">
                  <p className='text-[15px] mt-[5px] font-semibold'>Home</p>  
            </NavLink>
            <NavLink to="/userbookings">
                  <p className='text-[15px] mt-[5px] font-semibold'>Booking</p>  
            </NavLink>
                
               <Dropdown title="Profile" className=''> 
          
                <Dropdown.Item icon={<FolderFillIcon />}>
                {user.username}  
                </Dropdown.Item>

                {user.username === 'admin' && (
              <Dropdown.Item icon={<Admin />} onClick={() => {
                setTimeout(() => {
                  navigate('/admincontroll/66d194d72405416f38c6c37b');
                }, 100); 
              }}>
                Admin
              </Dropdown.Item>
            )}
                <Dropdown.Item icon={<DetailIcon />} onClick={() =>{
                  localStorage.removeItem('user');
                  setTimeout(() => {
                    navigate('/login');
                  }, 200); 
                }} >
                  Log Out
    
                </Dropdown.Item>  

            </Dropdown>
            
            

             
           </div>

        </div>
        <div className='content'>
            {props.children}

        </div>

    </div>
)
}
