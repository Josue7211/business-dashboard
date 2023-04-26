import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from "firebase/firestore";
import { Header } from '../components'
import { db } from '../Firebase'
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Grid, Sort } from '@syncfusion/ej2-react-grids'

const CaseDetails = () => {
  const { caseId } = useParams(); // Rename the id parameter to clientId

  const caseDocRef = doc(db, "cases", caseId);

  const [caseDetails, setCaseDetails] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(caseDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setCaseDetails(docSnap.data());
      } else {
        console.log("No such document!");
      }
    }, (error) => {
      console.log("Error getting document:", error);
    });
    return unsubscribe;
  }, [db, caseId]);

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category='Page' title ='Case Details'/>
        <div className='justify-center flex'>
          <div className='justify-center rounded-xl m-8 border-gray border w-1/2'>
            <div className='overflow-x-auto'>
              <table className='table-auto w-full'>
                <thead className='border-b-1'>
                  <tr>
                    <th className='p-4 text-2xl font-bold text-left'>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b-1'>
                    <td className='p-3 w-1/3'>Case Type</td>
                    <td className='p-3'>{caseDetails.caseType ? caseDetails.caseType :  <span className="text-red-500">NO DATA</span>}</td> 
                  </tr>
                  <tr className='border-b-1'>
                    <td className='p-3'>Form Code</td>
                    <td className='p-3'>{caseDetails.caseFormCode ? caseDetails.caseFormCode: <span className="text-red-500">NO DATA</span>}</td> 
                  </tr>
                  <tr className='border-b-1'>
                    <td className='p-3'>Date Filed</td>
                    <td className='p-3'>{caseDetails.dateFiled ? caseDetails.dateFiled: <span className="text-red-500">NO DATA</span>}</td> 
                  </tr>
                  <tr className='border-b-1'>
                    <td className='p-3'>Primary Filer</td>
                    <td className='p-3'>{caseDetails.primaryFiler ? caseDetails.primaryFiler: <span className="text-red-500">NO DATA</span>}</td> 
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='justify-center rounded-xl m-8 border-gray border w-1/2'>
            <div className='overflow-x-auto'>
              <table className='table-auto w-full'>
                <thead className='border-b-1'>
                  <tr>
                    <th className='p-4 text-2xl font-bold text-left'>Members</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='border-b-1'>
                    <td className='p-3'>{<span className="text-red-500">MEMBER</span>}</td> 
                  </tr>
                  <tr className='border-b-1'>
                    <td className='p-3'>{<span className="text-red-500">MEMBER</span>}</td>  
                  </tr>
                  <tr className='border-b-1'>
                    <td className='p-3'>{<span className="text-red-500">MEMBER</span>}</td> 
                  </tr>
                  <tr className='border-b-1'>
                    <td className='p-3'>{<span className="text-red-500">MEMBER</span>}</td> 
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
}

export default CaseDetails;
