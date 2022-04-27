import React, {useState, useEffect} from "react";
import {useSnackbar} from "notistack";
import {Button, Card, Container, Divider, Input, Link, Spacer, Text} from "@nextui-org/react";
import {motion} from "framer-motion";

const LoginCard = (props) => {
    const [data, setData] = useState(null);
    const {enqueueSnackbar} = useSnackbar();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState("");

    useEffect(() => {
        fetch("/api/v1/health")
            .then((res) => res.json())
            .then((data) => setData(data.uptime));
    }, [setData]);

    const loginHandler = (e) => {
        e.preventDefault();
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