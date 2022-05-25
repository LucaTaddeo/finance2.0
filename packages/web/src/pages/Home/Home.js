import React, {useState} from 'react';
import {Card, Col, Grid, Text} from "@nextui-org/react";
import CenteredPageLayout from "../../components/CenteredPageLayout";
import {AnimatePresence} from "framer-motion";
import {SideModal} from "../../components/SideModal";
import RecentTransactionsCard from "../../components/Transaction/RecentTransactionsCard";
import BalanceCard from "../../components/BalanceCard";

const Home = (props) => {
    const [open, setOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(undefined);

    const handleClose = () => {
        setOpen(false);
        setSelectedTransaction(undefined);
    };

    return (<AnimatePresence>
        <CenteredPageLayout key={1} title={"Home"} isModalOpen={open}>
            <BalanceCard/>
            <RecentTransactionsCard setSelectedTransaction={setSelectedTransaction}
                                    openTransactionModal={() => setOpen(true)}/>
        </CenteredPageLayout>
        <SideModal key={2} open={open} handleClose={handleClose}>
            <SideModal.Header>Transaction {selectedTransaction}</SideModal.Header>
            <SideModal.Body>This will be the description</SideModal.Body>
        </SideModal>
    </AnimatePresence>);
}

export default Home;