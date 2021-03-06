import * as Network from "./network"

async function deleteEvent({id}){
    let res = await Network.authDelete({
        path: "api/deleteevent",
        body: {
            id,
            soft_delete: true
        }
    });
    let data = await res.json();
    return data;
};

async function createUpdateEvent({id, title, coverImage, category, description, type, location, latitude, longitude, startDateTime, endDateTime, status}){
    let formData = new FormData();
    // if (id) formData.append("id", id)
    // if (title) formData.append("title", title)
    // if (coverImage) formData.append("coverImage", coverImage)
    // if (category) formData.append("category", category)
    // if (description) formData.append("description", description)
    // if (type) formData.append("type", type)
    // if (location) formData.append("location", location)
    // if (latitude) formData.append("latitude", latitude)
    // if (longitude) formData.append("longitude", longitude)
    // if (startDateTime) formData.append("startDateTime", startDateTime)
    // if (endDateTime) formData.append("endDateTime", endDateTime)
    // if (status) formData.append("status", status)
    if(id) formData.append("id", id)
    formData.append("title", title)
    if(coverImage) formData.append("coverImage", coverImage)
    formData.append("category", category)
    formData.append("description", description)
    formData.append("type", type)
    formData.append("location", location)
    formData.append("latitude", latitude)
    formData.append("longitude", longitude)
    formData.append("startDateTime", startDateTime)
    formData.append("endDateTime", endDateTime)
    formData.append("status", status)
    let res = await Network.authPostWithFormData({
        path: "api/event/",
        formData
    });
    return res;
};

async function createUpdateEventImage({eventId, images}){
    let formData = new FormData();
    formData.append("eventId", eventId)
    for (var i = 0; i < images.length; i++) {
        let image = images[i];
        formData.append("image", image)
    }
    let res = await Network.authPostWithFormData({
        path: "api/createupdateeventimage/",
        formData
    });
    return res;
};

async function createUpdateTicketType({eventId, ticketTypes}){
    ticketTypes.map(ticketType => {
        ticketType.eventId = eventId
        return ticketType
    })
    for (const index in ticketTypes){
        let res = await Network.authPost({
            path: "api/tickettype/",
            body: ticketTypes[index]
        });
    }
};

async function getEventDashboard({eventId}){
    let res = await Network.authGet({
        path:  `api/geteventdashboard/${eventId}`
    })
    return res
}

async function getEvent({eventId}){
    let res = await Network.authGet({
        path:  `api/event/${eventId}`
    })
    return res
}

async function getEvents(){
    let res = await Network.get({
        path:  `api/event/`
    })
    return res
}

async function getTicketTypeStatus({id}){
    let res = await Network.authGet({
        path:  `api/gettickettypestatus/${id}`
    })
    return res
}

async function deleteTicketType({id}){
    let res= await Network.authDelete({
        path: `api/tickettype/${id}`
    })
    return res
}

async function getEventRegistrations({eventId, page}){
    let res = await Network.authPost({
        path:  `api/geteventregistrations/?page=${page}`,
        body: {
            eventId
        }
    })
    return res
}

async function getEventRegistration({eventId}){
    let res = await Network.authPost({
        path:  `api/geteventregistration/`,
        body: {
            eventId
        }
    })
    return res
}

async function getEventPerformance({eventId}){
    let res = await Network.authGet({
        path:  `api/geteventperformance/${eventId}`
    })
    return res
}

async function getEventPage({eventId}){
    let res = await Network.get({
        path:  `api/geteventpage/${eventId}`
    })
    return res
}

async function getRelatedEvents({eventId}){
    let res = await Network.get({
        path:  `api/getrelatedevents/${eventId}`
    })
    return res
}

async function getEventTicketType({eventId}){
    let res = await Network.get({
        path:  `api/geteventtickettype/${eventId}`
    })
    return res
}

async function getEventSearchPage({page, searchParams, category, type, location}){
    let res = await Network.post({
        path : `api/geteventsearchpage/?page=${page}&search=${searchParams}`,
        body: {
            category,
            type,
            location
        }
    })
    return res
}

export { 
    deleteEvent, createUpdateEvent, createUpdateEventImage, createUpdateTicketType, getEventDashboard, 
    getEvent, getEvents, getTicketTypeStatus, deleteTicketType, getEventRegistrations, getEventRegistration, getEventPerformance,
    getEventPage, getRelatedEvents, getEventTicketType, getEventSearchPage
}