import * as Network from "./network"

async function getIsRegistrationOwnerOrEventOwner({ id }){
    let res = await Network.authPost({
        path: "permission/getisregistrationowneroreventowner/",
        body: {
            id
        }
    });
    return res;
};

async function getHaveOrganizerProfile(){
    let res = await Network.authGet({
        path: "permission/gethaveorganizerprofile/"
    })
    return res;
};

async function getHaveOrganizerProfileIsOrganizer({ id }){
    let res = await Network.authPost({
        path: "permission/gethaveorganizerprofileisorganizer/",
        body: {
            id
        }
    });
    return res;
};

async function getOrganizerExist({ organizerId }){
    let res = await Network.post({
        path: "permission/getorganizerexist/",
        body: {
            organizerId
        }
    });
    return res;
}

async function getEventExist({ eventId }){
    let res = await Network.post({
        path: "permission/geteventexist/",
        body: {
            eventId
        }
    });
    return res;
}

export { getIsRegistrationOwnerOrEventOwner, getHaveOrganizerProfile, getHaveOrganizerProfileIsOrganizer, getOrganizerExist, getEventExist}

