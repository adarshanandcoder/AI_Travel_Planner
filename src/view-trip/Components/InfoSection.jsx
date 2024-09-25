import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { IoIosShareAlt } from "react-icons/io";

function InfoSection({trip}) {

  const [photoUrl, setPhotoUrl] = useState();
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])  
  
  const GetPlacePhoto=async()=>{

    const data = {
      textQuery:trip?.userSelection?.location?.label
    }

    const result = await GetPlaceDetails(data).then(resp=>{
      // console.log(resp.data.places[0].photos[3].name)

      const PhotoUrl= PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl)
    })
  }

  return (
    <div>
        <img className='w-full h-[340px] object-cover rounded-xl' src={photoUrl}/>
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl '>{trip?.userSelection?.location?.label}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-800 rounded-lg text-white text-xs md:text-md'>⌛ {trip?.userSelection?.noOfDays} Day</h2>
                    <h2 className='p-1 px-3 bg-gray-800 rounded-lg text-white text-xs md:text-md'>🪙 {trip?.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-800 rounded-lg text-white text-xs md:text-md'>🍾 No. of Traveller : {trip?.userSelection?.people}</h2>
                </div>
            </div>
            <Button><IoIosShareAlt /></Button>
        </div>
        
    </div>
  )
}

export default InfoSection