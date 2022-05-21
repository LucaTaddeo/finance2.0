import React from 'react';
import {Container, Text} from "@nextui-org/react";
import useMobileDetect from 'use-mobile-detect-hook';

const CenteredPageLayout = ({title, children}) => {
    const device = useMobileDetect();
    let containerStyles = device.isMobile() ? {paddingBottom: "5rem", marginTop: "2rem"} : {
        paddingBottom: "3rem",
        marginTop: "5rem"
    }
    return (
        <Container xs style={containerStyles}>
            <Text h2 style={{marginBottom: "2rem"}}>{title}</Text>
            {children}
        </Container>
    )
}

export default CenteredPageLayout;