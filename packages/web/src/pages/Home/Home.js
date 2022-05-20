import React from 'react';
import {Button, Card, Col, Container, Grid, Row, Text} from "@nextui-org/react";
import {Divider} from "@mui/material";
import {Link} from "react-router-dom";
import useMobileDetect from 'use-mobile-detect-hook';

const transactions = [1, 2, 3, 4, 5];

const BalanceCard = (props) => {
    return (
        <Card
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
        </Card>
    );
}

const TransactionRow = (props) => {
    return (
        <>
            <Button light style={{
                textAlign: "left",
                justifyContent: "left",
            }}>
                <Text style={{margin: 0}}>Transaction</Text>
            </Button>
        </>
    )
}

const TransactionsCard = (props) => {
    return (
        <Card style={{marginTop: "2rem"}} shadow={false} bordered>
            <Card.Header>
                <Row style={{alignItems: "baseline"}}
                     justify={"space-between"}>
                    <Text h3 style={{margin: 0}}>Transactions</Text>
                    <Link to={"/transactions"} style={{margin: 0}}>View all</Link>
                </Row>
            </Card.Header>
            <Card.Body>
                {transactions.map((t, i) => {
                    let transactionRow = <TransactionRow/>;
                    if (i < transactions.length - 1) {
                        transactionRow =
                            <>
                                <TransactionRow/>
                                <Divider style={{paddingTop: "0.2rem", marginBottom: "0.2rem"}}/>
                            </>
                    }
                    return transactionRow;

                })}
            </Card.Body>
        </Card>
    )
}

const Home = (props) => {
    const device = useMobileDetect();

    return (
        <Container xs style={device.isMobile() ? {marginTop: "2.5rem"} : {marginTop: "6rem"}}>
            <Text h2 style={{marginBottom: "2rem"}}>Home</Text>
            <BalanceCard/>
            <TransactionsCard/>
        </Container>
    );
}

export default Home;