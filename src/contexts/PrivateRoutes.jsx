import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useFirebaseContext } from './FirebaseContextProvider'

const PrivateRoutes = () => {
    const { authUser } = useFirebaseContext()

  return (
    authUser ? <Outlet/> : <Navigate to="/login" />
  )
}

export default PrivateRoutes