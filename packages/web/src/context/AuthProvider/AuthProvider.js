import React from "react";
import AuthContext from "../AuthContext";
import useLocalStorage from "../../helpers/useLocalStorage";

const AuthProvider = (props) => {
    const [user, setUser] = useLocalStorage(
        "user",
        null
    );

    // TODO: create method "validateToken" to validate token with an API request every time isLoggedIn is used
    const [token, setToken] = useLocalStorage("token", null)

    const isLoggedIn = () => {
        return user !== undefined && user !== null && token !== undefined && token !== null;
    }

    const login = (user, token, callback = () => {}) => {
        setUser(user);
        setToken(token);
        callback();
    };

    const logout = (callback = () => {}) => {
        setUser(null);
        setToken(null);
        callback();
    };

    let contextValue = {user, setUser, login, logout, isLoggedIn};

    return (
        <AuthContext.Provider
            value={contextValue}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;