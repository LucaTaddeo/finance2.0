import React from "react";
import {Avatar, Col, Row, Text} from "@nextui-org/react";
import {Button, styled} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import moment from "moment";

const CustomButton = styled(Button)(() => ({
    width: "100%", borderRadius: 10, padding: 5, paddingTop: 8, paddingBottom: 8
}))

const TransactionListElement = ({clickHandler, transaction}) => {
    let color, icon, amount;
    if (transaction?.amount > 0) {
        icon = <Add style={{fontSize: 20, color: "white"}} color={"white"}/>
        color = "primary";
        amount = transaction?.amount;
    } else {
        icon = <Remove style={{fontSize: 20, color: "white"}} color={"white"}/>
        color = "secondary";
        amount = "- "+Math.abs(transaction?.amount);
    }

    return (<>
        <CustomButton
            onClick={() => clickHandler()}
            variant={""}
        >
            <Row justify={"space-between"} style={{width: "100%", alignItems: "center"}}>
                <Row style={{alignItems: "center"}}>
                    <Avatar squared style={{marginRight: "0.5rem"}}
                            icon={icon} color={color} size="sm"/>
                    <Col style={{textAlign: "left"}}>
                        {transaction?.date && <Text size={13} transform="uppercase" color="grey" style={{marginBottom: 0}}>{moment(new Date(transaction?.date)).format("MMMM D")}</Text>}
                        <Text style={{margin: 0, lineHeight: 1.3}}>{transaction?.title}</Text>
                    </Col>
                </Row>
                <Text style={{margin: 0, whiteSpace: "nowrap"}}>{amount}</Text>
            </Row>
        </CustomButton>
    </>)
}

export default TransactionListElement;