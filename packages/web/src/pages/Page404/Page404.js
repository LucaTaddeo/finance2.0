import React from 'react';
import {Button, Text} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {Hidden} from "@mui/material";

const Page404 = (props) => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "stretch",
            justifyContent: "center",
        }}>
            <div style={{marginLeft: "-0.1rem", padding: "1rem"}}>
                <Text
                    h1
                    size={40}
                    css={{
                        textGradient: "45deg, $blue500 -20%, $pink500 50%",
                        lineHeight: 1.25
                    }}
                    weight="bold"
                >
                    Error
                </Text>
                <Text
                    h1
                    size={150}
                    css={{
                        textGradient: "45deg, $purple500 -20%, $pink500 100%",
                        lineHeight: 1
                    }}
                    weight="bold"
                >
                    404
                </Text>
                <Text
                    h1
                    size={60}
                    css={{
                        textGradient: "45deg, $yellow500 -20%, $red500 100%",
                        lineHeight: 1.25
                    }}
                    weight="bold"
                >
                    <Hidden smDown>Page </Hidden>Not Found!
                </Text>
                <Button onClick={() => navigate("/")} color="gradient" bordered shadow style={{width: "100%", marginTop: "3rem"}}>Take me Home!</Button>
            </div>
        </div>
    );
}

export default Page404;