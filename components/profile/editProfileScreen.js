import React, { useState, useEffect } from 'react';
import { Avatar, Title, Caption, TouchableRipple, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { editProfileInfo} from '../../HelperFuncs/profileApi';



const EditProfile = ({ userData, fetchUserData, setEditProfile, isDarkTheme }) => {
  const [name, setName] = useState(userData?.first_name);
  const [lastName, setLastName] = useState(userData?.last_name);
  const [age, setAge] = useState(userData?.age);
  const [favoriteSnack, setFavoriteSnack] = useState(userData?.snack);
  const [animalType, setAnimalType] = useState(userData?.animal_type);
  const [thumbnail, setThumbnail] = useState(userData?.thumbnail);
  const [thumbnailSrc, setThumbnailSrc] = useState(userData.thumbnailSrc);

  useEffect(() => {
    getPermissionAsync();
  });

  async function sendChanges() {
    let fd = new FormData();
    fd.append('first_name', name);
    fd.append('last_name', lastName);
    fd.append('age', age);
    fd.append('snack', favoriteSnack);
    fd.append('animal_type', animalType);
    fd.append('photo', thumbnail);
    fd.append('user_id', userData?.user_id);
    editProfileInfo(fd, userData?.user_id).then(() => {
      fetchUserData();
    });
  }
  // camra roll permissions
  const getPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Enable Camera Roll Permissions');
      }
    }
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.5,
      });
      if (!result.cancelled) {
        await setThumbnailSrc(result.uri);
        var photo = {
          uri: result.uri,
          type: 'image/jpeg',
          name: `thumbnail_${userData?.user_id}.jpg`,
        };

        setThumbnail(photo);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* profile pic, name, and snack tag */}
      <View style={styles.userInfoSection}>
        <ImageBackground source={isDarkTheme ? require('../../assets/BOC.nightskymoon.jpeg') : require('../../assets/BOC.profile.cloud.bg.webp')} style={{ width: 400, height: 250 }}>
          {/* back button */}
          <View>
            <TouchableOpacity onPress={() => setEditProfile(false)}>
              <Text style={isDarkTheme ? styles.backButtonDark : styles.backButton}> &#x2190;</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', marginTop: 35 }}>
            <Avatar.Image source={{ uri: thumbnailSrc || userData.thumbnail_url }} size={100} />
            <View style={{ alignItems: 'center' }}>
              <Title style={styles.title}>{name}</Title>
              <Caption style={styles.caption}>Loves snacking on {favoriteSnack}</Caption>
            </View>
          </View>
        </ImageBackground>
      </View>
      {/* user info textinput section */}
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Text style={isDarkTheme ? styles.textStyleDark : styles.textStyle}>First Name:          </Text>
          <TextInput placeholder={userData?.first_name} onChangeText={val => setName(val)} autoCapitalize="none" autoCorrect={false} style={isDarkTheme ? styles.inputDark : styles.input} />
        </View>
        <View style={styles.row}>
          <Text style={isDarkTheme ? styles.textStyleDark : styles.textStyle}>Last Name:          </Text>
          <TextInput placeholder={userData?.last_name} onChangeText={val => setLastName(val)} autoCapitalize="none" autoCorrect={false} style={isDarkTheme ? styles.inputDark : styles.input} />
        </View>
        <View style={styles.row}>
          <Text style={isDarkTheme ? styles.textStyleDark : styles.textStyle}>Age:                       </Text>
          <TextInput style={{ marginRight: 0 }} placeholder={userData.age ? userData.age.toString()  : '0'} onChangeText={val => setAge(val)} autoCapitalize="none" autoCorrect={false} style={isDarkTheme ? styles.inputDark : styles.input} />
        </View>
        <View style={styles.row}>
          <Text style={isDarkTheme ? styles.textStyleDark : styles.textStyle}>Species:               </Text>
          <TextInput placeholder={userData?.animal_type} onChangeText={val => setAnimalType(val)} autoCapitalize="none" autoCorrect={false} style={isDarkTheme ? styles.inputDark : styles.input} />
        </View>
        <View style={styles.row}>
          <Text style={isDarkTheme ? styles.textStyleDark : styles.textStyle}>Favorite Snack: </Text>
          <TextInput placeholder={userData?.snack} onChangeText={val => setFavoriteSnack(val)} autoCapitalize="none" autoCorrect={false} style={isDarkTheme ? styles.inputDark : styles.input} />
        </View>
      </View>
      {/* change profile picture / save changes button */}
      <TouchableRipple style={isDarkTheme ? styles.editProfileButtonsWrapperDark : styles.editProfileButtonsWrapper}>
        <Text
          style={isDarkTheme ? styles.editProfileButtonDark : styles.editProfileButton}
          onPress={() => {
            pickImage();
          }}
        >
          Change Profile Picture
        </Text>
      </TouchableRipple>
      <TouchableRipple style={isDarkTheme ? styles.editProfileButtonsWrapperDark : styles.editProfileButtonsWrapper}>
        <Text
          style={isDarkTheme ? styles.editProfileButtonDark : styles.editProfileButton}
          onPress={() => {
            setEditProfile(false);
            sendChanges();
          }}
        >
          Save Changes
        </Text>
      </TouchableRipple>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 20,
  },
  editProfileButton: {
    alignItems: 'center',
    padding: 10,
    fontSize: 15,
    minWidth: 210,
    textAlign: 'center',
    borderRadius: 22,
    borderWidth: 1,
    backgroundColor: '#EBD687',
    margin: 7,
  },
  editProfileButtonsWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    // marginBottom: 15,
    // marginTop: 20,
    // margin: 'auto'
  },
  editProfileButtonDark: {
    alignItems: 'center',
    padding: 10,
    fontSize: 15,
    minWidth: 210,
    textAlign: 'center',
    color: 'black',
    borderRadius: 22,
    borderWidth: 1,
    margin: 7,
    borderColor: 'white',
    backgroundColor: '#EBD687',

  },
  editProfileButtonsWrapperDark: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    // margin: 'auto',
    // marginBottom: 15,
    // marginTop: 20,
  },
  input: {
    borderColor: '#EBD687',
    padding: 8,
    margin: 0,
    width: 250,
    height: 20,
    marginTop: -5,
    backgroundColor: 'white',

  },
  inputDark: {
    borderColor: '#EBD687',
    padding: 8,
    margin: 0,
    width: 250,
    height: 20,
    marginTop: -5,
    backgroundColor: 'black',
  },
  textStyle: {
    fontWeight: 'bold',
  },
  textStyleDark: {
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    fontSize: 35,
  },
  backButtonDark: {
    fontSize: 35,
    color: 'white',
  },
});

export default EditProfile;