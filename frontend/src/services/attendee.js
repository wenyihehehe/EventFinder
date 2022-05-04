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

async function createRegistration({eventId}){
    let res = await Network.authPost({
        path: "api/registration/",
        body: {
            eventId
        }
    });
    return res
}

async function createTicket({registrationId, order}){
    let tickets = []
    order.forEach(order=> {
        for (var i = 0 ; i < order.quantity ; i ++ ){
            let ticket = {
                registration: registrationId,
                ticketType: order.id
            }
            tickets.push(ticket)
        }
    })
    for(const index in tickets){
        await Network.authPost({
            path: "api/ticket/",
            body: tickets[index]
        });
    }
}

export { 
    getEventAttendeesSearchPage, updateAttendance, createRegistration, createTicket
}