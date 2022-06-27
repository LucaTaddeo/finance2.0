import React, {useState} from 'react';
import CenteredPageLayout from "../../components/CenteredPageLayout";
import {AnimatePresence} from "framer-motion";
import {SideModal} from "../../components/SideModal";
import RecentTransactionsCard from "../../components/Transaction/RecentTransactionsCard";
import BalanceCard from "../../components/BalanceCard";
import TransactionDetails from "../../components/Transaction/TrasactionDetails";
import {Popover, Button, Grid, Row, Text} from "@nextui-org/react";
import moment from "moment";
import {Create, Delete} from "@mui/icons-material";

const TransactionModal = ({selectedTransaction, handleClose, open}) => {
    let color;
    selectedTransaction?.amount > 0 ? color = "primary" : color = "secondary";
    return (<SideModal key={2} open={open} handleClose={handleClose}>
        {selectedTransaction?.date &&
            <SideModal.Overline text={moment(new Date(selectedTransaction?.date)).format("D MMMM YYYY, HH:mm")}/>}
        <SideModal.Body>
            <TransactionDetails transaction={selectedTransaction}/>
        </SideModal.Body>
        <SideModal.Footer>
            <Button color={color} style={{width: "-webkit-fill-available", marginRight: "1rem"}}><Create
                style={{marginRight: "0.5rem"}}/> Edit</Button>
            <Button color={"error"} icon={<Delete/>} auto></Button>
        </SideModal.Footer>
    </SideModal>)
}

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
        <TransactionModal selectedTransaction={selectedTransaction} open={open} handleClose={handleClose}/>
    </AnimatePresence>);
}

export default Home;