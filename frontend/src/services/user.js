import * as Network from "./network"

async function getUserProfile(){
    let res = await Network.authGet({
        path: "api/getuserprofile",
    });
    return res;
};

async function getRegistrations(){
    let res = await Network.authGet({
        path: "api/getregistrations",
    });
    return res;
};

export { getUserProfile, getRegistrations }

