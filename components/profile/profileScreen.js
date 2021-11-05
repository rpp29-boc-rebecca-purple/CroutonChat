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

const Profile = ({fakeUser, editProfile, toggleSettings}) => {
    return (
      <SafeAreaView style={styles.container}>

        {/* profile pic, name, and snack tag */}
        <View style={styles.userInfoSection}>
          <ImageBackground
          source={require('../../assets/BOC.profile.cloud.bg.webp')}
          style={{width: 400}}>
            <View style={{alignItems: 'center', marginTop: 75}}>
              <Avatar.Image
                source={{
                  uri: fakeUser.thumbnail
                }}
                size={100}
              />
              <View style={{alignItems: 'center'}}>
                <Title style={styles.title}>{fakeUser.first_name}</Title>
                <Caption style={styles.caption}>Loves snacking on {fakeUser.snack}</Caption>
              </View>
            </View>
            </ImageBackground>
        </View>

        {/* user info section */}
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Text style={{fontWeight: 'bold'}}>First Name: </Text>
            <Text>{fakeUser.first_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{fontWeight: 'bold'}}>Last Name: </Text>
            <Text>{fakeUser.last_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{fontWeight: 'bold'}}>Age: </Text>
            <Text>{fakeUser.age}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{fontWeight: 'bold'}}>Species: </Text>
            <Text>{fakeUser.animal_type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{fontWeight: 'bold'}}>Favorite Snack: </Text>
            <Text>{fakeUser.snack}</Text>
          </View>
        </View>

        {/* buttons for edit profile and navigate to settings */}
        <View style={styles.profileButtonsWrapper}>
            <View style={styles.profileButton}>
          <TouchableOpacity onPress={()=> editProfile()}>
              <Text>Edit Profile</Text>
          </TouchableOpacity>
            </View>
          <View style={styles.profileButton}>
          <TouchableOpacity onPress={()=> toggleSettings()}>
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