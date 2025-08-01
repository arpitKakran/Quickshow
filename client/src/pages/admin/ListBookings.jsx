import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets'
import Loading from '../../components/Loading'
import { dateFormat } from '../../lib/dateFormat'

import Title from '../../components/admin/Title'
import { useAppContext } from '../../context/app.context'

const ListBookings = () => {

  const {axios,getToken,user}= useAppContext()


  const currency= import.meta.env.VITE_CURRENCY

  const [bookings,setBookings]= useState([])
  const[loading, setLoading]= useState(true)

  const getAllBookings = async ()=> {
    try {
        const {data}= await axios.get('/api/admin/all-bookings',{
          headers: { Authorization : `Bearer ${await getToken()}`}
      })
      setBookings(data.bookings)  

    } catch (error) {
      console.error(error)
      
    }
    setLoading(false)
  }

  useEffect(()=> {
    if(user) {

      getAllBookings()

    }
    
  },[user])

  return !loading ? (
    <>
      <Title text1="List" text2="Bookings"/>
      <div className='max-2-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium'>User Name</th>
              <th className='p-2 font-medium'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Seats</th>
              <th className='p-2 font-medium'>Amount</th>
          </tr>
          </thead>
          <tbody className='text-sm font-light'>
                      {bookings.map((item, index) => (
                        <tr key={index} className='border-b border-primary/10 bg-primary/5 even:bg-primary/10'>
                          <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>

                          <td className='p-2'>{item.show.movie.title}</td>

                          <td className='p-2'>{dateFormat(item.show.showDateTime)}</td>
                          
                          <td>{currency}{Object.keys(item.bookedSeats).map(seat=>item.bookedSeats[seat]).join(", ")}</td>

                          <td>{currency} {item.amount}</td>
                        </tr>
                      ))}
                    </tbody>
        </table>
      </div>
    </>
  ) : <Loading/>
}

export default ListBookings
