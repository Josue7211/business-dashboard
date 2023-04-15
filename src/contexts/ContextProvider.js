import React, { createContext, useContext, useState, useEffect } from 'react'

const StateContext = createContext()

const initialState = {
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
  
    useEffect(() => {
      const handleResize = () => setScreenSize(window.innerWidth)

      window.addEventListener('resize', handleResize)

      handleResize()

      return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
      if(screenSize <= 900) {
        setActiveMenu(false)
      } else {
        setActiveMenu(true)
      }
    }, [screenSize])

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
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)