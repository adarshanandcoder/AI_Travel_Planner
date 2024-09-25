import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({hotel}) {
    const[photoUrl,setPhotoUrl] = useState();
    useEffect(()=>{
        hotel&&GetPlacePhoto();
    },[hotel])
    const GetPlacePhoto=async()=>{
        const data={
            textQuery:hotel?.hotel_name
        }
        const result = await GetPlaceDetails(data).then((resp)=>{
            console.log(resp);
            const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name);
            setPhotoUrl(PhotoUrl);
        })
    }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotel_name+" "+hotel?.hotel_address} target='_blank'>
            <div className='hover:scale-110 transition-all cursor-pointer'>
              <img className='rounded-xl h-[180px] w-full object-cover' src={photoUrl} />
              <div className='my-3 flex flex-col gap-1'>
                <h2 className='font-medium'>{hotel?.hotel_name}</h2>
                <h2 className='text-xs text-gray-500'>🌍 {hotel?.hotel_address}</h2>
                <h2 className='text-sm'>💸 {hotel?.price}</h2>
                <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
              </div>
            </div>
            </Link>
  )
}

export default HotelCardItem