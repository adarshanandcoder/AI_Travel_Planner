import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../Components/InfoSection';
import Hotels from '../Components/Hotels';
import PlacesForVisit from '../Components/PlacesForVisit';
import Footer from '../Components/Footer';

function ViewTrip() {

    const {tripId} = useParams();
    const [trip,setTrip] = useState([]);

    useEffect(() => {
        tripId&&getTripData();
    } ,[tripId])

    const getTripData = async() =>{
        const docRef=doc(db,'AITravelPlans',tripId);
        const docSnap=await getDoc(docRef)

        if(docSnap.exists()){
            console.log("Document" , docSnap.data());
            setTrip(docSnap.data())
        }
        else{
            console.log("No Such Document");
            toast('No Trip Found!')
        }
    }

  return (
    <div className='p-10 md:px-26 lg:px-44 xl:px-56'>
        {/* Information Section */}
        <InfoSection trip={trip}/>
        {/* Recommended Hotels */}
        <Hotels trip={trip} />
        {/* Daily Plan  */}
        <PlacesForVisit trip={trip} />
        {/* Footer  */}
        <Footer/>
    </div>
  )
}

export default ViewTrip