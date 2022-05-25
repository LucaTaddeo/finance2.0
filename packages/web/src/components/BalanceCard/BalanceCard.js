import React from "react";
import {Card, Col, Grid, Text} from "@nextui-org/react";

const BalanceCard = (props) => {
    return (<Card
        color={"gradient"}
        style={{
            width: "100%",
        }}
    >
        <Card.Header>
            <Col>
                <Text size={16} weight="bold" transform="uppercase" color="#ffffffAA">
                    My Balance
                </Text>
                <Text h3 size={32} color="white">
                    € 124021.53
                </Text>
            </Col>
        </Card.Header>
        <Card.Body>
            <Grid.Container>
                <Grid direction="column" xs={6}>
                    <Text size={12} transform="uppercase" color="#ffffffAA">Income</Text>
                    <Text h4 weight="normal" color="white">
                        + € 124021.53
                    </Text>
                </Grid>
                <Grid direction="column" xs={6}>
                    <Text size={12} transform="uppercase" color="#ffffffAA">Outcome</Text>
                    <Text h4 weight="normal" color="white">
                        - € 124021.53
                    </Text>
                </Grid>
            </Grid.Container>
        </Card.Body>
    </Card>);
}

export default BalanceCard;