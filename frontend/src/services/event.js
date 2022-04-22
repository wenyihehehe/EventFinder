import * as Network from "./network"

async function deleteEvent({id}){
    let res = await Network.authDelete({
        path: "api/deleteevent",
        body: {
            id,
            soft_delete: true
        }
    });
    return res;
};

async function createEvent({title, coverImage, category, description, type, location, startDateTime, endDateTime, status}){
    let formData = new FormData();
    if (title) formData.append("title", title)
    if (coverImage) formData.append("coverImage", coverImage)
    if (category) formData.append("category", category)
    if (description) formData.append("description", description)
    if (type) formData.append("type", type)
    if (location) formData.append("location", location)
    if (startDateTime) formData.append("startDateTime", startDateTime)
    if (endDateTime) formData.append("endDateTime", endDateTime)
    if (status) formData.append("status", status)
    let res = await Network.authPostWithFormData({
        path: "api/event/",
        formData
    });
    return res;
};

async function createEventImage({eventId, images}){
    let formData = new FormData();
    formData.append("eventId", eventId)
    for (var i = 0; i < images.length; i++) {
        let image = images[i];
        formData.append("image", image)
    }
    let res = await Network.authPostWithFormData({
        path: "api/createEventImage/",
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

export { 
    deleteEvent, createEvent, createEventImage, createUpdateTicketType
}