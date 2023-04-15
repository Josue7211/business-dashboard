import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from './ContextProvider';

const PrivateRoutes = ({ path, ...props }) => {
    const { user } = useStateContext();

    return (
        user ? <Outlet/> : <Navigate to="/" />
    )
};

export default PrivateRoutes;
