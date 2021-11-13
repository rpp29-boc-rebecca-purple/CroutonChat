import axios from 'axios';

export const editProfileInfo = (changes, id) => {
  return axios
    .put(`http://18.219.200.72:8080/user/edit/?user_id=${id}`, changes, {
      headers: {
        Accept: 'application/json',
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
