import React, {useState} from 'react';
import {Button, Card, Col, Grid, Row, Text} from "@nextui-org/react";
import {Divider} from "@mui/material";
import {Link} from "react-router-dom";
import CenteredPageLayout from "../../components/CenteredPageLayout/CenteredPageLayout";
import SideModal from "../../components/SideModal";
import {AnimatePresence} from "framer-motion";

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

const TransactionRow = ({clickHandler}) => {
    return (
        <>
            <Button
                onClick={() => clickHandler()}
                light
                style={{
                    width: "100%",
                    textAlign: "left",
                    justifyContent: "left",
                }}>
                <Text style={{margin: 0}}>Transaction</Text>
            </Button>
        </>
    )
}

const TransactionsCard = ({openTransactionModal, setModalDetails}) => {
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
                    const clickHandler = () => {
                        setModalDetails(t);
                        openTransactionModal();
                    }
                    let transactionRow = <TransactionRow key={i} clickHandler={clickHandler}/>;
                    if (i < transactions.length - 1) {
                        transactionRow =
                            <div key={i}>
                                <TransactionRow clickHandler={clickHandler}/>
                                <Divider style={{paddingTop: "0.2rem", marginBottom: "0.2rem"}}/>
                            </div>
                    }
                    return transactionRow;

                })}
            </Card.Body>
        </Card>
    )
}

const Home = (props) => {
    const [open, setOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(undefined);

    const handleClose = () => {
        setOpen(false);
        setSelectedTransaction(undefined);
    };

    return (
        <AnimatePresence>
            <CenteredPageLayout key={1} title={"Home"} isModalOpen={open}>
                <BalanceCard/>
                <TransactionsCard setModalDetails={setSelectedTransaction} openTransactionModal={() => setOpen(true)}/>
            </CenteredPageLayout>
            <SideModal key={2} title={"Titolo"} body={selectedTransaction} open={open} handleClose={handleClose}/>
        </AnimatePresence>
    );
}

export default Home;