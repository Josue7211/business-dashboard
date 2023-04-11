import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../Firebase';
import { collection, getDocs, onSnapshot} from "firebase/firestore";

const StateContext = createContext()

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true)
    const [isClicked, setIsClicked] = useState(initialState)
    const [screenSize, setScreenSize] = useState(undefined)
    const [currentColor, setCurrentColor] = useState('#03C9D7')
    const [currentMode, setCurrentMode] = useState('Light')
    const [themeSettings, setThemeSettings] = useState(false)
    const [user, loading, error] = useAuthState(auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [invoices, setInvoices] = useState([])
    const [clients, setClients] = useState([])

    const invoicesCollectionRef = collection(db, "invoices");
    const clientsCollectionRef = collection(db, "clients");
    
    const setMode = (e) =>  {
        setCurrentMode(e.target.value)

        localStorage.setItem('themeMode', e.target.value)
        
        setThemeSettings(false)
    }

    const setColor = (color) =>  {
        setCurrentColor(color)

        localStorage.setItem('colorMode', color)

        setThemeSettings(false)
    }

    const handleClick = (clicked) => {
        setIsClicked(prevState => {
          return {
            ...initialState,
            [clicked]: !prevState[clicked]
          };
        });
      };

    const getInvoices = async () => {
      try {
        const data = await getDocs(invoicesCollectionRef);
          setInvoices(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
          console.log(data);
        } catch (error) {
          console.error(error);
        } finally {
        }
      };

    useEffect(() => {
      const unsubscribe = onSnapshot(invoicesCollectionRef, (snapshot) => {
        const updatedInvoices = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setInvoices(updatedInvoices);
      });
      return unsubscribe; // This function will be called when the component unmounts to stop listening to the snapshot
    }, []);
      
    useEffect(() => {
      const unsubscribe = onSnapshot(clientsCollectionRef, (snapshot) => {
        const updatedClients = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setClients(updatedClients);
      });
    return unsubscribe; 
  }, []);

    return (
        <StateContext.Provider 
            value={{ 
                activeMenu,
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                currentColor,
                currentMode,
                themeSettings,
                setThemeSettings,
                setMode,
                setColor,
                user,
                loading,
                error,
                email,
                setEmail,
                password,
                setPassword,
                invoices,
                clients,
                
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)