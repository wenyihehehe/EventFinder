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

async function getRegistrationOrder({registrationId}){
    let res = await Network.authGet({
        path: `api/registration/${registrationId}`,
    });
    return res;
}

async function createReview({registrationId, rating, comment}){
    let res = await Network.authPost({
        path: "api/review/",
        body: {
            registrationId,
            rating,
            comment
        }
    });
    return res;
}

export { 
    getEventAttendeesSearchPage, updateAttendance, createRegistration, createTicket, getRegistrationOrder, createReview
}