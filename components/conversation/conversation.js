import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Pressable } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import messageData from '../../data/conversationMockData.js';
import data from '../../data/data.js';

const convertUser = (user) => (
  {
    _id: user.uid,
    name: user.name,
    avatar: user.photo
  }
);

const photoAdditionInterface = () => {
  return (
    <Image onPress={() => {alert('this will eventually prompt a photo selection')}} source={require('../../assets/icons/camera.png')} style={{height: 32, width: 32, top: -8, marginLeft: 3}}/>
  )
};

const Conversation = ({ userId = 5 }) => {
  let [messages, setMessages] = useState([]);
  let [spotlightPic, setSpotlightPic] = useState('https://cdn.pixabay.com/photo/2014/04/21/18/31/dog-329280__480.jpg');
  let [picDisplay, setPicDisplay] = useState(false);

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
      .reverse()
    )
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  const unopenedImage = ({currentMessage}) => {
    console.log('\n\n\narguments recieved by unseenPhotoIndicator:\n', currentMessage);
    return (
      <Pressable onPress={() => { setSpotlightPic(currentMessage.image); setPicDisplay(true); }} style={{backgroundColor: '#a1dc91', height: 200, width: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: 10}}>
        <Text style={{color: '#24303a', textAlign: 'center'}}>Click here to view new photo from {data[userId].name}</Text>
      </Pressable>
    );
  };

  return picDisplay ?
    (
    <View>
      <Text onPress={() => {setPicDisplay(false)}}>pic now shows</Text>
      <Image source={{uri: spotlightPic}} style = {{height: Dimensions.get('window').height / 1.5, width: Dimensions.get('window').width, resizeMode: 'contain'}}/>
    </View>
    )
    :
    (
    <GiftedChat
      messages={messages}
      renderActions={photoAdditionInterface}
      renderMessageImage={unopenedImage}
      onSend={messages => onSend(messages)}
      user={{
        _id: userId,
      }}
    />
    );

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