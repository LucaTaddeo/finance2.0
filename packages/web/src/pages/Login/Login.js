import React, {useState} from 'react';
import LoginCard from "../../components/LoginCard";
import RegistrationCard from "../../components/RegistrationCard";
import {AnimatePresence} from "framer-motion";
import {Container} from "@nextui-org/react";

const Login = (props) => {
    const [activeCard, setActiveCard] = useState("login");
    const [presetUsername, setPresetUsername] = useState();
    const [presetPassword, setPresetPassword] = useState();

    return (
        <Container style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "center"
        }}>
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
        </Container>
    );
}

export default Login;