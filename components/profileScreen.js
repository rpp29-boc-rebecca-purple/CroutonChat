import React from 'react';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple
} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  Button,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Profile = (props) => {
    return (
      <SafeAreaView style={styles.container}>

        {/* profile pic, name, and snack tag */}
        <View style={styles.userInfoSection}>
          <ImageBackground
          source={require('../assets/BOC.profile.cloud.bg.webp')}
          style={{width: 400}}>
            <View style={{alignItems: 'center', marginTop: 75}}>
              <Avatar.Image
                source={{
                  uri: 'https://i.imgur.com/ckCX9Xc.jpg'
                }}
                size={100}
              />
              <View style={{alignItems: 'center'}}>
                <Title style={styles.title}>Ladypants</Title>
                <Caption style={styles.caption}>Loves snacking on roast turkey sandwhiches</Caption>
              </View>
            </View>
            </ImageBackground>
        </View>

        {/* user info section */}
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Text>Name: Ladypants</Text>
          </View>
          <View style={styles.row}>
            <Text>Age: 3</Text>
          </View>
          <View style={styles.row}>
            <Text>Species: Dog</Text>
          </View>
          <View style={styles.row}>
            <Text>Favorite Snack: Roast Turkey Sandwhiches</Text>
          </View>
        </View>

        {/* buttons for edit profile and navigate to settings */}
        <View style={styles.profileButtonsWrapper}>
            <View style={styles.profileButton}>
          <TouchableOpacity onPress={()=> props.editProfile()}>
              <Text>Edit Profile</Text>
          </TouchableOpacity>
            </View>
          <View style={styles.profileButton}>
          <TouchableOpacity onPress={()=> props.toggleSettings()}>
            <Text >Settings</Text>
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
    marginLeft: 20
  },

  profileButtonsWrapper: {
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
    marginTop: 'auto',
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  profileButton: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
  }
});

export default Profile;