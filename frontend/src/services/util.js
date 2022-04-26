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

async function fetchImage({imageUrl}){
    let res = await fetch(imageUrl);
    const blob = await res.blob()
    const file = new File([blob], 'image.png')
    return file
}

export { 
    getCategory, getDefaultCoverImage, fetchImage
}