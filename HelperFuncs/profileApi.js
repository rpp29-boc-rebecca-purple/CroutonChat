import axios from 'axios';

const editProfileInfo = (changes) => {
  // axios.PUT('routeurl', changes)
  // .then(res => console.log(res))
  console.log(`${changes} in api helper`)
}

const editPass = (newPass) => {
  console.log(`${newPass} in api helper`)
}

module.exports = editProfileInfo, editPass;