import React from "react";
import {SnackbarProvider} from "notistack";

import {createTheme, NextUIProvider} from "@nextui-org/react";

import useDarkMode from 'use-dark-mode';
import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page404 from "./pages/Page404";

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
                    <BrowserRouter>
                        <Routes>
                            <Route path="/">
                                <Route index element={<Login/>}/>
                            </Route>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </BrowserRouter>
                </SnackbarProvider>
        </NextUIProvider>
    );
}

export default App;
