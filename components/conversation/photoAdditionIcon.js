import React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
const api = require('./apiHelpers.js');

//this is the icon for sending photos that sits next to the text entry
const PhotoAdditionIcon = (userId, chatId) => {

  const handlePhotoAdditionIconPress = () => {
    alert('This will eventually prompt a photo selection.');
    api.sendPicture();
  };

  return (
    <Pressable onPress={handlePhotoAdditionIconPress}>
      <Image source={require('../../assets/icons/camera.png')} style={styles.image}/>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 30,
    left: 7,
    top: -8
  }
});

export default PhotoAdditionIcon;