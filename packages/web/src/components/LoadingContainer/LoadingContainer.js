import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from "@nextui-org/react";
import {motion} from "framer-motion";

const LoadingContainer = (props) => {
    const {isLoading, type, text, size, color, textColor} = props;

    return (
        <>
            {isLoading && (
                <motion.div
                    animate={{opacity: 1}}
                    initial={{opacity: 0}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.5}}
                    key={1}
                    style={{
                        width: "100%",
                        textAlign: "center",
                        paddingTop: 20,
                        paddingBottom: 20,
                    }}
                >
                    <Loading
                        size={size}
                        type={type}
                        color={color}
                        textColor={textColor ? textColor : color}>
                        {text}
                    </Loading>
                </motion.div>
            )}
            {!isLoading &&
                <motion.div
                    animate={{opacity: 1}}
                    initial={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.5}}
                    key={2}
                >
                    {props.children}
                </motion.div>
            }
        </>
    );
}


LoadingContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(["gradient", "default", "spinner", "points", "points-opacity"]),
    text: PropTypes.string,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    color: PropTypes.oneOf(["white", "default", "primary", "secondary", "success", "warning", "error", "currentColor"]),
    textColor: PropTypes.string
}
LoadingContainer.defaultProps = {
    isLoading: true,
    type: "gradient",
    text: "",
    size: "md",
    color: "primary",
    textColor: undefined
}
export default LoadingContainer;