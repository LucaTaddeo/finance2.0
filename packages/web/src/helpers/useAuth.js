import React from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
    return React.useContext(AuthContext);
}