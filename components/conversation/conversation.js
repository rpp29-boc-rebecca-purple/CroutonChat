import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Pressable } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { ProgressBar } from 'react-native-paper';
const api = require('./apiHelpers.js');

const photoAdditionInterface = () => {
  return (
    <Pressable onPress={() => {alert('This will eventually prompt a photo selection.')}}>
      <Image source={require('../../assets/icons/camera.png')} style={{height: 32, width: 32, top: -8, marginLeft: 3}}/>
    </Pressable>
  )
};

const Conversation = ({ userId = 5, friendId = 4, chatId = 0 }) => {
  let [messages, setMessages] = useState([]);
  let [spotlightPic, setSpotlightPic] = useState('');
  let [picDisplay, setPicDisplay] = useState(false);
  let [progressBarFill, setProgressBarFill] = useState(1);

  useEffect(() => {
    setMessages(api.fetchMessages())
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log('messages recieved at onSend:\n', )
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    api.sendMessage
  }, []);

  const handleImageViewing = (imgUrl, messageId) => {
    api.deleteImage(chatId, messageId);
    setSpotlightPic(imgUrl);
    setPicDisplay(true);
    setProgressBarFill(1);
    let viewingStartTime = Date.now();
    let incrementProgressBar = setInterval(() => { setProgressBarFill(1 - ((Date.now() - viewingStartTime) / 10000)); }, 50);
    setTimeout(() => {
      setMessages(api.fetchMessages());
      setPicDisplay(false);
      clearInterval(incrementProgressBar);
    }, 10000);
  };

  const unopenedImage = ({currentMessage}) => {
    return (
      <Pressable onPress={() => { handleImageViewing(currentMessage.image, currentMessage._id); }} style={{backgroundColor: '#a1dc91', height: 200, width: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: 10}}>
        <Text style={{color: '#24303a', textAlign: 'center'}}>Click here to view new photo from {api.fetchUserData(friendId).name}</Text>
      </Pressable>
    );
  };

  return picDisplay ?
    (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#24303a'}}>
      <View>
        <Image source={{uri: spotlightPic}} style={{height: Dimensions.get('window').height / 1.5, width: Dimensions.get('window').width, resizeMode: 'contain'}}/>
        <ProgressBar progress={progressBarFill} color={'#a1dc91'}/>
      </View>
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