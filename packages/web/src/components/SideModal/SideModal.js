import React from 'react';
import {Card, Row, Text} from "@nextui-org/react";
import {AnimatePresence, motion} from "framer-motion";
import {ClickAwayListener, IconButton, useMediaQuery, useTheme} from "@mui/material";
import {Close} from "@mui/icons-material";
import PropTypes from 'prop-types';

export const Body = ({children}) => children;

export const Footer = ({children}) => children;

export const Overline = ({text, size, color}) => <Text
    size={size}
    color={color}>{text}</Text>
Overline.propTypes = {text: PropTypes.string.isRequired, size: PropTypes.number, color: PropTypes.string}
Overline.defaultProps = {size: 15, color: "grey"}


export const SideModal = ({open, handleClose, closeOnClickAway, children}) => {
    const divStyles = {
        padding: 15, position: "fixed", height: "100%", top: 0, right: 0, zIndex: 2000, width: "30%"
    };

    const theme = useTheme();

    useMediaQuery(theme.breakpoints.down('lg')) && (divStyles.width = "40%");
    useMediaQuery(theme.breakpoints.down('md')) && (divStyles.width = "50%");
    useMediaQuery(theme.breakpoints.down('sm')) && (divStyles.width = "100%") && (divStyles.padding = 5);

    const clickAwayAction = () => {
        if (closeOnClickAway) return handleClose(); else return null;
    }

    return (<AnimatePresence exitBeforeEnter>
        {open && <motion.div
            layout
            initial={{x: 100, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            exit={{x: 100, opacity: 0}}
            transition={{type: "spring", duration: 0.6}}
            style={divStyles}>
            <ClickAwayListener onClickAway={clickAwayAction}>
                <Card
                    aria-labelledby="side-modal"
                    style={{height: "100%", padding: 10}}
                >
                    <Card.Header>
                        <Row style={{alignItems: "center"}} justify={"space-between"}>
                            <IconButton onClick={handleClose}>
                                <Close style={{color: "grey"}}/>
                            </IconButton>
                            {React.Children.map(children, child => {
                                if (child?.type === Overline) return child
                            })}
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        {React.Children.map(children, child => {
                            if (child?.type === Body) return child
                        })}
                    </Card.Body>
                    <Card.Footer>
                        {React.Children.map(children, child => {
                            if (child?.type === Footer) return child
                        })}
                    </Card.Footer>
                </Card>
            </ClickAwayListener>
        </motion.div>}
    </AnimatePresence>);
}

SideModal.propTypes = {
    open: PropTypes.bool, handleClose: PropTypes.func, closeOnClickAway: PropTypes.bool, children: PropTypes.array
}

SideModal.defaultProps = {
    closeOnClickAway: false
}

SideModal.Body = Body;
SideModal.Footer = Footer;
SideModal.Overline = Overline;

export default SideModal;