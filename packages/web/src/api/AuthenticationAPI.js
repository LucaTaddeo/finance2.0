import axios from "axios";
import {API} from "../constants/apiUrl";

export async function login (username, password) {
    return axios.post(API + "/auth/login", {username: username, password: password}, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
    });
}