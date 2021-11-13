import React from 'react';
import {
  Avatar,
  Title,
  Caption,
} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Profile = ({userData, editProfile, toggleSettings, isDarkTheme}) => {

    return (
      <SafeAreaView style={styles.container}>

        {/* profile pic, name, and snack tag */}
        <View style={styles.userInfoSection}>
          <ImageBackground
          source={isDarkTheme ? require('../../assets/BOC.nightskymoon.jpeg') : require('../../assets/BOC.profile.cloud.bg.webp')}
          style={{width: 400, height: 250}}>
            <View style={{alignItems: 'center', marginTop: 75}}>
              <Avatar.Image
                source={{
                  uri: userData.thumbnail_url
                }}
                size={100}
              />
              <View style={{alignItems: 'center'}}>
                <Title style={styles.title}>{userData.first_name}</Title>
                <Caption style={styles.caption}>Loves snacking on {userData.snack}</Caption>
              </View>
            </View>
            </ImageBackground>
        </View>

        {/* user info section */}
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.keyTextStyleDark : styles.keyTextStyle}>First Name: </Text>
            <Text style={isDarkTheme ? styles.valueTextStyleDark : styles.valueTextStyle}>{userData.first_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.keyTextStyleDark : styles.keyTextStyle}>Last Name: </Text>
            <Text style={isDarkTheme ? styles.valueTextStyleDark : styles.valueTextStyle}>{userData.last_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.keyTextStyleDark : styles.keyTextStyle}>Age: </Text>
            <Text style={isDarkTheme ? styles.valueTextStyleDark : styles.valueTextStyle}>{userData.age}</Text>
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.keyTextStyleDark : styles.keyTextStyle}>Species: </Text>
            <Text style={isDarkTheme ? styles.valueTextStyleDark : styles.valueTextStyle}>{userData.animal_type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.keyTextStyleDark : styles.keyTextStyle}>Favorite Snack: </Text>
            <Text style={isDarkTheme ? styles.valueTextStyleDark : styles.valueTextStyle}>{userData.snack}</Text>
          </View>
        </View>

        {/* buttons for edit profile and navigate to settings */}
        <View style={isDarkTheme ? styles.darkProfileButtonsWrapper : styles.profileButtonsWrapper}>
            <View style={isDarkTheme ? styles.profileButtonDark : styles.profileButton}>
              <TouchableOpacity onPress={()=> editProfile()}>
                  <Text style={isDarkTheme ? styles.buttonTextDark : styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          <View style={isDarkTheme ? styles.profileButtonDark : styles.profileButton}>
            <TouchableOpacity onPress={()=> toggleSettings()}>
              <Text style={isDarkTheme ? styles.buttonTextDark : styles.buttonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );

}

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
    marginBottom: 23,
    marginLeft: 20,
  },
  keyTextStyle: {
    fontWeight: 'bold'
  },
  keyTextStyleDark: {
    fontWeight: 'bold',
    color: 'white'
  },
  valueTextStyle: {
    color: 'black'
  },
  valueTextStyleDark: {
    color: 'white'
  },

  profileButtonsWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    height: 90,
    marginTop: 'auto',
    padding: 10,
  },
  darkProfileButtonsWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    height: 90,
    marginTop: 'auto',
    padding: 10,
  },
  profileButton: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    margin: 7,
  },
  profileButtonDark: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
    margin: 7,
    borderColor: 'white'
  },
  buttonText: {
    fontSize: 15
  },
  buttonTextDark: {
    fontSize: 15,
    color: 'white'
  }
});

export default Profile;