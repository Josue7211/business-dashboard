import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, db } from '../Firebase';
import { redirect } from "react-router-dom";
import { collection, onSnapshot} from "firebase/firestore";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const FirebaseContext = createContext()

export const FirebaseContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [invoices, setInvoices] = useState([])
    const [team, setTeam] = useState([])
    const [clients, setClients] = useState([])
    const [profilePic, setProfilePic] = useState('')

    const invoicesCollectionRef = collection(db, "invoices");
    const clientsCollectionRef = collection(db, "clients");
    const teamCollectionRef = collection(db, "team");

      // Google authentication provider
    const provider = new GoogleAuthProvider();

    const signIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential)
          redirect("/Dashboard")
        })
        .catch((error) => {
          console.log(error)
        });
    };

    const signInWithGoogle = (e) => {
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result)
          console.log(result.user)
  
  
          // Get the values that we want from the response
          const name = result._tokenResponse.firstName;
          const email = result.user.email;
          const profilePic = result.user.photoURL;
  
          // Store values in local storage
          localStorage.setItem("name", name)
          localStorage.setItem("email", email)
          localStorage.setItem("profilePic", profilePic)
  
          // Send the user to the dashboard
          redirect("/Dashboard")
        })
        .catch((error) => {
          console.log(error)
        });
    };

    const logOut = () => {
      signOut(auth).then(() => {
          console.log('Signed Out')
      }).catch(error => console.log(error))
    } 

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        });

        return () => {
            listen();
        }
    }, []);

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
        <FirebaseContext.Provider 
            value={{ 
                authUser,
                setAuthUser,
                signIn,
                signInWithGoogle,
                logOut,
                email,
                setEmail,
                password,
                setPassword,
                invoices,
                clients,
                team,
                profilePic,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    )
}

export const useFirebaseContext = () => useContext(FirebaseContext)