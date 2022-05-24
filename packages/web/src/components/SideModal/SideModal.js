import React from 'react';
import {Card, Row, Text} from "@nextui-org/react";
import {AnimatePresence, motion} from "framer-motion";
import {ClickAwayListener, IconButton, useMediaQuery, useTheme} from "@mui/material";
import {Close} from "@mui/icons-material";

const SideModal = ({open, handleClose, title, body, closeOnClickAway}) => {

    const divStyles = {
        padding: 15,
        position: "fixed",
        height: "100%",
        top: 0,
        right: 0,
        zIndex: 2000,
        width: "30%"
    };

    const theme = useTheme();

    useMediaQuery(theme.breakpoints.down('lg')) && (divStyles.width = "40%");
    useMediaQuery(theme.breakpoints.down('md')) && (divStyles.width = "50%");
    useMediaQuery(theme.breakpoints.down('sm')) && (divStyles.width = "100%") && (divStyles.padding = 5);

    return (
        <AnimatePresence exitBeforeEnter>
            {open && <motion.div
                onClick={() => console.log("Helo")}
                layout
                initial={{x: 100, opacity: 0}}
                animate={{x: 0, opacity: 1}}
                exit={{x: 100, opacity: 0}}
                transition={{type: "spring", duration: 0.6}}
                style={divStyles}>
                <ClickAwayListener onClickAway={closeOnClickAway && handleClose}>
                    <Card
                        aria-labelledby="side-modal"
                        style={{height: "100%", padding: 10}}
                    >
                        <Card.Header>
                            <Row style={{alignItems: "center"}} justify={"space-between"}>
                                <Text id="modal-title" size={18}>
                                    {title}
                                </Text>
                                <IconButton onClick={handleClose}>
                                    <Close style={{color: "grey"}}/>
                                </IconButton>
                            </Row>

                        </Card.Header>
                        <Card.Body>
                            <Text>{body}</Text>
                        </Card.Body>
                        <Card.Footer>

                        </Card.Footer>
                    </Card>
                </ClickAwayListener>
            </motion.div>}
        </AnimatePresence>
    );
}

export default SideModal;