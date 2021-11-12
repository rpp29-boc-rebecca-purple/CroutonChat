import data from '../../data/data.js';
import axios from 'axios';

const CHAT_API = 'http://3.133.100.147:2550';

// input: chatId: INTEGER (the chatId of the current conversation)
// output: an array of messages in GiftedChat format
const fetchMessages = (chatId, userId) => {
  console.log(`\nARGUMENTS RECEIVED IN FETCH MESSAGES:\nchatId: ${chatId}, userId: ${userId}\n`);
  return axios({
    method: 'GET',
    url: `${CHAT_API}/conversation?chatId=${chatId}&senderId=${userId}`,
  })
  .then((res) => {
    console.log('\n\nunformatted messages received from fetchMessages:', res.data);
    return formatMessages(res.data, userId);
  })
  .catch((err) => {
    console.log('conversation retrieval failed\n', err);
  })
};

// converts messages into GiftedChat format
const formatMessages = (messages, currentUserId) => {
  return messages
    .map((message) => {
      let formattedMessage = {};
      formattedMessage._id = message.messageid;
      formattedMessage.text = message.body;
      formattedMessage.createdAt = Date.parse(message.time);
      formattedMessage.user = createGiftedUser(Number(message.senderid), currentUserId);
      formattedMessage.image = message.photourl !== null ? message.photourl : undefined;
      return formattedMessage;
    })
    .reverse();
};

const createGiftedUser = (incomingUserId, userId) => {
  console.log(`\n\n\ncreateGiftedChat entered\nincomingUserId: ${incomingUserId}\nuserId: ${userId}\nstored friendId: ${currentFriendId}`);
  return incomingUserId === currentFriendId ? {
    _id: currentFriendId,
    name: friendName,
    avatar: friendAvatar
  } : {
    _id: userId
  }
};

//input: an array of new messages
const sendMessage = async (message, chatId) => {
  const formData = new FormData();
  formData.append('chatId', chatId);
  formData.append('senderId', message.user._id);
  formData.append('body', message.text);
  formData.append('date', message.createdAt);
  return await fetch('http://3.133.100.147:2550/add-message', {
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
      return response.json();
    } else {
      console.log('message send failed');
    }
  })
  .then((newData) => {
    console.log('\nunformatted repsonse data from sendMessage:', newData);
    return formatMessages(newData, message.user._id);
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
      'content-type': 'application/json',
    },
  })
  .then((response) => {
    if (response.status === 200) {
      console.log('conversation creation successful', response);
      return response.json();
    } else {
      console.log('conversation creation failed');
    }
  })
  .then((newData) => {
    return formatMessages(newData, message.user._id);
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

const setConversationInfo = (id, name, avatar) => {
  currentFriendId = id;
  friendName = name;
  friendAvatar = avatar;
};

const getFriendName = (friendId) => {
  return friendName;
};

const getFriendAvatar = (friendId) => {
  return friendAvatar;
};

const exitConversation = () => {
  currentFriendId = null;
  friendName = null;
  friendAvatar = null;
};



module.exports = {
  fetchMessages,
  setConversationInfo,
  getFriendName,
  getFriendAvatar,
  sendMessage,
  startConversation,
  deleteImage,
  exitConversation,
  saveImage,
  noteScreenShot
};

