import React, {useState} from 'react';
import LoginCard from "../../components/LoginCard";
import RegistrationCard from "../../components/RegistrationCard";
import {AnimatePresence} from "framer-motion";

const Login = (props) => {
    const [activeCard, setActiveCard] = useState("login");
    const [presetUsername, setPresetUsername] = useState();
    const [presetPassword, setPresetPassword] = useState();

    return (<>
        <AnimatePresence exitBeforeEnter={true}>
            {activeCard === "login" &&
                <LoginCard
                    switchToRegistration={() => {
                        setActiveCard("registration")
                    }}
                    presetUsername={presetUsername}
                    presetPassword={presetPassword}
                />}
            {activeCard === "registration" &&
                <RegistrationCard
                    switchToLogin={() => {
                        setActiveCard("login")
                    }}
                    setPresetUsername={setPresetUsername}
                    setPresetPassword={setPresetPassword}
                />}
        </AnimatePresence>
    </>);
}

export default Login;