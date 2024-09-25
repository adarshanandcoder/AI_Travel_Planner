import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocation } from "react-icons/fa6";
import { Link } from 'react-router-dom';

function PlaceCardItem({place}) {
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place&&GetPlacePhoto();
  },[place])

  const GetPlacePhoto = async() =>{
    const data ={
      textQuery:place?.place_name
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name);
            setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.place_name} target='_blank'>
        <div className='border rounded-xl p-3 mt-3 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <img src={photoUrl?photoUrl:'/Background.jpg'} className='h-[130px] w-[130px] rounded-xl' />
            <div>
                <h2 className='font-bold text-lg'>{place.place_name}</h2>
                <p className='text-sm text-gray-400 '>{place?.place_details}</p>
                <h2 className='mt-2'>🕖 {place?.time_to_travel}</h2>
                {/* <Button size="sm"><FaMapLocation/></Button> */}
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem