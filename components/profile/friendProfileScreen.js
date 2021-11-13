import React, {useEffect, useState} from 'react';
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
import axios from 'axios';


const FriendProfile = ({userData, isDarkTheme,  setFriendProfileView, clickedFriendId, fetchFriendsData}) => {

  const [friendInfo, setFriendInfo] = useState('');

  useEffect( () => {
    fetchFriendData();
  }, []);

  const fetchFriendData = async () => {
    await axios.get(`http://18.219.200.72:8080/user/?user_id=${clickedFriendId}`)
    .then(function (response) {
      setFriendInfo(response.data[0])
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  const followFriend = async () => {
    await axios.post(`http://18.219.200.72:8080/user/friendsList/follow?user_id=${userData.user_id}&friend_id=${clickedFriendId}`)
      .then(() => fetchFriendsData())
      .then(() => alert(`Followed ${friendInfo.first_name}`))
      .catch(err => console.log(err))
  }

  const unfollowFriend = async () => {
    await axios.put(`http://18.219.200.72:8080/user/friendsList/unfollow?user_id=${userData.user_id}&friend_id=${clickedFriendId}`)
    .then(() => fetchFriendsData())
    .then(() => alert(`Unfollowed ${friendInfo.first_name}`))
    .catch(err => console.log(err))
  }

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
                  uri: friendInfo.thumbnail_url
                }}
                size={100}
              />

              <View style={{alignItems: 'center'}}>
                <Title style={styles.title}>{friendInfo.first_name}</Title>
                <Caption style={styles.caption}>Loves snacking on {friendInfo.snack}</Caption>
              </View>
              {/* back button */}
              <View style={{position: 'absolute', marginTop: -80, marginLeft: 5, alignSelf: 'flex-start'}}>
              <TouchableOpacity onPress={()=> setFriendProfileView(false)}>
                <Text style={isDarkTheme ? styles.backButtonDark : styles.backButton}
                >&#x2190;</Text>
              </TouchableOpacity>
          </View>

            </View>
            </ImageBackground>

        </View>

        {/* user info section */}
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.keyTextStyleDark : styles.keyTextStyle}>First Name: </Text>
            <Text style={isDarkTheme ? styles.valueTextStyleDark : styles.valueTextStyle}>{friendInfo.first_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.keyTextStyleDark : styles.keyTextStyle}>Last Name: </Text>
            <Text style={isDarkTheme ? styles.valueTextStyleDark : styles.valueTextStyle}>{friendInfo.last_name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.keyTextStyleDark : styles.keyTextStyle}>Age: </Text>
            <Text style={isDarkTheme ? styles.valueTextStyleDark : styles.valueTextStyle}>{friendInfo.age}</Text>
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.keyTextStyleDark : styles.keyTextStyle}>Species: </Text>
            <Text style={isDarkTheme ? styles.valueTextStyleDark : styles.valueTextStyle}>{friendInfo.animal_type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={isDarkTheme ? styles.keyTextStyleDark : styles.keyTextStyle}>Favorite Snack: </Text>
            <Text style={isDarkTheme ? styles.valueTextStyleDark : styles.valueTextStyle}>{friendInfo.snack}</Text>
          </View>
        </View>

        {/* buttons for edit profile and navigate to settings */}
        <View style={isDarkTheme ? styles.darkProfileButtonsWrapper : styles.profileButtonsWrapper}>
            <View style={isDarkTheme ? styles.profileButtonDark : styles.profileButton}>
              <TouchableOpacity onPress={()=> followFriend()}>
                  <Text style={isDarkTheme ? styles.profileButtonTextDark : styles.profileButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          <View style={isDarkTheme ? styles.profileButtonDark : styles.profileButton}>
            <TouchableOpacity onPress={()=> unfollowFriend()}>
              <Text style={isDarkTheme ? styles.profileButtonTextDark : styles.profileButtonText}>Unfollow</Text>
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
    backgroundColor: '#EBD687',
    margin: 7,
    height: 50
  },
  profileButtonDark: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#EBD687',
    margin: 7,
    height: 50,
    borderColor: 'white'
  },
  profileButtonText: {
    fontSize: 15,
  },
  profileButtonTextDark: {
    fontSize: 15,
    color: 'black'
  },
  backButton: {
    fontSize: 35,
  },
  backButtonDark: {
    fontSize: 35,
    color: 'white',
  }
});

export default FriendProfile;