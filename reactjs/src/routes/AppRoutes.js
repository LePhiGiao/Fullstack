
import React from 'react';
import Home from '../components/Home/Home'
import Project from '../components/Project/Project'
import NotFound from '../components/NotFound/NotFound';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import User from '../components/ManageUser/User';
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from './PrivateRoutes';

function AppRoutes(props) {
    return (
        <>
            <Routes>
                <Route path="/users" element={<PrivateRoutes />} >
                    <Route path='/users' element={<User />} />
                </Route>
                <Route exact path="/project" element={<PrivateRoutes />} >
                    <Route exact path='/project' element={<Project />} />
                </Route>

                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default AppRoutes;