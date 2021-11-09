import axios from 'axios';
import { id } from '../data/profileData';

export const editProfileInfo = (changes, id) => {
  axios.put(`http://18.219.200.72:8080/user/edit/?user_id=${id}`, changes)
    .then(res => console.log(res))

}

export const editProfilePicture = (pic) => {
  fetch('url', pic, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
}

export const editPass = (newPass) => {
  console.log(`${newPass} in api helper`)
}

