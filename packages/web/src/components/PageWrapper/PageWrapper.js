import * as React from 'react';
import {styled as muiStyled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Button, styled as nextStyled} from "@nextui-org/react";
import {motion} from "framer-motion";
import {useLocation, useNavigate} from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    // width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(8)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
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

const Drawer = muiStyled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const ListButton = nextStyled(Button, {
    marginBottom: 10,
    paddingLeft: "0.5rem !important",
    paddingRight: "0.5rem !important"
});
ListButton.defaultProps = {
    auto: true,
    bordered: true,
    color: "primary"
}

const PageWrapper = (props) => {
    // const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };
    //
    // const handleDrawerClose = () => {
    //     setOpen(false);
    // };

    return (
        <Box sx={{display: 'flex'}}>
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
                        justifyContent: "center",
                        border: "none"
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
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListButton
                                key={text}
                                icon={<InboxIcon/>}
                                onClick={() => navigate("/settings")}
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
                        ))}
                    </List>
                    <Divider sx={{marginBottom: 1.2}}/>
                    <List sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        {['All mail', 'Trash'].map((text, index) => (
                            <ListButton
                                key={text}
                                icon={<InboxIcon/>}
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
                        ))}
                    </List>
                </motion.div>
            </Drawer>
            <motion.div
                animate={{opacity: 1, x: 0}}
                initial={{opacity: 0, x: 20}}
                exit={{opacity: 0, x: -20}}
                transition={{duration: 0.25}}>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    {/*<DrawerHeader />*/}
                    {props.children}
                </Box>
            </motion.div>
        </Box>
    );
}

export default PageWrapper;