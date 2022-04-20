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

export { 
    deleteEvent
}