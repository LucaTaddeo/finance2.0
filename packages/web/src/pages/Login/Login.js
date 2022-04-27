import React, {useState} from 'react';
import LoginCard from "../../components/LoginCard";
import RegistrationCard from "../../components/RegistrationCard";
import {AnimatePresence} from "framer-motion";

const Login = (props) => {
    const [activeCard, setActiveCard] = useState("login");

    return (<>
        <AnimatePresence exitBeforeEnter={true}>
            {activeCard === "login" &&
                <LoginCard switchToRegistration={() => {
                    setActiveCard("registration")
                }}/>}
            {activeCard === "registration" &&
                <RegistrationCard switchToLogin={() => {
                    setActiveCard("login")
                }}/>}
        </AnimatePresence>
    </>);
}

export default Login;