import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const AuthLayouts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayouts;