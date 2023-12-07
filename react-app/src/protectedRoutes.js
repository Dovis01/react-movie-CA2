import React, {useContext} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {UsersContext} from './contexts/usersContext'

const ProtectedRoutes = () => {
    const usersContext = useContext(UsersContext);
    const location = useLocation();

    return usersContext.isAuthenticated === true ? (
        <Outlet/>
    ) : (
        <Navigate to='/signin' replace state={{from: location}}/>
    );
};

export default ProtectedRoutes;
