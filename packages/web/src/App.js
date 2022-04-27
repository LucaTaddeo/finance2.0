import React from "react";
import {SnackbarProvider} from "notistack";

import {createTheme, NextUIProvider, Text} from "@nextui-org/react";

import useDarkMode from 'use-dark-mode';
import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page404 from "./pages/Page404";
import {routes} from "./routes";
import RequireAuth from "./helpers/RequireAuth";
import useAuth from "./helpers/useAuth";

const lightTheme = createTheme({
    type: 'light',
});

const darkTheme = createTheme({
    type: 'dark',
});

const App = () => {
    const darkMode = useDarkMode(true);
    const auth = useAuth();

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
                            <Route index={!auth.isLoggedIn()} element={<Login/>}/>
                            {routes.map(({path, page, showNavbar, index, fullHeight, name}) =>
                                <Route
                                    index={auth.isLoggedIn() && index}
                                    path={path}
                                    key={path}
                                    element={<RequireAuth><Text>{name}</Text></RequireAuth>}
                                />
                            )}
                        </Route>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </BrowserRouter>
            </SnackbarProvider>
        </NextUIProvider>
    );
}

export default App;
