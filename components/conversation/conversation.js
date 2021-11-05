import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { ProgressBar } from 'react-native-paper';
import CameraComponent from '../camera.js';
const api = require('./apiHelpers.js');

const Conversation = ({ userId = 1, friendId = 2, chatId = 12, handleBackButtonPress }) => {
  let [messages, setMessages] = useState([]);
  let [spotlightPic, setSpotlightPic] = useState('');
  let [picDisplay, setPicDisplay] = useState(false);
  let [cameraDisplay, setCameraDisplay] = useState(false);
  let [progressBarFill, setProgressBarFill] = useState(1);

  // updates messages upon render
  useEffect(() => {
    setMessages(api.fetchMessages())
  }, []);

  // handles text message send
  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    api.sendMessage(newMessages);
  }, []);

  // handles all tasks related to photo loading, displaying, & deleting
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

  // message that shows for unseen pictures
  const unopenedImage = ({currentMessage}) => {
    console.log(currentMessage);
    return currentMessage.user._id !== userId ? (
      <Pressable onPress={() => { handleImageViewing(currentMessage.image, currentMessage._id); }} style={styles.unopenedImageBody}>
        <Image source={require('../../assets/icons/photoStack.jpeg')} style={styles.unopenedImageIcon}/>
        <Text style={styles.unopenedImageText}>Tap here to view a new photo from {api.getFriendName(friendId)}!</Text>
      </Pressable>
    )
    :
    (
      <Image source={{uri: currentMessage.image}} style={styles.ownSentImage} />
    );
  };

  const handlePhotoAdditionIconPress = () => {
    setCameraDisplay(true);
  };

  const photoAdditionIcon = () => {
    return (
      <Pressable onPress={handlePhotoAdditionIconPress}>
        <Image source={require('../../assets/icons/camera.png')} style={styles.photoAdditionIcon}/>
      </Pressable>
    )
  };

  const exitCamera = () => {
    setCameraDisplay(false);
  };

  return picDisplay ? (
      <View style={styles.lightbox}>
        <View>
          <Image source={{uri: spotlightPic}} style={styles.spotlight}/>
          <ProgressBar progress={progressBarFill} color={'#a1dc91'}/>
        </View>
      </View>
    )
    : cameraDisplay ?
    (
      <CameraComponent chatId={chatId} senderId={userId} exitCamera={exitCamera} />
    )
    :
    (
      <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, justifyContent: 'flex-start'}}>
        <View style={{width: Dimensions.get('window').width, flex: .08, backgroundColor: 'transparent', zIndex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableOpacity onPress={handleBackButtonPress}>
            <Image source={require('../../assets/icons/backArrow.png')} style={{height: 50, width: 50, left: 15, top: 10}}/>
          </TouchableOpacity>
        </View>
        <GiftedChat
          messages={messages}
          renderActions={photoAdditionIcon}
          renderMessageImage={unopenedImage}
          onSend={outgoingMessages => onSend(outgoingMessages)}
          user={{
            _id: userId,
          }}
        />
      </View>
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
  ownSentImage: {
    height: 170,
    width: 170,
    bottom: 4,
    top: 0,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 2,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15
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
  },
  photoAdditionIcon: {
    height: 30,
    width: 30,
    left: 7,
    top: -8
  }
});

export default Conversation;