export const PAGES = {
    HOME: "Home",
    BANK_ACCOUNT: "Bank Account",
    TRANSACTION: "Transaction",
    SETTINGS: "Settings"
};

export const routes = [
    {
        index: true,
        name: PAGES.HOME,
        icon: "",
        path: ""
    },
    {
        name: PAGES.BANK_ACCOUNT,
        icon: "",
        path: "bankAccount/:id"
    },
    {
        name: PAGES.TRANSACTION,
        icon: "",
        path: "transaction/:id"
    },
    {
        name: PAGES.SETTINGS,
        icon: "",
        path: "settings"
    }
];