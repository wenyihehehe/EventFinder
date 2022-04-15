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

async function getOrganizerProfile(){
    let res = await Network.authGet({
        path: "api/getorganizerprofile",
    });
    return res;
};

async function getOrganizingEvents(){
    let res = await Network.authGet({
        path: "api/getorganizingevent",
    });
    return res;
};

async function getReviews(){
    let res = await Network.authGet({
        path: "api/review",
    });
    return res;
};

export { getUserProfile, getRegistrations, getOrganizerProfile, getOrganizingEvents, getReviews }

