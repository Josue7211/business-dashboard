import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from "firebase/firestore";
import { Header } from '../components'
import { db } from '../Firebase'

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
          <nav className="flex border-b border-gray text-sm font-medium m-8">
            <a href="" className="-mb-px border-b border-current p-4 text-cyan-500">
              Details
            </a>
            <a href="" className="-mb-px border-b border-transparent p-4 hover:text-cyan-500">
              Invoices
            </a>
            <a href="" className="-mb-px border-b border-transparent p-4 hover:text-cyan-500">
              Logs
            </a>
          </nav>
        <div className='justify-center rounded-xl m-8 border-gray border'>
          <div className='overflow-x-auto'>
            <table className='table-auto w-full'>
              <thead className='border-b-1'>
                <tr>
                  <th className='p-4 text-2xl font-bold text-left'>Personal</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b-1'>
                  <td className='p-3 w-1/3'>First Name</td>
                  <td className='p-3'>{clientDetails.firstName ? clientDetails.firstName :  <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Last Name</td>
                  <td className='p-3'>{clientDetails.lastName ? clientDetails.lastName: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Date of Birth</td>
                  <td className='p-3'>{clientDetails.dateOfBirth ? clientDetails.dateOfBirth: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Religion</td>
                  <td className='p-3'>{clientDetails.religion ? clientDetails.religion: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Civil Status</td>
                  <td className='p-3'>{clientDetails.civilStatus ? clientDetails.civilStatus: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Weight</td>
                  <td className='p-3'>{clientDetails.weight ? clientDetails.weight: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Height</td>
                  <td className='p-3'>{clientDetails.height ? clientDetails.height: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Eye Color</td>
                  <td className='p-3'>{clientDetails.eyeColor ? clientDetails.eyeColor: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr>
                  <td className='p-3'>Hair Color</td>
                  <td className='p-3'>{clientDetails.hairColor ? clientDetails.hairColor: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
              </tbody>
            </table>
          </div>
      </div>

      <div className='justify-center rounded-xl m-8 border-gray border'>
          <div className='overflow-x-auto'>
            <table className='table-auto w-full'>
              <thead className='border-b-1'>
                <tr>
                  <th className='p-4 text-2xl font-bold text-left'>Contact</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b-1'>
                  <td className='p-3 w-1/3'>Email</td>
                  <td className='p-3'>{clientDetails.email ? clientDetails.email: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Phone Number</td>
                  <td className='p-3'>{clientDetails.phone ? clientDetails.phone: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Address</td>
                  <td className='p-3'>{clientDetails.streetAddress ? clientDetails.streetAddress: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>City</td>
                  <td className='p-3'>{clientDetails.city ? clientDetails.city: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Zipcode</td>
                  <td className='p-3'>{clientDetails.zipCode ? clientDetails.zipCode: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>State/Region</td>
                  <td className='p-3'>{clientDetails.state ? clientDetails.state: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr>
                  <td className='p-3'>Country</td>
                  <td className='p-3'>{clientDetails.country ? clientDetails.country: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
              </tbody>
            </table>
          </div>
      </div>

      <div className='justify-center rounded-xl m-8 border-gray border'>
          <div className='overflow-x-auto'>
            <table className='table-auto w-full'>
              <thead className='border-b-1'>
                <tr>
                  <th className='p-4 text-2xl font-bold text-left'>Immigration</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b-1'>
                  <td className='p-3 w-1/3'>Alien Number</td>
                  <td className='p-3'>{clientDetails.alienNumber ? clientDetails.alienNumber: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Visa Number</td>
                  <td className='p-3'>{clientDetails.visaNumber ? clientDetails.visaNumber: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>I-94</td>
                  <td className='p-3'>{clientDetails.i94Number ? clientDetails.i94Number: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Date of Arrival</td>
                  <td className='p-3'>{clientDetails.dateOfArrival ? clientDetails.dateOfArrival: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Immigration Status</td>
                  <td className='p-3'>{clientDetails.currentImmigrationStatus ? clientDetails.currentImmigrationStatus: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>Status on Arrival</td>
                  <td className='p-3'>{clientDetails.immigrationStatusOnArrival ? clientDetails.immigrationStatusOnArrival: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr className='border-b-1'>
                  <td className='p-3'>USCIS Login</td>
                  <td className='p-3'>{clientDetails.uscisLogin ? clientDetails.uscisLogin: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
                <tr>
                  <td className='p-3'>USCIS Password</td>
                  <td className='p-3'>{clientDetails.uscisPass ? clientDetails.uscisPass: <span className="text-red-500">NO DATA</span>}</td> 
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}

export default ClientDetails;
