import { storage } from './config';

// Create a storage reference from our storage service
let storageRef = storage.ref();

//to upload profile pictures
export const uploadProfilePic = async (file) => {
    await storageRef.child(`profile-pictures/${file.name}`).put(file).snapshot.downloadURL;
}