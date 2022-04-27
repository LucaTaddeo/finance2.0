import React, {useState, useEffect} from "react";
import {useSnackbar} from "notistack";
import {Button, Card, Container, Divider, Input, Link, Spacer, Text} from "@nextui-org/react";
import {motion} from "framer-motion";
import useAuth from "../../helpers/useAuth";
import {useLocation, useNavigate} from "react-router-dom";
import {login} from "../../api/AuthenticationAPI";

const LoginCard = (props) => {
    const [data, setData] = useState(null);
    const {enqueueSnackbar} = useSnackbar();

    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const [username, setUsername] = useState();
    const [password, setPassword] = useState("");

    useEffect(() => {
        from !== "/" && enqueueSnackbar("You need to login to visit that page!", {variant: "error"});
    }, [setData]);

    const loginHandler = (e) => {
        e.preventDefault();
        login(username, password)
            .then(res =>
                auth.login(res.data.user, res.data.token, () => {
                    navigate(from, {replace: true})
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
            });
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
                        <Text h3 b>Login</Text>
                    </Card.Header>
                    <Divider/>
                    <Card.Body css>
                        <form onSubmit={loginHandler}>
                            <Spacer y={1.2}/>
                            <Input bordered clearable placeholder="Username" width="100%" aria-label="Username"
                                   value={username} onChange={e => setUsername(e.target.value)} required/>
                            <Spacer y={1.2}/>

                            <Input.Password bordered placeholder="Password" width="100%" aria-label="Password"
                                            value={password} onChange={e => setPassword(e.target.value)} required/>
                            <Spacer y={1.2}/>

                            <Text><Link onClick={props.switchToRegistration}>Don't have an account? Create one
                                now!</Link></Text>
                            <Spacer y={1.2}/>

                            <Button
                                type="submit"
                                color="gradient" shadow style={{width: "100%"}}>
                                Login
                            </Button>
                        </form>
                    </Card.Body>
                </Card>
            </Container>
        </motion.div>
    )
}

export default LoginCard;