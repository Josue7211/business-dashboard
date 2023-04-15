import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useStateContext } from './ContextProvider'

const PrivateRoutes = () => {
    const { user } = useStateContext()

  return (
    user ? <Outlet/> : <Navigate to="/login" />
  )
}

export default PrivateRoutes