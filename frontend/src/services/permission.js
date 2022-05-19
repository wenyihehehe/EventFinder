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

export { getIsRegistrationOwnerOrEventOwner, getHaveOrganizerProfile, getHaveOrganizerProfileIsOrganizer}

