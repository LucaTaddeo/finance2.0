import React from 'react';
import {Container, Text} from "@nextui-org/react";
import useMobileDetect from 'use-mobile-detect-hook';
import {motion} from "framer-motion";
import {useMediaQuery, useTheme} from "@mui/material";

const CenteredPageLayout = ({title, children, isModalOpen}) => {
    const device = useMobileDetect();

    const theme = useTheme();
    const isScreenLargeEnough = useMediaQuery(theme.breakpoints.up('lg'));

    let containerStyles = device.isMobile() ? {paddingBottom: "5rem", marginTop: "2rem"} : {
        paddingBottom: "3rem",
        marginTop: "5rem"
    }

    isScreenLargeEnough && isModalOpen && (containerStyles.marginLeft = "15vw");

    return (
        <Container xs style={containerStyles}>
            <motion.div layout>
                <Text h2 style={{marginBottom: "2rem", marginLeft: 0}}>{title}</Text>
                {children}
            </motion.div>
        </Container>
    )
}

export default CenteredPageLayout;