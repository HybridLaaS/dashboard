import { APIResponse, getAPIHost, POST_FIELDS } from "./util.js";

export async function createAccount(email, firstName, lastName, password) {
    const response = await fetch(getAPIHost() + "/user/create", {
        ...POST_FIELDS,
        body: JSON.stringify({
            email: email.toString().toLowerCase(),
            firstName: firstName,
            lastName: lastName,
            password: password
        })
    });

    return new APIResponse(response.status, null);
}

export async function verifyAccount(email, token) {
    const response = await fetch(getAPIHost() + "/user/verify", {
        ...POST_FIELDS,
        body: JSON.stringify({
            email: email.toString().toLowerCase(),
            token: token
        })
    });

    return new APIResponse(response.status, response.status === 200 ? await response.json() : null);
}

export async function login(email, password) {
    const response = await fetch(getAPIHost() + "/user/login", {
        ...POST_FIELDS,
        body: JSON.stringify({
            email: email.toString().toLowerCase(),
            password: password
        })
    });

    return new APIResponse(response.status, null);
}

export async function logout() {
    const response = await fetch(getAPIHost() + "/user/logout", {
        credentials: "include"
    });

    return new APIResponse(response.status, null);
}

export async function deleteUser() {
    const response = await fetch(getAPIHost() + "/user/delete", {
        method: "DELETE",
        credentials: "include"
    });

    return new APIResponse(response.status, null);
}

export async function getMe() {
    const response = await fetch(getAPIHost() + "/user/me", {
        credentials: "include"
    });

    return new APIResponse(response.status, response.status === 200 ? await response.json() : null);
}