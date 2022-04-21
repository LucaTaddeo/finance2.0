import React from "react";
import {useSnackbar} from "notistack";
import {Button, Card, Container, Divider, Input, Link, Spacer, Text} from "@nextui-org/react";

const LoginCard = () => {
    const [data, setData] = React.useState(null);
    const {enqueueSnackbar} = useSnackbar();

    React.useEffect(() => {
        fetch("/api/v1/health")
            .then((res) => res.json())
            .then((data) => setData(data.uptime));
    }, []);
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh "
        }}>
            <Container xs>
                <Card shadow>
                    <Card.Header>
                        <Text h3 b>Finance 2.0</Text>
                    </Card.Header>
                    <Divider/>
                    <Card.Body css>
                        <Spacer y={1.2}/>
                        <Input bordered clearable placeholder="Username" width="100%" aria-label="Username"/>
                        <Spacer y={1.2}/>

                        <Input.Password bordered placeholder="Password" width="100%" aria-label="Password"/>
                        <Spacer y={1.2}/>

                        <Text><Link>Don't have an account? Create one now!</Link></Text>
                        <Spacer y={1.2}/>

                        <Button
                            onClick={() => {
                                enqueueSnackbar("Prova", {variant: "success"});
                            }}
                            color="gradient" shadow style={{width: "100%"}}>
                            Login
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default LoginCard;