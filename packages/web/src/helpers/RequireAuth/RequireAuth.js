import React from 'react';
import useAuth from "../useAuth";
import {useLocation, Navigate} from "react-router-dom";

const RequireAuth = ({children}) => {
    const auth = useAuth();
    const location = useLocation();

    if(!auth.isLoggedIn()){
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;