import React from "react";
import {Button, Text} from "@nextui-org/react";

const TransactionListElement = ({clickHandler, transaction}) => {
    return (<>
        <Button
            onClick={() => clickHandler()}
            light
            style={{
                width: "100%", textAlign: "left", justifyContent: "left",
            }}>
            <Text style={{margin: 0}}>Transaction {transaction}</Text>
        </Button>
    </>)
}

export default TransactionListElement;