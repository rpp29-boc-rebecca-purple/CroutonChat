import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import messageData from '../data/conversationMockData.js';
import data from '../data/data.js';

const convertUser = (user) => (
  {
    _id: user.uid,
    name: user.name,
    avatar: user.photo
  }
);

const photoAdditionInterface = () => {
  return (
    <Image onPress={() => {alert('this will eventually prompt a photo selection')}} source={require('../assets/icons/camera.png')} style={{height: 32, width: 32, top: -8, marginLeft: 3}}/>
  )
};

const Conversation = ({ userId = 5 }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(messageData
      .map((message) => {
        let formattedMessage = {};
        formattedMessage._id = message.messageid;
        formattedMessage.text = message.body;
        formattedMessage.createdAt = message.date;
        formattedMessage.user = convertUser(data[message.uid]);
        formattedMessage.image = message.photo ? message.photoid : undefined;
        return formattedMessage;
      })
      .sort((a, b) => (a.createdAt < b.createdAt))
    )
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const unseenPhotoIndicator = ({currentMessage}) => {
    console.log('\n\n\narguments recieved by unseenPhotoIndicator:\n', currentMessage);
    return (
      <View style={{backgroundColor: '#a1dc91', height: 200, width: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: 10}}>
        <Text style={{color: '#24303a', textAlign: 'center'}}>Click here to view new photo from {data[userId].name}</Text>
      </View>
    )
  };

  return (
    <GiftedChat
      messages={messages}
      renderActions={photoAdditionInterface}
      renderMessageImage={unseenPhotoIndicator}
      onSend={messages => onSend(messages)}
      user={{
        _id: userId,
      }}
    />
  )
};

export default Conversation;



// const Conversation = () => {
//   return (
//     <ScrollView>
//       {
//         data.map((message) => {
//           return (
//           <Text>
//             {message.body}
//           </Text>
//           )
//         })
//       }
//     </ScrollView>
//   );
// };