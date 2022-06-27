import React from 'react';
import {Text} from "@nextui-org/react";

const TransactionDetails = ({transaction}) => {
    let color, sign;
    if (transaction?.amount > 0) {
        color = "primary";
        sign = "+ ";
    } else {
        color = "secondary";
        sign = "- ";
    }
    return (<>
            <Text color={color} size={30} weight={"bold"} style={{marginBottom: "0.75rem"}}>
                {sign}{Math.abs(transaction?.amount)}
            </Text>
            <Text size={21} style={{marginBottom: "0.5rem"}}>{transaction?.title}</Text>
            <Text>{transaction?.description}</Text>
        </>);
}

export default TransactionDetails;