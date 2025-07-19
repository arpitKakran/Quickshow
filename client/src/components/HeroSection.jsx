import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {

    const navigate= useNavigate()

  return (
    <div className='flex flex-col items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url("background.png")] bg-cover bg-center h-screen'>
        <img src={assets.marvelLogo} alt='' className='max-h-11 lg:h-11 mt-20'/>
        <h1 className='text-4xl md:text-[65px] md:leading-18 font-semibold max-w-150'> Captain America</h1>
        <h2 className='text-3xl md:text-[50px] md:leading-18 font-semibold max-w-150'> Brave New World</h2>

        <div className='flex items-center gap-4 text-gray-300'>
            <span>Action | Adventure | Sci-Fi</span>
            <div className='flex items-center gap-1'>
                <CalendarIcon className='w-4 h-4.5'/>2025
            </div>
            <div className='flex items-center gap-1'>
                <ClockIcon className='w-4 h-4.5'/> 1h 58m
            </div>
        </div> 
         <p className='max-w-md text-gray-300'>In a world reshaped by chaos and control, a new Captain must rise to expose a buried threat and lead a fractured nation toward hope.</p>
            <button onClick={()=>navigate('/movies')} className='flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primar-dull transition rounded-full font-medium cursor-pointer'>
                Explore Movies
                <ArrowRight className='w-5 h-5'/>
            </button>
    </div>
  )
}

export default HeroSection
