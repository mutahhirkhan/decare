import { storage } from './config';

// Create a storage reference from our storage service
let storageRef = storage.ref();

//to upload profile pictures
export const uploadProfilePic = async (file, name) => {
    await storageRef.child(`profile-pictures/${name}`).put(file);
    const url = await storageRef.child(`profile-pictures/${name}`).getDownloadURL();
    return url;
}

export const deleteProfilePic = async (filename) => {
    await storageRef.child(`profile-pictures/${filename}`).delete();
}