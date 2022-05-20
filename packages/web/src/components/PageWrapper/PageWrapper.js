import * as React from 'react';
import {styled as muiStyled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import {Button, Card, styled as nextStyled} from "@nextui-org/react";
import {motion} from "framer-motion";
import {matchPath, useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../routes";
import useAuth from "../../helpers/useAuth";
import {BottomNavigation, Divider, List} from "@mui/material";
import useMobileDetect from 'use-mobile-detect-hook';
import {LogoutTwoTone} from "@mui/icons-material";

const drawerWidth = 240;

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), overflowX: 'hidden', width: `calc(${theme.spacing(8)} + 1px)`, [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const Drawer = muiStyled(MuiDrawer)(({theme}) => ({
    width: drawerWidth, flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box', ...{
        ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme),
    },
}),);

// const openedMixin = (theme) => ({
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
//     }), overflowX: 'hidden',
// });
// const Drawer = muiStyled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
//     width: drawerWidth, flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box', ...{
//         ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme),
//     } ...(!open && {
//         ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme),
//     }),
// }),);

const ListButton = nextStyled(Button, {
    paddingLeft: "0.5rem !important", paddingRight: "0.5rem !important"
});
ListButton.defaultProps = {
    auto: true, color: "primary"
}

const MenuButton = ({path, name, icon, style}) => {
    const location = useLocation();
    const navigate = useNavigate();

    let match = matchPath({
        path: path, exact: false, strict: false
    }, location.pathname)

    return (
        <ListButton
            key={name}
            icon={icon}
            onClick={() => navigate(path)}
            flat={!match}
            style={{...style}}
        />
    )
}

const SideMenu = () => {
    const auth = useAuth();
    return (
            <Drawer
                variant="permanent"
                open={false}
                PaperProps={{
                    sx: {
                        justifyContent: "center", border: "none"
                    }
                }}>
                <motion.div
                    animate={{opacity: 1, x: 0}}
                    initial={{opacity: 0, x: -20}}
                    exit={{opacity: 0, x: 20}}
                    transition={{duration: 0.2}}>

                    <List sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        {/*<Avatar squared text={"Luca"} color={"primary"} textColor={"white"} style={{marginBottom: 20}}/>*/}

                        {routes.map(({path, icon, name, section}) => {
                            return section === 1 &&
                                <MenuButton path={path} icon={icon} name={name} style={{marginBottom: 10}}/>;
                        })}
                    </List>
                    <Divider sx={{marginBottom: 1.2}}/>
                    <List sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        {routes.map(({path, icon, name, section}) => {
                            return section === 2 &&
                                <MenuButton path={path} icon={icon} name={name} style={{marginBottom: 10}}/>;
                        })}
                        <ListButton bordered={false} light key={"logout"} icon={<LogoutTwoTone/>}
                                    onClick={auth.logout}/>
                    </List>
                </motion.div>
            </Drawer>
    )
}

const BottomMenu = () => {
    return (
        <motion.div
            animate={{opacity: 1, y: 0}}
            initial={{opacity: 0, y: 20}}
            exit={{opacity: 0, y: -20}}
            transition={{duration: 0.2}}
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0, zIndex: 1000
            }}
        >
            <Card style={{
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0
            }}>
                <BottomNavigation style={{height: "auto"}}>
                    {routes.map(({path, icon, name, section}, i) => {
                        return section && <MenuButton path={path} icon={icon} name={name} style={i === 0 ? {
                            marginLeft: 15,
                            marginRight: 15
                        } : {marginRight: 15}}/>;
                    })}
                </BottomNavigation>
            </Card>
        </motion.div>
    )
}

const PageWrapper = (props) => {
    const device = useMobileDetect();

    return (
        <Box sx={{display: 'flex', flexGrow: 1, minHeight: "100vh"}}>
            {device.isDesktop() && <SideMenu/>}
            {device.isMobile() && <BottomMenu/>}
            <motion.div
                animate={{opacity: 1, x: 0, y: 0}}
                initial={device.isMobile() ? {opacity: 0, y: -20} : {opacity: 0, x: 20}}
                exit={device.isMobile() ? {opacity: 0, y: 20} : {opacity: 0, x: -20}}
                transition={{duration: 0.2}} style={{width: "100vw"}}>
                <Box component="main" sx={{flexGrow: 1}}>
                    {props.children}
                </Box>
            </motion.div>
        </Box>
    );
}

export default PageWrapper;