import Cookie from "js-cookie"
import * as Network from "./network"

async function login({ email, password }){
    let res = await Network.post({
        path: "auth/",
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

async function forgotPassword({ email }){
    let res = await Network.post({
        path: "api/reset-password/",
        body: {
            email,
        }
    });
    return res;
};

async function resetPassword({ token, password }){
    let res = await Network.post({
        path: "api/reset-password-custom/",
        body: {
            token,
            password
        }
    });
    return res;
};

function storeTokenInCookie({ token, expiry = 7 }) {
    Cookie.set("token", token, { expires: expiry });
};

function logout(){
    Cookie.remove("token");
};

export { login, signup, forgotPassword, resetPassword, storeTokenInCookie, logout }

