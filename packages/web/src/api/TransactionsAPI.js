const bankAccounts = [{
    _id: "idVB",
    name: "Volksbank",
    description: "Description for Volksbank",
    balance: 0,
    foreseenBalance: 0,
    transactions: [],
    accountType: "account"
}, {
    _id: "idCash",
    name: "Cash",
    description: "Description for Cash",
    balance: 1245.3,
    foreseenBalance: 1235,
    transactions: [],
    accountType: "account"
}]

const transactions = [{
    _id: "idT1",
    title: "Transaction 1",
    amount: 1253.23,
    accountsDetails: {account: bankAccounts[0], amount: 1253.23},
    date: Date.now()
}, {
    _id: "idT2",
    title: "Transaction 2",
    description: "This is a descriptionThis is a descriptionThis is a descriptionThis is a descriptionThis is a descriptionThis is a descriptionThis is a descriptionThis is a description",
    amount: -1253.23,
    accountsDetails: {account: bankAccounts[0], amount: -1253.23}, date: Date.now()
}, {
    _id: "idT3", title: "Transaction 3", amount: 1253.23, accountsDetails: {account: bankAccounts[0], amount: 1253.23}
}, {
    _id: "idT4",
    title: "Transaction 4",
    description: "This is a description",
    amount: -1253.23,
    accountsDetails: {account: bankAccounts[0], amount: -1253.23}
}, {
    _id: "idT5",
    title: "Transaction 5",
    description: "This is a description",
    amount: 124124,
    accountsDetails: {account: bankAccounts[0], amount: -1253.23}
}]


export async function getRecentTransactions() {
    return transactions;
}