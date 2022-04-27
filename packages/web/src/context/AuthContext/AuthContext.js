import React from "react";

const AuthContext = React.createContext({
    user: null,
    isLoggedIn: () => {},
    setUser: () => {},
    login: () => {},
    logout: () => {}
});

export default AuthContext;