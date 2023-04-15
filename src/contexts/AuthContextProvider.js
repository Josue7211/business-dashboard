import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../Firebase';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    // Google authentication provider
    const provider = new GoogleAuthProvider();

    const signIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          console.log(userCredential)
      })
          .catch((error) => {
              console.log(error)
          })
    }

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
                setUser(user)
            } else {
                setUser(null)
            }
        });

        return () => {
            listen();
        }
    }, []);

    return (
        <AuthContext.Provider 
            value={{ 
                user,
                setUser,
                signIn,
                signInWithGoogle,
                logOut,
                email,
                setEmail,
                password,
                setPassword,  
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
