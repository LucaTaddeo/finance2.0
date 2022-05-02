import React, {useState} from 'react';
import {Button, Card, Container, Divider, Input, Link, Spacer, Text} from "@nextui-org/react";
import {useSnackbar} from "notistack";
import {Grid, Hidden} from "@mui/material";
import {motion} from "framer-motion";
import {signup} from "../../api/AuthenticationAPI";

const RegistrationCard = (props) => {
    const {switchToLogin, setPresetUsername, setPresetPassword} = props;

    const {enqueueSnackbar} = useSnackbar();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isFormValid, setIsFormValid] = useState(true);

    const registrationHandler = (e) => {
        e.preventDefault();
        if (isFormValid) {
            signup(firstName, lastName, username, password)
                .then(res => {
                    enqueueSnackbar("New user created! Logging in...", {variant: "success"});
                    setPresetUsername(username);
                    setPresetPassword(password);
                    switchToLogin();
                })
                .catch(err => {
                    switch (err?.response?.status) {
                        case 400: // TODO sync this with errors on input fields
                            enqueueSnackbar("Validation error occured!", {variant: "error"});
                            break;
                        case 422:
                            enqueueSnackbar("Username already in use!", {variant: "error"});
                            break;
                        case 500:
                            enqueueSnackbar("500: Internal Server Error!", {variant: "error"});
                            break;
                        default:
                            enqueueSnackbar("An error occured!", {variant: "error"});
                            break;
                    }
                })
        }
    }

    return (
        <motion.div
            animate={{opacity: 1, x: 0}}
            initial={{opacity: 0, x: -20}}
            exit={{opacity: 0, x: 20}}
            transition={{duration: 0.25}}
            style={{
                width: "100%",
                position: "fixed",
                top: "50%",
                left: "50%",
                translateX: "-50%",
                translateY: "-50%",
            }}>
            <Container xs>
                <Card shadow>
                    <Card.Header>
                        <Text h3 b>Register</Text>
                    </Card.Header>
                    <Divider/>

                    <Card.Body css>
                        <form onSubmit={registrationHandler}>
                            <Spacer y={1.2}/>
                            <Grid container columnSpacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Input bordered clearable placeholder="First Name*" width="100%"
                                           aria-label="First Name" required value={firstName}
                                           onChange={e => setFirstName(e.target.value)}/>
                                </Grid>
                                <Hidden smUp><Spacer y={1.2}/></Hidden>
                                <Grid item xs={12} sm={6}>
                                    <Input bordered clearable placeholder="Last Name*" width="100%"
                                           aria-label="Last Name" required value={lastName}
                                           onChange={e => setLastName(e.target.value)}/>
                                </Grid>
                            </Grid>

                            <Spacer y={1.2}/>

                            <Input bordered clearable placeholder="Username*" width="100%" aria-label="Username"
                                   required value={username} onChange={e => setUsername(e.target.value)}/>
                            <Spacer y={1.2}/>

                            <Grid container columnSpacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <Input.Password bordered placeholder="Password*" width="100%" aria-label="Password"
                                                    required value={password}
                                                    onChange={e => setPassword(e.target.value)}/>
                                </Grid>
                                <Hidden smUp><Spacer y={1.2}/></Hidden>
                                <Grid item xs={12} sm={6}>
                                    <Input.Password bordered placeholder="Confirm Password*" width="100%"
                                                    aria-label="Confirm Password*" required value={confirmPassword}
                                                    onChange={e => setConfirmPassword(e.target.value)}/>
                                </Grid>
                            </Grid>

                            <Spacer y={1.2}/>

                            <Text><Link onClick={switchToLogin}>Already have an account? Login now!</Link></Text>
                            <Spacer y={1.2}/>


                            <Button
                                disabled={!isFormValid}
                                type={"submit"}
                                color="gradient" shadow style={{width: "100%"}}>
                                Register
                            </Button>
                        </form>
                    </Card.Body>
                </Card>
            </Container>
        </motion.div>
    );
}

export default RegistrationCard;