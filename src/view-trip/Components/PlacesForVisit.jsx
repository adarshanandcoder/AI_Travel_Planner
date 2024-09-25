import React from 'react'
import PlaceCardItem from './PlaceCardItem'

function PlacesForVisit({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Places to Explore</h2>

        <div>
            {trip?.tripData?.itinerary.map((item,index)=>(
                <div className='mt-5'>
                    <h2 className='font-bold text-xl mt-2'>Day {item?.day}</h2>
                    <div className='grid md:grid-cols-2 gap-5'>
                    {item.plan.map((place,index)=>(
                        <div className=''>
                            <h2 className='font-medium text-sm text-red-400'>Time : {place?.time}</h2>
                            <PlaceCardItem place={place} />
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesForVisit