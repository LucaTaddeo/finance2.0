import React from "react";
import AuthContext from "../AuthContext";
import useLocalStorage from "../../helpers/useLocalStorage";

const AuthProvider = (props) => {
    const localStorageKey = "user";

    const [user, setUser] = useLocalStorage(
        localStorageKey,
        null
    );

    const isLoggedIn = () => {
        return user !== undefined && user !== null;
    }

    const login = (user, callback = () => {}) => {
        setUser(user);
        callback();
    };

    const logout = (callback = () => {}) => {
        setUser(null);
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