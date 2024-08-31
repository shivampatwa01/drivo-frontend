//import logo from './logo.svg';
import './App.css';
import {Route, Routes, Navigate, BrowserRouter} from 'react-router-dom'
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Booking } from './pages/Booking';
import AddCar from './pages/AddCar';
import { AdminHome } from './pages/AdminHome';
import EditCar from './pages/EditCar';
import { UserBookings } from './pages/UserBookings';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      </Routes>

      <ProtectedRoute path='/' element={<Home/>} />
      <ProtectedRoute path='/booking/:carid' element={ <Booking/> } />
      <ProtectedRoute path='/userbookings' element={ <UserBookings/> } />
      <ProtectedRoute path='/addcar' element={ <AddCar/> } />
      <ProtectedRoute path='/editcar/:carid' element={ <EditCar/> } />
      <ProtectedRoute path='/admincontroll/66d194d72405416f38c6c37b' element={ <AdminHome/> } />
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ element, ...rest }){

  if(localStorage.getItem('user')){
    return <Routes><Route {...rest} element={element} /></Routes>
  }
  else{
     return <Navigate replace to='/login'/>
  }
}
