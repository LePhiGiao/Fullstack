
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes(props) {

    //check authentication
    let auth = false
    let session = sessionStorage.getItem("account")
    if (session) {
        auth = true
    }

    return (
        auth ? <Outlet /> : <Navigate to="/login" />
    );
}

export default PrivateRoutes;