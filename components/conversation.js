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
    <View  style={{height: 15, display: 'flex', flexDirection: 'row'}}>
      <Image onPress={() => {alert('this will eventually prompt a photo selection')}} source={require('../assets/icons/camera.png')} style={{height: 25, width: 25}}/>
      <Text>Send a photo</Text>
    </View>
  )
};

const Conversation = ({ userId = 5 }) => {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  useEffect(() => {
    setMessages(messageData
      .map((message) => {
        let formattedMessage = {};
        formattedMessage._id = message.messageid;
        formattedMessage.text = message.body;
        formattedMessage.createdAt = message.date;
        formattedMessage.user = convertUser(data[message.uid]);
        return formattedMessage;
      })
      .sort((a, b) => (a.createdAt < b.createdAt))
    )
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      renderAccessory={photoAdditionInterface}
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