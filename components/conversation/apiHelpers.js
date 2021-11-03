import conversationMockData from '../../data/conversationMockData.js';
import data from '../../data/data.js';

let messageData = conversationMockData;

// input: chatId: INTEGER (the chatId of the current conversation)
// output: an array of messages in GiftedChat format
const fetchMessages = (chatId) => {
  //will eventually query API for messages
  return formatMessages(messageData);
};

// converts messages into GiftedChat format
// NOTE: this is currently configured for test data and will be changed once connected to the API
const formatMessages = (messages) => {
  return messages
    .map((message) => {
      let formattedMessage = {};
      formattedMessage._id = message.messageid;
      formattedMessage.text = message.body;
      formattedMessage.createdAt = message.date;
      formattedMessage.user = convertUser(fetchUserData(message.uid));
      formattedMessage.image = message.photo ? message.photoid : undefined;
      return formattedMessage;
    })
    .reverse();
};

const convertUser = (incomingUser) => (
  {
    _id: incomingUser.uid,
    name: incomingUser.name,
    avatar: incomingUser.photo
  }
);

const fetchUserData = (userId) => {
  //will eventually fetch userData from API
  return data.filter(x => x.uid === userId)[0];
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

module.exports = {
  fetchMessages,
  getFriendName,
  getFriendAvatar,
  sendMessage,
  sendPicture,
  markAsRead,
  deleteImage,
  exitConversation
};