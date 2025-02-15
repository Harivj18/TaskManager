import React from 'react'
import { useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from './authContext';

const VerifyRoutes = () => {
    const {isAuthenticated, loading} = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(()=> {
        if (!isAuthenticated && !loading) {
            navigate('/login')
        }
    }, [isAuthenticated, loading])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        )
    }

    return isAuthenticated ? <Outlet /> : null;
}

export default VerifyRoutes;