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
          {/* Public Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Protected Routes */}
          <Route path='/' element={<ProtectedRoute element={<Home />} />} />
          <Route path='/booking/:carid' element={<ProtectedRoute element={<Booking />} />} />
          <Route path='/userbookings' element={<ProtectedRoute element={<UserBookings />} />} />
          <Route path='/addcar' element={<ProtectedRoute element={<AddCar />} />} />
          <Route path='/editcar/:carid' element={<ProtectedRoute element={<EditCar />} />} />
          <Route path='/admincontroll/66d194d72405416f38c6c37b' element={<ProtectedRoute element={<AdminHome />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ element }) {
  if (localStorage.getItem('user')) {
    return element;  
  } else {
    return <Navigate replace to='/login' />;
  }
}
