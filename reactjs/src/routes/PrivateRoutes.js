
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext'

function PrivateRoutes(props) {

    //check authentication
    const { user } = useContext(UserContext)
    let auth = false

    if (user && user.isAuthenticated === true) {
        auth = true
    }

    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoutes;