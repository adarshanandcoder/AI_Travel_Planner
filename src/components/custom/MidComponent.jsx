import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function MidComponent() {
  return (
    <div className='flex flex-col items-center mx-56 gap-10'>
        <div>
            <h1 className='font-extrabold text-[45px] text-center text-[#FF3333] mt-16'>Your AI Travel Companion:</h1>
            <h1 className='font-extrabold text-[45px] text-center mt-[0px]'>Plan Your Next Perfect Trip Effortlessly</h1>
        </div>
        <p className='text-xl text-gray-700 text-center'>Empowering Your Travel Experience: AI-Driven Itineraries Tailored for Unforgettable Adventures, Every Time You Explore.</p>
        <Link to={'/create-trip'}>
            <Button>Get Started ! It's Free</Button>
        </Link>
        
    </div>
  )
}

export default MidComponent