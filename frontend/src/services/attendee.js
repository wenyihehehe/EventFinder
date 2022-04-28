import * as Network from "./network"

async function getEventAttendeesSearchPage({eventId, searchParams, page}){
    let res = await Network.authPost({
        path: `api/geteventattendeessearchpage/?page=${page}&search=${searchParams}`,
        body: {
            eventId
        }
    });
    return res;
};

async function updateAttendance({id, status}){
    let res = await Network.authPatch({
        path: `api/ticket/${id}/`,
        body: {
            status
        }
    })
    return res;
}

export { 
    getEventAttendeesSearchPage, updateAttendance
}