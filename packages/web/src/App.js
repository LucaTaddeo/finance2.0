import React from "react";
import {SnackbarProvider} from "notistack";

import {createTheme, NextUIProvider} from "@nextui-org/react";

import useDarkMode from 'use-dark-mode';
import LoginCard from "./components/LoginCard";

const lightTheme = createTheme({
    type: 'light',
});

const darkTheme = createTheme({
    type: 'dark',
});

const App = () => {
    const darkMode = useDarkMode(true);

    return (
        <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
            <SnackbarProvider
                maxSnack={3}
                autoHideDuration={1500}
                anchorOrigin={{horizontal: "center", vertical: "bottom"}}
                preventDuplicate
            >
                <LoginCard/>
            </SnackbarProvider>
        </NextUIProvider>
    );
}

export default App;
