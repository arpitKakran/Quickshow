import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from'./pages/Movies'
import MovieDetails from "./pages/MovieDetails"
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favourite from './pages/Favourite'
import {Toaster} from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { useAppContext } from './context/app.context'
import { SignIn } from '@clerk/clerk-react'
import Loading from './components/Loading'

function App() {

  const isAdminRoute= useLocation().pathname.startsWith('/admin') //it will give only true and false value

  const {user}= useAppContext()

  return (
    <>
       <Toaster/> {/*to use notification on any components */}
      {!isAdminRoute && <Navbar/>} {/*if admin path then hide navbar else show it*/} 
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/movies/:id' element={<MovieDetails/>}/>{/* here we have passed /:id just to use it while accessing the id from params to make sure that id gets displayed here we will add on click function on the movie card image section */}
        <Route path='/movies/:id/:date' element={<SeatLayout/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/favourite' element={<Favourite/>}/>
        <Route path='/loading/:nextUrl' element={<Loading/>}/>
        
        <Route path='/admin/*' element={user? <Layout/> : (
          <div className=' min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'}/>
          </div>
        )}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-shows' element={<AddShows/>}/>
          <Route path='list-shows' element={<ListShows/>}/>
          <Route path='list-bookings' element={<ListBookings/>}/>
        </Route>
      
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  )
}

export default App
