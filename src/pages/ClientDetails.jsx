import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from "firebase/firestore";
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
    <div>
      <h1>{clientDetails.firstName}</h1>
      <p>{clientDetails.email}</p>
      <p>{clientDetails.phone}</p>
      {/* Render other client details here */}
    </div>
  );
}

export default ClientDetails;
