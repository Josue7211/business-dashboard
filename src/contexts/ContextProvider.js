import React, { createContext, useContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';

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
    const [password, setPassword] = useState('');
    
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
        setIsClicked({ ...initialState, [clicked]: true})
    }

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
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)