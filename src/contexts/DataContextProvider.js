import React, { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../Firebase';
import { collection, onSnapshot} from "firebase/firestore";

const DataContext = createContext()

export const DataContextProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([])
    const [team, setTeam] = useState([])
    const [clients, setClients] = useState([])
    const [profilePic, setProfilePic] = useState('')

    const invoicesCollectionRef = collection(db, "invoices");
    const clientsCollectionRef = collection(db, "clients");
    const teamCollectionRef = collection(db, "team");

    useEffect(() => {
      const unsubscribe = onSnapshot(invoicesCollectionRef, (snapshot) => {
        const updatedInvoices = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setInvoices(updatedInvoices);
      });
      return unsubscribe; // This function will be called when the component unmounts to stop listening to the snapshot
    }, []);
      
    useEffect(() => {
      const unsubscribe = onSnapshot(clientsCollectionRef, (snapshot) => {
        const updatedClients = snapshot.docs.map((doc) => ({...doc.data(),id: doc.id,}));
        setClients(updatedClients);
      });
      return unsubscribe; 
    }, []);
  
    useEffect(() => {
      const unsubscribe = onSnapshot(teamCollectionRef, (snapshot) => {
        const updatedTeam = snapshot.docs.map((doc) => ({...doc.data(),id: doc.id,}));
        setTeam(updatedTeam);
      });
      return unsubscribe; 
    }, []);

    useEffect(() => {
      // Retrieve the profilePic value from local storage
      const storedProfilePic = localStorage.getItem('profilePic');
      if (storedProfilePic) {
        setProfilePic(storedProfilePic);
      }
    }, []);

    return (
        <DataContext.Provider 
            value={{ 
                invoices,
                setInvoices,
                team,
                setTeam,
                clients,
                setClients,
                profilePic,
                setProfilePic,    
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext)
