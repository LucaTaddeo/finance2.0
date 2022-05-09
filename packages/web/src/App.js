import React from "react";
import {SnackbarProvider} from "notistack";

import {createTheme as createNextUiTheme, NextUIProvider, Text} from "@nextui-org/react";
import {createTheme as createMuiTheme, ThemeProvider as MuiProvider} from '@mui/material/styles';

import useDarkMode from 'use-dark-mode';
import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page404 from "./pages/Page404";
import {routes} from "./routes";
import RequireAuth from "./helpers/RequireAuth";
import useAuth from "./helpers/useAuth";
import PageWrapper from "./components/PageWrapper";

const lightTheme = createNextUiTheme({
    type: 'light',
});

const darkTheme = createNextUiTheme({
    type: 'dark',
});

const muiDarkTheme = createMuiTheme({
    palette: {
        mode: 'dark',
        background: {
            main: getComputedStyle(document.body).getPropertyValue(darkTheme.colors.background.value.slice(4, -1)),
            paper: getComputedStyle(document.body).getPropertyValue(darkTheme.colors.background.value.slice(4, -1)),
        },
    }
});

const muiLightTheme = createMuiTheme({
    palette: {
        mode: 'light',
        background: {
            main: getComputedStyle(document.body).getPropertyValue(lightTheme.colors.background.value.slice(4, -1)),
            paper: getComputedStyle(document.body).getPropertyValue(lightTheme.colors.background.value.slice(4, -1)),
        },
    },
});

const App = () => {
    const darkMode = useDarkMode(true);
    const auth = useAuth();
    console.log(lightTheme.colors)
    return (
        <MuiProvider theme={darkMode.value ? muiDarkTheme : muiLightTheme}>
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
                                        element={
                                            <RequireAuth>
                                                <PageWrapper>
                                                    <Text onClick={() => auth.logout()}>{name}</Text>
                                                </PageWrapper>
                                            </RequireAuth>
                                        }
                                    />
                                )}
                            </Route>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </BrowserRouter>
                </SnackbarProvider>
            </NextUIProvider>
        </MuiProvider>
    );
}

export default App;
