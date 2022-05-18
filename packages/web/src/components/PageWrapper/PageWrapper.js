import * as React from 'react';
import {styled as muiStyled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import {Button, styled as nextStyled} from "@nextui-org/react";
import {motion} from "framer-motion";
import {matchPath, useLocation, useNavigate} from "react-router-dom";
import {routes} from "../../routes";
import {LogoutTwoTone} from "@mui/icons-material";
import useAuth from "../../helpers/useAuth";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    // width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
    }), overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), overflowX: 'hidden', width: `calc(${theme.spacing(8)} + 1px)`, [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

/*const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));*/

const Drawer = muiStyled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    width: drawerWidth, flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box', ...(open && {
        ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme),
    }), ...(!open && {
        ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme),
    }),
}),);

const ListButton = nextStyled(Button, {
    marginBottom: 10, paddingLeft: "0.5rem !important", paddingRight: "0.5rem !important"
});
ListButton.defaultProps = {
    auto: true, color: "primary"
}

const PageWrapper = (props) => {
    const [open] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };
    //
    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };

    return (<Box sx={{display: 'flex', flexGrow: 1, minHeight: "100vh"}}>
        {/*            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Mini variant drawer
                    </Typography>
                </Toolbar>
            </AppBar>*/}

        <Drawer
            variant="permanent"
            open={open}
            PaperProps={{
                sx: {
                    justifyContent: "center", border: "none"
                }
            }}>
            <motion.div
                animate={{opacity: 1, x: 0}}
                initial={{opacity: 0, x: -20}}
                exit={{opacity: 0, x: 20}}
                transition={{duration: 0.25}}>
                {/*                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />*/}
                <List sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    {routes.map(({path, icon, name, section}) => {
                        if (section === 1) {
                            let match = matchPath({
                                path: path, exact: false, strict: false
                            }, location.pathname)
                            return <ListButton
                                key={name}
                                icon={icon}
                                onClick={() => navigate(path)}
                                flat={!match}
                                // sx={{
                                //     minHeight: 48,
                                //     justifyContent: open ? 'initial' : 'center',
                                //     px: 2.5,
                                // }}
                            >
                                {/*<ListItemIcon*/}
                                {/*    sx={{*/}
                                {/*        minWidth: 0,*/}
                                {/*        mr: open ? 3 : 'auto',*/}
                                {/*        justifyContent: 'center',*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
                                {/*</ListItemIcon>*/}
                                {/*<ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>*/}
                            </ListButton>
                        }
                        return null;
                    })}
                </List>
                <Divider sx={{marginBottom: 1.2}}/>
                <List sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    {routes.map(({path, icon, name, section}) => {
                        if (section === 2) {
                            let match = matchPath({
                                path: path, exact: false, strict: false
                            }, location.pathname)
                            return <ListButton
                                key={name}
                                icon={icon}
                                onClick={() => navigate(path)}
                                flat={!match}
                                // sx={{
                                //     minHeight: 48,
                                //     justifyContent: open ? 'initial' : 'center',
                                //     px: 2.5,
                                // }}
                                // auto
                            >
                                {/*<ListItemIcon*/}
                                {/*    sx={{*/}
                                {/*        minWidth: 0,*/}
                                {/*        mr: open ? 3 : 'auto',*/}
                                {/*        justifyContent: 'center',*/}
                                {/*    }}*/}
                                {/*>*/}
                                {/*    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
                                {/*</ListItemIcon>*/}
                                {/*<ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>*/}
                            </ListButton>
                        }
                        return null;
                    })}
                    <ListButton bordered={false} light key={"logout"} icon={<LogoutTwoTone/>}
                                onClick={auth.logout}/>
                    {/*<Avatar squared text={"Luca"} color={"primary"} textColor={"white"}/>*/}
                </List>
            </motion.div>
        </Drawer>
        <motion.div
            animate={{opacity: 1, x: 0}}
            initial={{opacity: 0, x: 20}}
            exit={{opacity: 0, x: -20}}
            transition={{duration: 0.25}} style={{width: "100vw"}}>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                {/*<DrawerHeader />*/}
                {props.children}
            </Box>
        </motion.div>
    </Box>);
}

export default PageWrapper;