import React, {useEffect, useLayoutEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {Button, Card, Container, Divider, Input, Link, Spacer, Text} from "@nextui-org/react";
import {motion} from "framer-motion";
import useAuth from "../../helpers/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import {login} from "../../api/AuthenticationAPI";
import LoadingContainer from "../LoadingContainer";

// TODO implement react hook form?

const LoginCard = (props) => {
    const {switchToRegistration, presetUsername, presetPassword} = props;

    const [isLoading, setIsLoading] = useState(false);

    const {enqueueSnackbar} = useSnackbar();

    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const [username, setUsername] = useState(presetUsername);
    const [password, setPassword] = useState(presetPassword);

    useEffect(() => {
        from !== "/" && enqueueSnackbar("Please, login to visit the page!", {variant: "error"});
    }, []); // FIXME: on logout, there should be no "from" field

    const loginHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        login(username, password)
            .then(res =>
                auth.login(res.data.user, res.data.token, () => {
                    navigate(from, {replace: true});
                }))
            .catch(err => {
                switch (err?.response?.status) {
                    case 400: // TODO sync this with errors on input fields
                        enqueueSnackbar("Validation error occured!", {variant: "error"});
                        break;
                    case 401:
                        enqueueSnackbar(err.response.data.message, {variant: "error"});
                        break;
                    case 500:
                        enqueueSnackbar("500: Internal Server Error!", {variant: "error"});
                        break;
                    default:
                        enqueueSnackbar("An error occured!", {variant: "error"});
                        break;
                }
            }).finally(() => setIsLoading(false));
    }

    useLayoutEffect(() => {

    }, [])

    return (
        <motion.div
            animate={{opacity: 1, x: 0}}
            initial={{opacity: 0, x: -20}}
            exit={{opacity: 0, x: 20}}
            transition={{duration: 0.25}}
            key={1}>
            <Container xs>
                <motion.div layout>
                    <Card shadow>

                        <Card.Header as={motion.div} layout={"position"}>
                            <Text h3 b>Login</Text>
                        </Card.Header>

                        <Divider/>

                        <Card.Body css>
                            <LoadingContainer isLoading={isLoading}>
                                <form onSubmit={loginHandler}>
                                    <Spacer y={1.2}/>

                                    <Input bordered clearable placeholder="Username" width="100%"
                                           aria-label="Username"
                                           value={username} onChange={e => setUsername(e.target.value)}
                                           required/>
                                    <Spacer y={1.2}/>

                                    <Input.Password bordered placeholder="Password" width="100%"
                                                    aria-label="Password"
                                                    value={password} onChange={e => setPassword(e.target.value)}
                                                    required/>

                                    <Spacer y={1.2}/>

                                    <Text>
                                        <Link onClick={switchToRegistration}>
                                            Don't have an account? Create one now!
                                        </Link>
                                    </Text>

                                    <Spacer y={1.2}/>

                                    <Button
                                        type="submit"
                                        color="gradient" shadow style={{width: "100%"}}>
                                        Login
                                    </Button>
                                </form>
                            </LoadingContainer>
                        </Card.Body>
                    </Card>
                </motion.div>
            </Container>
        </motion.div>
    )
}

export default LoginCard;