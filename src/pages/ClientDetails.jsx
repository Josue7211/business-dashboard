import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from "firebase/firestore";
import { Header } from '../components'
import { db } from '../Firebase'
import { useFirebaseContext } from '../contexts/FirebaseContextProvider';

const ClientDetails = () => {
  const { clientId } = useParams(); // Rename the id parameter to clientId

  const clientDocRef = doc(db, "clients", clientId);
  
  const [clientDetails, setClientDetails] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(clientDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setClientDetails(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }, (error) => {
      console.log("Error getting document:", error);
    });
    return unsubscribe;
  }, [db, clientId]);

  return (
    <div className='m-2 md:m-10 p-6 md:p-10 bg-white rounded-3xl'>
      <Header category='Page' title ='Client Details'/>
        <div className='justify-center rounded-xl m-8 border-gray border'>
          <div>
            <table>
              <thead className='border-b-1'>
                <tr>
                  <th className='p-4 text-2xl font-bold text-left'>Personal</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b-1'>
                  <td className='p-3 w-[600px]'>First Name</td>
                  <td className='p-3 w-[600px]'>{clientDetails.firstName ? clientDetails.firstName :  <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3 w-[600px]'>Last Name</td>
                  <td className='p-3 w-[600px]'>{clientDetails.lastName ? clientDetails.lastName: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3 w-[600px]'>Email</td>
                  <td className='p-3 w-[600px]'>{clientDetails.email ? clientDetails.email: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3 w-[600px]'>Phone Number</td>
                  <td className='p-3 w-[600px]'>{clientDetails.phone ? clientDetails.phone: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3 mr-4 w-[600px]'>Address</td>
                  <td className='p-3 w-[600px]'>{clientDetails.streetAddress ? clientDetails.streetAddress: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3 w-[600px]'>City</td>
                  <td className='p-3 w-[600px]'>{clientDetails.city ? clientDetails.city: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr>
                  <td className='p-3 w-[600px]'>Zipcode</td>
                  <td className='p-3 w-[600px]'>{clientDetails.zipCode ? clientDetails.zipCode: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}

export default ClientDetails;
