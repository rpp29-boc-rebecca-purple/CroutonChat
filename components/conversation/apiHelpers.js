import data from '../../data/data.js';
import axios from 'axios';

const CHAT_API = 'http://3.133.100.147:2550';

// input: chatId: INTEGER (the chatId of the current conversation)
// output: an array of messages in GiftedChat format
const fetchMessages = (chatId, userId) => {
  return axios({
    method: 'GET',
    url: `${CHAT_API}/conversation?chatId=${chatId}&senderId=${userId}`,
  })
  .then((res) => {
    // console.log('conversation retrieval successful\n', res.data);
    let formattedData = formatMessages(res.data);
    // console.log('messages in GiftedChat format: ', JSON.stringify(formattedData));
    return formattedData;
  })
  .catch((err) => {
    console.log('conversation retrieval failed\n', err);
  })
};

// converts messages into GiftedChat format
const formatMessages = (messages) => {
  return messages
    .map((message) => {
      let formattedMessage = {};
      formattedMessage._id = message.messageid;
      formattedMessage.text = message.body;
      formattedMessage.createdAt = message.time;
      formattedMessage.user = convertUser(fetchUserData(Number(message.senderid)));
      formattedMessage.image = message.photourl !== null ? message.photourl : undefined;
      return formattedMessage;
    })
    .reverse();
};

const convertUser = (incomingUser) => {
  // console.log('\n\n\nincoming user data to be converted:', incomingUser)
  return {
    _id: incomingUser.uid,
    name: incomingUser.name,
    avatar: incomingUser.photo
  }
};

const fetchUserData = (userId) => {
  //will eventually fetch userData from API
  let dataCopy = data.sort((a,b) => a.uid < b.uid);
  let foundUser = dataCopy.filter(x => x.uid === userId)[0];
  return foundUser;
};

//variables for storing current friend info
let currentFriendId = null;
let friendName = null;
let friendAvatar = null;

const getFriendName = (friendId) => {
  if (friendId === currentFriendId) {
    return friendName;
  } else {
    let newFriendInfo = fetchUserData(friendId);
    currentFriendId = friendId;
    friendName = newFriendInfo.name;
    friendAvatar = newFriendInfo.photo;
    return friendName;
  }
};

const getFriendAvatar = (friendId) => {
  if (friendId === currentFriendId) {
    return friendAvatar;
  } else {
    let newFriendInfo = fetchUserData(friendId);
    currentFriendId = friendId;
    friendName = newFriendInfo.name;
    friendAvatar = newFriendInfo.photo;
    return friendAvatar;
  }
};

//input: an array of new messages
const sendMessage = async (message, chatId) => {
  const formData = new FormData();
  formData.append('chatId', chatId);
  formData.append('senderId', message.user._id);
  formData.append('body', message.text);
  formData.append('date', message.createdAt);
  await fetch('http://3.133.100.147:2550/add-message', {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
  })
  .then((response) => {
    if (response.status === 200) {
      console.log('message send successful', response);
    } else {
      console.log('message send failed', response);
    }
  })
};

const startConversation = async (message, friendId) => {
  const formData = new FormData();
  formData.append('senderId', message.user._id);
  formData.append('userId2', friendId);
  formData.append('body', message.text);
  return await fetch('http://3.133.100.147:2550/new-conversation', {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'content-type': 'multipart/form-data',
    },
  })
  .then((response) => {
    if (response.status === 200) {
      console.log('conversation creation successful', response);
    } else {
      console.log('conversation creation failed', response);
    }
  })
};

const markAsRead = () => {
  //will eventually send read receipts to API
};

const deleteImage = (chatId, messageId, imageUrl) => {
  const formData = new FormData();
  formData.append('chatId', chatId);
  formData.append('messageId', messageId);
  formData.append('url', JSON.stringify(imageUrl));
  fetch(`http://3.133.100.147:2550/delete-photo?chatId=${chatId}&messageId=${messageId}&url=${imageUrl}`, {
    method: 'DELETE'
  })
  .then((response) => {
    if (response.status === 200) {
      console.log('image deletion successful', response);
    } else {
      console.log('image deletion failed', response);
    }
  })
};

const saveImage = () => {

};

const exitConversation = () => {
  currentFriendId = null;
  friendName = null;
  friendAvatar = null;
};



module.exports = {
  fetchMessages,
  getFriendName,
  getFriendAvatar,
  sendMessage,
  startConversation,
  markAsRead,
  deleteImage,
  exitConversation,
  saveImage
};

