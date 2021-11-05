import conversationMockData from '../../data/conversationMockData.js';
import data from '../../data/data.js';
import axios from 'axios';

const CHAT_API = 'http://3.133.100.147:2550';
let messageData = conversationMockData;

// input: chatId: INTEGER (the chatId of the current conversation)
// output: an array of messages in GiftedChat format
const fetchMessages = (chatId) => {
  return axios({
    method: 'GET',
    url: `${CHAT_API}/conversation?chatId=${chatId}`,
  })
  .then((res) => {
    console.log('conversation retrieval successful\n', res.data);
    let formattedData = formatMessages(res.data);
    console.log('messages in GiftedChat format: ', JSON.stringify(formattedData));
    return formattedData;
  })
  .catch((err) => {
    console.log('conversation retrieval failed\n', err);
  })
};

// converts messages into GiftedChat format
// NOTE: this is currently configured for test data and will be changed once connected to the API
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

let chatId = undefined;
let currentMessages = [{"_id":15,"text":null,"createdAt":"2021-11-05T01:44:04.630Z","user":{"_id":3,"name":"Snowy","avatar":22},"image":"https://croutonchat.s3.us-east-2.amazonaws.com/05D24C1B-77C6-4492-875A-BA365594C7F7.jpg"},{"_id":2,"text":"Language, please...","createdAt":"2021-11-05T01:39:17.539Z","user":{"_id":5,"name":"Ruffalot","avatar":24}},{"_id":1,"text":"barking meow, I just stubbed my paw","createdAt":"2021-11-05T01:39:17.539Z","user":{"_id":4,"name":"Bork","avatar":23}}];

const getMessages = () => {
  return currentMessages;
};

const convertUser = (incomingUser) => {
  console.log('\n\n\nincoming user data to be converted:', incomingUser)
  return {
    _id: incomingUser.uid,
    name: incomingUser.name,
    avatar: incomingUser.photo
  }
};

const fetchUserData = (userId) => {
  //will eventually fetch userData from API
  console.log('FETCH USER DATA ENTERED')
  let dataCopy = data.sort((a,b) => a.uid < b.uid);
  console.log('\n\n\nDATACOPY:', dataCopy);
  let foundUser = dataCopy.filter(x => x.uid === userId)[0];
  console.log('user found in fetchUserData:', foundUser);
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
const sendMessage = () => {
  //will eventually post text message to API
};

const sendPicture = () => {
  //will eventually post picture message to API
};

const markAsRead = () => {
  //will eventually send read receipts to API
};

const deleteImage = (chatId, messageId) => {
  //will eventually send an API call to delete the viewed image
  messageData = messageData.filter((x) => x.messageid !== messageId);
};

const exitConversation = () => {
  currentFriendId = null;
  friendName = null;
  friendAvatar = null;
};

// currentMessages = fetchMessages(12);
// setInterval(() => {currentMessages = fetchMessages(12); console.log('current messages:', currentMessages)}, 5000);

module.exports = {
  fetchMessages,
  getMessages,
  getFriendName,
  getFriendAvatar,
  sendMessage,
  sendPicture,
  markAsRead,
  deleteImage,
  exitConversation
};

