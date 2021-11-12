import axios from 'axios';

export const editProfileInfo = (changes, id) => {
  console.log('SENDING', changes);
  return axios
    .put(`http://localhost:3000/user/edit/?user_id=${id}`, changes, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch(err => console.error('error recieved at editProfileInfo: ', err.response));
};

export const editProfilePicture = formData => {
  return fetch('url', formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const editPass = newPass => {
  console.log(`${newPass} in api helper`);
};
