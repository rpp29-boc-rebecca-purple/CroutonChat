import axios from 'axios';

export const editProfileInfo = (changes) => {
  axios.put(`http://18.219.200.72:8080/user/edit/?user_id=25`, changes)
    .then(res => console.log(res))

}

export const editPass = (newPass) => {
  console.log(`${newPass} in api helper`)
}

