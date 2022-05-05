import * as Network from "./network"

async function getUserProfileEventRegistrations(){
    let res = await Network.authGet({
        path: "api/getuserprofileeventregistrations",
    });
    return res;
};

async function getRegistrations(){
    let res = await Network.authGet({
        path: "api/getregistrations",
    });
    return res;
};

async function getOrganizerProfileEventRegistrations(){
    let res = await Network.authGet({
        path: "api/getorganizerprofileeventregistrations",
    });
    return res;
};

async function getOrganizingEvents(){
    let res = await Network.authGet({
        path: "api/getorganizingevent",
    });
    return res;
};

async function getOrganizingEventsSearchPage({searchParams, page}){
    let res = await Network.authGet({
        path: `api/getorganizingeventsearchpage?page=${page}&search=${searchParams}`,
    });
    return res;
};

async function getOrganizedEventReviews({page}){
    let res = await Network.authPost({
        path: `api/getorganizedeventreviews?page=${page}`,
    });
    return res;
};

async function getUserProfile(){
    let res = await Network.authGet({
        path: "api/user",
    });
    return res;
};

async function getOrganizerProfile(){
    let res = await Network.authGet({
        path: "api/organizerprofile",
    });
    return res;
};

async function getAddress(){
    let res = await Network.authGet({
        path: "api/address",
    });
    return res;
};

async function updateUserProfile({firstName, lastName, profileImage, contactNumber}){
    let formData = new FormData();
	formData.append("firstName", firstName);
	formData.append("lastName", lastName);
    if(profileImage){
        formData.append("profileImage", profileImage);
    }
	formData.append("contactNumber", contactNumber);
    let res = await Network.authPatchWithFormData({
        path: "api/updateuserprofile/",
        formData
    });
    return res;
};

async function updateOrganizerProfile({organizerName, profileImage, contactNumber, description}){
    let formData = new FormData();
    formData.append("organizerName", organizerName);
    if(profileImage){
        formData.append("profileImage", profileImage);
    }
	formData.append("contactNumber", contactNumber);
	formData.append("description", description);
    let res = await Network.authPatchWithFormData({
        path: "api/updateorganizerprofile/",
        formData
    });
    return res;
};

async function createUpdateAddress({address, address2, city, postalCode, state, country}){
    let res = await Network.authPost({
        path: "api/address/",
        body: {
            address,
            address2,
            city,
            postalCode,
            state,
            country
        }
    });
    return res;
};

async function changePassword({currentPassword, newPassword}){
    let res = await Network.authPut({
        path: "api/changepassword/",
        body: {
            currentPassword,
            newPassword
        }
    });
    return res;
};

export { 
    getUserProfileEventRegistrations, getRegistrations, getOrganizerProfileEventRegistrations, getOrganizingEvents, 
    getOrganizingEventsSearchPage, getOrganizedEventReviews, getUserProfile, getOrganizerProfile, getAddress, 
    updateUserProfile, updateOrganizerProfile, createUpdateAddress, changePassword
}

