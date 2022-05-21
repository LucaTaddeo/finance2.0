import {
    AccountBalanceTwoTone, AccountBalanceWalletTwoTone,
    AnalyticsTwoTone,
    CurrencyExchangeTwoTone,
    HomeTwoTone,
    SettingsTwoTone
} from "@mui/icons-material";
import {Text} from "@nextui-org/react";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

export const PAGES = {
    HOME: "Home",
    STATS: "Statistics",
    TRANSACTIONS_LIST: "Transactions List",
    WALLET: "Wallet",
    BANK_ACCOUNT: "Bank Account",
    TRANSACTION: "Transaction",
    SETTINGS: "Settings"
};

export const routes = [
    {
        index: true,
        name: PAGES.HOME,
        icon: <HomeTwoTone/>,
        path: "/",
        section: 1,
        component: <Home />
    },
    {
        name: PAGES.TRANSACTIONS_LIST,
        icon: <AccountBalanceWalletTwoTone/>,
        path: "/transactions",
        component: <Text>Transactions</Text>,
        hideNavbar: true
    },
    {
        name: PAGES.WALLET,
        section: 1,
        icon: <AccountBalanceWalletTwoTone/>,
        path: "/wallet",
        component: <Wallet />
    },
    {
        name: PAGES.STATS,
        icon: <AnalyticsTwoTone/>,
        path: "/stats",
        section: 1,
        component: <Stats />
    },
    {
        name: PAGES.BANK_ACCOUNT,
        icon: <AccountBalanceTwoTone/>,
        path: "/bankAccount/:id",
        component: <Text>Single Bank Account</Text>
    },
    {
        name: PAGES.TRANSACTION,
        icon: <CurrencyExchangeTwoTone/>,
        path: "/transaction/:id",
        component: <Text>Single Transaction</Text>
    },
    {
        name: PAGES.SETTINGS,
        icon: <SettingsTwoTone/>,
        path: "/settings",
        section: 2,
        component: <Settings />
    }
];