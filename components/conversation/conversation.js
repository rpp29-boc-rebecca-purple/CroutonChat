import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, Pressable } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { ProgressBar } from 'react-native-paper';
import PhotoAdditionIcon from './photoAdditionIcon.js';
const api = require('./apiHelpers.js');

const Conversation = ({ userId = 5, friendId = 4, chatId = 0 }) => {
  let [messages, setMessages] = useState([]);
  let [spotlightPic, setSpotlightPic] = useState('');
  let [picDisplay, setPicDisplay] = useState(false);
  let [progressBarFill, setProgressBarFill] = useState(1);

  useEffect(() => {
    setMessages(api.fetchMessages())
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    api.sendMessage(messages);
  }, []);

  const handleImageViewing = (imgUrl, messageId) => {
    api.deleteImage(chatId, messageId);
    setSpotlightPic(imgUrl);
    setProgressBarFill(1);
    setPicDisplay(true);
    let viewingStartTime = Date.now();
    let incrementProgressBar = setInterval(() => { setProgressBarFill(1 - ((Date.now() - viewingStartTime) / 10000)); }, 40);
    setTimeout(() => {
      setMessages(api.fetchMessages());
      setPicDisplay(false);
      clearInterval(incrementProgressBar);
    }, 10000);
  };

  const unopenedImage = ({currentMessage}) => {
    return (
      <Pressable onPress={() => { handleImageViewing(currentMessage.image, currentMessage._id); }} style={styles.unopenedImageBody}>
        <Image source={require('../../assets/icons/photoStack.jpeg')} style={styles.unopenedImageIcon}/>
        <Text style={styles.unopenedImageText}>Tap here to view a new photo from {api.getFriendName(friendId)}!</Text>
      </Pressable>
    );
  };

  return picDisplay ?
    (
    <View style={styles.lightbox}>
      <View>
        <Image source={{uri: spotlightPic}} style={styles.spotlight}/>
        <ProgressBar progress={progressBarFill} color={'#a1dc91'}/>
      </View>
    </View>
    )
    :
    (
      <GiftedChat
        messages={messages}
        renderActions={() => PhotoAdditionIcon(userId, chatId)}
        renderMessageImage={unopenedImage}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
        }}
      />
    );

};

const styles = StyleSheet.create({
  lightbox: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#24303a'
  },
  spotlight: {
    height: Dimensions.get('window').height / 1.5,
    width: Dimensions.get('window').width,
    resizeMode: 'contain'
  },
  unopenedImageBody: {
      backgroundColor: '#a1dc91',
      height: 170,
      width: 170,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderRadius: 15
  },
  unopenedImageIcon: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  unopenedImageText: {
    color: '#24303a',
    textAlign: 'center'
  }
});

export default Conversation;