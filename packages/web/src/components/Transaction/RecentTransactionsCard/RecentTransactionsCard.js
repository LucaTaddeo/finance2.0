import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import TransactionListElement from "../TransactionListElement";
import {Card, Row, Text} from "@nextui-org/react";
import {Divider} from "@mui/material";
import LoadingContainer from "../../LoadingContainer";
import {motion} from "framer-motion";
import {getRecentTransactions} from "../../../api/TransactionsAPI";


const RecentTransactionsCard = ({openTransactionModal, setSelectedTransaction}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getRecentTransactions().then(res => {
            setTransactions(res);
            setIsLoading(false);
        })
    }, [])

    return (<motion.div layout><Card style={{marginTop: "2rem"}} shadow={false} bordered>
            <Card.Header>
                <motion.div layout={"position"} style={{width: "100%"}}>
                    <Row style={{alignItems: "baseline"}}
                         justify={"space-between"}>
                        <Text h3 style={{margin: 0}}>Transactions</Text>
                        <Link to={"/transactions"} style={{margin: 0}}>View all</Link>
                    </Row></motion.div>
            </Card.Header>
            <Card.Body>
                <LoadingContainer isLoading={isLoading}>
                    {transactions.map((t, i) => {
                        const clickHandler = () => {
                            setSelectedTransaction(t);
                            openTransactionModal();
                        }
                        let transactionRow = <TransactionListElement key={i} clickHandler={clickHandler}
                                                                     transaction={t}/>;
                        if (i < transactions.length - 1) {
                            transactionRow = <div key={i}>
                                <TransactionListElement clickHandler={clickHandler} transaction={t}/>
                                <Divider style={{paddingTop: "0.2rem", marginBottom: "0.2rem"}}/>
                            </div>
                        }
                        return transactionRow;
                    })}
                </LoadingContainer>
            </Card.Body>
        </Card>
        </motion.div>)
}

export default RecentTransactionsCard;