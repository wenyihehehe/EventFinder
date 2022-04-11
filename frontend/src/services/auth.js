import Cookie from "js-cookie"
import * as Network from "./network"

async function login({ email, password }){
    let res = await Network.post({
        path: "api/auth/",
        body: {
            username: email,
            password
        }
    });
    return res;
};

async function signup({ firstName, lastName, contactNumber, email, password }){
    let res = await Network.post({
        path: "api/user/",
        body: {
            email,
            password,
            firstName,
            lastName,
            contactNumber
        }
    });
    return res;
};

function storeTokenInCookie({ token, expiry }) {
    Cookie.set("token", token, { expires: expiry });
};

function logout(){
    Cookie.remove("token");
};

export { login, signup, storeTokenInCookie, logout }

