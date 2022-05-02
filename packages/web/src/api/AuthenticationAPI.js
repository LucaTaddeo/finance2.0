import axios from "axios";
import {API} from "../constants/apiUrl";
import {JSON_HEADERS} from "../constants/apiJsonHeader";

export async function login(username, password) {
    return axios.post(API + "/auth/login",
        {username: username, password: password},
        {...JSON_HEADERS}
    );
}

export async function signup(firstName, lastName, username, password) {
    return axios.post(API + "/auth/signup",
        {firstName: firstName, lastName: lastName, username: username, password: password},
        {...JSON_HEADERS}
    );
}