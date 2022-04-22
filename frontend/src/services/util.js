import * as Network from "./network"

async function getCategory(){
    let res = await Network.get({
        path: "utility/getcategory/",
    });
    return res;
};

async function getDefaultCoverImage(){
    let res = await Network.get({
        path: "utility/getdefaultcoverimage/",
    });
    return res;
};

export { 
    getCategory, getDefaultCoverImage
}