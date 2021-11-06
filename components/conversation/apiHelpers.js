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
    return formatMessages(res.data);
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
      console.log('message send failed');
    }
  })
};

const startConversation = async (message, friendId) => {
  console.log('message recieved at startConversation:', message);
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
      console.log('conversation creation successful');
    } else {
      console.log('conversation creation failed');
    }
  })
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
      console.log('image deletion successful');
    } else {
      console.log('image deletion failed');
    }
  })
};

let screenShotRecentlyRecorded = false;
const noteScreenShot = (chatId, userId) => {
  if (!screenShotRecentlyRecorded) {
    screenShotRecentlyRecorded = true;
    console.log('note screen shot called');
    let message = {
      text: 'Your photo was saved.',
      createdAt: new Date(),
      user: {
        _id: userId
      }
    };
    sendMessage(message, chatId);
    setTimeout(() => {screenShotRecentlyRecorded = false}, 5000);
  }

};

const saveImage = (url) => {
};

const fetchUserData = (userId) => {
  //will pull from user data retrieved in App
  let dataCopy = data;
  return dataCopy.filter(x => x.uid === userId)[0];
};

//variables for storing current friend info
let currentFriendId = null;
let friendName = null;
let friendAvatar = null;

const getFriendName = (friendId) => {
  //will pull from user data retrieved in App
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
  //will pull from user data retrieved in App
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
  deleteImage,
  exitConversation,
  saveImage,
  noteScreenShot
};

