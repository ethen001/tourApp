import {storage} from './Constants';

//function to get the download url for Firebase Storage
export function getPicture(path) {
    //get the image doownload url form firebase storage and return it as a string
    storage.ref(path)
    .getDownloadURL()
    .then(url =>  {
        return url
    })
    .catch(error => console.log(error));
}
